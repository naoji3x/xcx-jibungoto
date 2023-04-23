import { type OtherCarItem, type ResidentialAreaSize } from '../common/types'
import { getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'

/** 移動時間を指定する引数 */
export interface TravelingTimeParam {
  /** 週間の移動時間[hr] */
  weeklyTravelingTime: number
  /** 年間の移動時間[hr] */
  annualTravelingTime: number
}

/** 住んでいる地域の規模を指定する引数 */
export interface ResidentialAreaSizeParam {
  /** 住んでいる地域の規模 */
  residentialAreaSize: ResidentialAreaSize
}

/** 移動量を計算するための引数 */
export type OtherCarAmountParam = TravelingTimeParam | ResidentialAreaSizeParam

/**
 * タクシー・カーシェアリングの活動量を計算
 * @remarks 自家用車以外の車（タクシーやカーシェアリンング）の合計の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
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
