import { type ResidentialAreaSize, type CarType } from './types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'

interface CarSharingRentalIntensityParam {
  carType: CarType
}

interface OtherCarAmountParam {
  weeklyTravelingTime?: number
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * カーシェアリングのレンタルのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングのレンタルのフットプリント[kgCO2e]
 */
export const estimateCarSharingRentalAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize,
  carType
}: OtherCarAmountParam & CarSharingRentalIntensityParam): number =>
  estimateCarSharingRentalAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) *
  estimateCarSharingRentalIntensity({
    carType
  })

/**
 * カーシェアリングのレンタルの活動量を計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns レンタル回数[回数]
 */
export const estimateCarSharingRentalAnnualAmount = ({
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
    const carSharing = otherCarMileage * ratio

    const carSharingRental = getBaselineAmount(
      'mobility',
      'car-sharing-rental'
    ).value
    return (carSharingRental * carSharing) / carSharingBaseline
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('car-sharing-rental', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'car-sharing-rental').value
  }
}

/**
 * カーシェアリングのレンタルのGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングのレンタルのGHG原単位[kgCO2e/レンタル回数]
 */
export const estimateCarSharingRentalIntensity = ({
  carType
}: CarSharingRentalIntensityParam): number => {
  // ベースラインのレンタルのGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'car-sharing-rental'
  ).value

  // 自動車種類に応じてレンタルのGHG原単位の補正係数を取得
  const ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio
}
