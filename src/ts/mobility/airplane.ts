import { getBaselineIntensity, getBaselineAmount } from '../data/database'
import {
  estimateAnnualAmount,
  estimateAnnualAmountByArea
} from './amount-calculation'
import { type ResidentialAreaSize } from '../common/types'

interface AirplaneAmountParam {
  annualTravelingTime?: number
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * 飛行機の移動のフットプリントを計算
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export const estimateAirplaneAnnualFootprint = ({
  annualTravelingTime,
  residentialAreaSize
}: AirplaneAmountParam): number =>
  estimateAirplaneAnnualAmount({
    annualTravelingTime,
    residentialAreaSize
  }) * estimateAirplaneIntensity()

/**
 * 飛行機での移動時の年間の活動量を計算
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAirplaneAnnualAmount = ({
  annualTravelingTime,
  residentialAreaSize
}: AirplaneAmountParam): number => {
  if (annualTravelingTime !== undefined) {
    return estimateAnnualAmount(annualTravelingTime, 'airplane-speed')
  } else if (residentialAreaSize !== undefined) {
    return estimateAnnualAmountByArea('airplane', residentialAreaSize)
  } else {
    return getBaselineAmount('mobility', 'airplane').value
  }
}

/**
 * 飛行機での移動時のGHG原単位を計算
 * @returns 移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateAirplaneIntensity = (): number =>
  getBaselineIntensity('mobility', 'airplane').value
