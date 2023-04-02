import { type ResidentialAreaSize, type CarPassengers } from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'

interface TaxiIntensityParam {
  carPassengers?: CarPassengers
}

interface OtherCarAmountParam {
  weeklyTravelingTime?: number
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * タクシーのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の使用時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns タクシーのフットプリント[kgCO2e]
 */
export const estimateTaxiAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize,
  carPassengers
}: OtherCarAmountParam & TaxiIntensityParam): number =>
  estimateTaxiAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) *
  estimateTaxiIntensity({
    carPassengers
  })

/**
 * タクシーの活動量を計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns タクシーの運転時の活動量[km-passenger]
 */
export const estimateTaxiAnnualAmount = ({
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
    const ratio = taxiBaseline / (taxiBaseline + carSharingBaseline)
    return otherCarMileage * ratio
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('taxi', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'taxi').value
  }
}

/**
 * タクシーのGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns タクシーのGHG原単位[kgCO2e/km-passenger]
 */
export const estimateTaxiIntensity = ({
  carPassengers
}: TaxiIntensityParam = {}): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity('mobility', 'taxi').value
  let passengerIntensityRatio = 1
  if (carPassengers !== undefined) {
    // 人数補正値
    passengerIntensityRatio = getParameter(
      'car-passengers',
      carPassengers + '_taxi-factor'
    ).value
  }
  return baselineIntensity * passengerIntensityRatio
}
