import { getBaselineIntensity, getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './annual-amount'
import { type MileageByAreaFirstKey } from './types'

/**
 * バスの移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param mileageByAreaFirstKey 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export const estimateBusFootprint = (
  weeklyTravelingTime: number | undefined = undefined,
  annualTravelingTime: number | undefined = undefined,
  mileageByAreaFirstKey: MileageByAreaFirstKey | undefined = undefined
): number =>
  estimateBusAnnualAmount(
    weeklyTravelingTime,
    annualTravelingTime,
    mileageByAreaFirstKey
  ) * estimateBusIntensity()

/**
 * バスでの移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param mileageByAreaFirstKey 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateBusAnnualAmount = (
  weeklyTravelingTime: number | undefined = undefined,
  annualTravelingTime: number | undefined = undefined,
  mileageByAreaFirstKey: MileageByAreaFirstKey | undefined = undefined
): number => {
  if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
    weeklyTravelingTime = weeklyTravelingTime ?? 0
    annualTravelingTime = annualTravelingTime ?? 0
    return estimateAnnualAmountAddingWeeklyTravel(
      weeklyTravelingTime,
      'bus-speed',
      annualTravelingTime,
      'express-bus-speed'
    )
  } else if (mileageByAreaFirstKey !== undefined) {
    return estimateAnnualAmountByArea('bus', mileageByAreaFirstKey)
  } else {
    return getBaselineAmount('mobility', 'bus').value
  }
}

/**
 * バスでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateBusIntensity = (): number =>
  getBaselineIntensity('mobility', 'bus').value
