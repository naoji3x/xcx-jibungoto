import { getBaselineIntensity, getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'
import { type ResidentialAreaSize } from '../common/types'

interface MotorbikeDrivingAmountParam {
  weeklyTravelingTime?: number
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * バイクの移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export const estimateMotorbikeDrivingAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: MotorbikeDrivingAmountParam): number =>
  estimateMotorbikeDrivingAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) * estimateMotorbikeDrivingIntensity()

/**
 * バイクでの移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateMotorbikeDrivingAnnualAmount = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: MotorbikeDrivingAmountParam): number => {
  if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
    weeklyTravelingTime = weeklyTravelingTime ?? 0
    annualTravelingTime = annualTravelingTime ?? 0
    return estimateAnnualAmountAddingWeeklyTravel(
      weeklyTravelingTime,
      'motorbike-speed',
      annualTravelingTime,
      'long-distance-motorbike-speed'
    )
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('motorbike-driving', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'motorbike-driving').value
  }
}

/**
 * バイクでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateMotorbikeDrivingIntensity = (): number =>
  getBaselineIntensity('mobility', 'motorbike-driving').value
