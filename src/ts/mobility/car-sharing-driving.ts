import {
  type ResidentialAreaSize,
  type CarPassengers,
  type CarType,
  type CarCharging,
  type ElectricityType
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'

interface CarSharingDrivingIntensityParam {
  carType: CarType
  carPassengers: CarPassengers
  carCharging?: CarCharging
  electricityType?: ElectricityType
}

interface OtherCarAmountParam {
  weeklyTravelingTime?: number
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * カーシェアリングのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングの運転時のフットプリント[kgCO2e]
 */
export const estimateCarSharingDrivingAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize,
  carType,
  carPassengers,
  carCharging = 'unknown',
  electricityType = 'unknown'
}: OtherCarAmountParam & CarSharingDrivingIntensityParam): number =>
  estimateCarSharingDrivingAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) *
  estimateCarSharingDrivingIntensity({
    carType,
    carPassengers,
    carCharging,
    electricityType
  })

/**
 * カーシェアリングの運転時の活動量を計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateCarSharingDrivingAnnualAmount = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: OtherCarAmountParam): number => {
  if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
    weeklyTravelingTime = weeklyTravelingTime ?? 0
    annualTravelingTime = annualTravelingTime ?? 0

    const otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(
      weeklyTravelingTime,
      'car-speed',
      annualTravelingTime,
      'long-distance-car-speed'
    )
    const taxiBaseline = getBaselineAmount('mobility', 'taxi').value
    const carSharingBaseline = getBaselineAmount(
      'mobility',
      'car-sharing-driving'
    ).value
    const ratio = carSharingBaseline / (taxiBaseline + carSharingBaseline)
    return otherCarMileage * ratio
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea(
      'car-sharing-driving',
      residentialAreaSize
    )
  } else {
    return getBaselineAmount('mobility', 'car-sharing-driving').value
  }
}

/**
 * カーシェアリングの運転時のGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングの運転時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateCarSharingDrivingIntensity = ({
  carType,
  carPassengers,
  carCharging = 'unknown',
  electricityType = 'unknown'
}: CarSharingDrivingIntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'car-sharing-driving'
  ).value

  // 自動車種類に応じて運転時GHG原単位の補正係数を取得
  let ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carType + '_driving-factor'
  ).value

  // PHV, EVの補正
  if (carType === 'phv' || carType === 'ev') {
    // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
    const electricityIntensityFactor =
      getParameter('electricity-intensity-factor', electricityType).value *
      getParameter('car-charging', carCharging).value

    // GHG原単位の補正係数を電力割合で補正
    ghgIntensityRatio =
      ghgIntensityRatio * (1 - electricityIntensityFactor) +
      getParameter(
        'renewable-car-intensity-factor',
        carType + '_driving-factor'
      ).value *
        electricityIntensityFactor
  }

  let passengerIntensityRatio = 1
  if (carPassengers !== undefined) {
    // 人数補正値
    passengerIntensityRatio = getParameter(
      'car-passengers',
      carPassengers + '_private-car-factor'
    ).value
  }
  return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio
}
