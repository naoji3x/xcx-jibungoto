import { getBaselineIntensity, getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './annual-amount'
import { type ResidentialAreaSize } from './types'

interface Param {
  weeklyTravelingTime?: number
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * 電車の移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export const estimateTrainAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: Param): number =>
  estimateTrainAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) * estimateTrainIntensity()

/**
 * 電車での移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateTrainAnnualAmount = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: Param): number => {
  if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
    weeklyTravelingTime = weeklyTravelingTime ?? 0
    annualTravelingTime = annualTravelingTime ?? 0
    return estimateAnnualAmountAddingWeeklyTravel(
      weeklyTravelingTime,
      'train-speed',
      annualTravelingTime,
      'long-distance-train-speed'
    )
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('train', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'train').value
  }
}

/**
 * 電車での移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateTrainIntensity = (): number =>
  getBaselineIntensity('mobility', 'train').value
