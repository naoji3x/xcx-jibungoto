import { getBaselineIntensity, getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'
import { type ResidentialAreaSize } from '../common/types'

interface MotorbikePurchaseAmountParam {
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
export const estimateMotorbikePurchaseAnnualFootprint = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: MotorbikePurchaseAmountParam): number =>
  estimateMotorbikePurchaseAnnualAmount({
    weeklyTravelingTime,
    annualTravelingTime,
    residentialAreaSize
  }) * estimateMotorbikePurchaseIntensity()

/**
 * バイクでの移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateMotorbikePurchaseAnnualAmount = ({
  weeklyTravelingTime,
  annualTravelingTime,
  residentialAreaSize
}: MotorbikePurchaseAmountParam): number => {
  if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
    weeklyTravelingTime = weeklyTravelingTime ?? 0
    annualTravelingTime = annualTravelingTime ?? 0
    const drivingAmount = estimateAnnualAmountAddingWeeklyTravel(
      weeklyTravelingTime,
      'motorbike-speed',
      annualTravelingTime,
      'long-distance-motorbike-speed'
    )
    const drivingBaseline = getBaselineAmount(
      'mobility',
      'motorbike-driving'
    ).value
    const purchaseBaseline = getBaselineAmount(
      'mobility',
      'motorbike-purchase'
    ).value
    // バイクの購入は移動実績と移動ベースラインとの比率で変更
    return (purchaseBaseline * drivingAmount) / drivingBaseline
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('motorbike-purchase', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'motorbike-purchase').value
  }
}

/**
 * バイクでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateMotorbikePurchaseIntensity = (): number =>
  getBaselineIntensity('mobility', 'motorbike-purchase').value
