import {
  type AlcoholFrequency,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

/** アルコールの活動量を計算するための引数 */
export interface AlcoholAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** アルコールの摂取頻度 */
  alcoholFrequency: AlcoholFrequency
}

/**
 * アルコールの活動量を計算する
 * @param param アルコールの活動量を計算するための引数
 * @returns アルコールの活動量[kg]
 */
export const estimateAlcoholAnnualAmount = ({
  foodDirectWasteFrequency: foodDirectWaste,
  foodLeftoverFrequency: foodLeftover,
  alcoholFrequency: frequency
}: AlcoholAmountParam): number => {
  const baseline = getBaselineAmount('food', 'alcohol').value
  const factor = getParameter('alcohol-factor', frequency).value
  return baseline * factor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
}

/**
 * アルコールのGHG原単位を計算する
 * @returns アルコールのGHG原単位[kgCO2e/kg]
 */
export const estimateAlcoholIntensity = (): number =>
  getBaselineIntensity('food', 'alcohol').value
