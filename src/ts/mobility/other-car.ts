import { type OtherCarItem } from '../common/types'
import { getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'
import { type ResidentialAreaSizeParam, type TravelingTimeParam } from './param'

/** 移動量を計算するための引数 */
export type OtherCarAmountParam = TravelingTimeParam | ResidentialAreaSizeParam

/**
 * タクシー・カーシェアリングの活動量を計算
 * @remarks 自家用車以外の車（タクシーやカーシェアリンング）の合計の移動時間を引数に設定
 * @param param 移動量を計算するための引数
 * @returns タクシーの運転時の活動量[km-passenger]
 */
export const estimateOtherCarAnnualAmount = (
  otherCarItem: OtherCarItem,
  param: OtherCarAmountParam
): number => {
  if ('residentialAreaSize' in param) {
    return estimateAnnualAmountByArea(otherCarItem, param.residentialAreaSize)
  } else {
    const otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(
      param.weeklyTravelingTime,
      'car-speed',
      param.annualTravelingTime,
      'long-distance-car-speed'
    )
    const taxiBaseline = getBaselineAmount('mobility', 'taxi').value
    const carSharingBaseline = getBaselineAmount(
      'mobility',
      'car-sharing-driving'
    ).value
    const rate =
      otherCarItem === 'taxi'
        ? taxiBaseline / (taxiBaseline + carSharingBaseline)
        : carSharingBaseline / (taxiBaseline + carSharingBaseline)

    const mileage = otherCarMileage * rate

    if (otherCarItem === 'car-sharing-rental') {
      const carSharingRental = getBaselineAmount(
        'mobility',
        'car-sharing-rental'
      ).value
      return (carSharingRental * mileage) / carSharingBaseline
    } else {
      return otherCarMileage * rate
    }
  }
}
