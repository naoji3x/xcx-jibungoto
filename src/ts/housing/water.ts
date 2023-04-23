import { getBaselineAmount, getBaselineIntensity } from '../data/database'

/**
 * 水利用の活動量を計算
 * @returns 水利用の活動量の年換算[m3]
 */
export const estimateWaterAnnualAmount = (): number =>
  getBaselineAmount('housing', 'water').value

/**
 * 水利用のGHG原単位を計算
 * @returns 水利用のGHG原単位[kgCO2e/m3]
 */
export const estimateWaterIntensity = (): number =>
  getBaselineIntensity('housing', 'water').value
