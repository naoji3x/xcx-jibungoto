import {
  type DishFrequency,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency
} from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateDishAnnualAmount } from './dish'

/** 加工肉の活動量を計算するための引数 */
interface ProcessedMeatAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** 牛肉料理の摂取頻度 */
  beefDishFrequency: DishFrequency
  /** 豚肉料理の摂取頻度 */
  porkDishFrequency: DishFrequency
  /** 鶏肉料理の摂取頻度 */
  chickenDishFrequency: DishFrequency
}

/**
 * 加工肉の活動量を計算する
 * @param param 加工肉の活動量を計算するための引数
 * @returns 加工肉の活動量[kg]
 */
export const estimateProcessedMeatAnnualAmount = ({
  foodDirectWasteFrequency: foodDirectWaste,
  foodLeftoverFrequency: foodLeftover,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency
}: ProcessedMeatAmountParam): number => {
  const beefBaseline = getBaselineAmount('food', 'beef').value
  const porkBaseline = getBaselineAmount('food', 'pork').value
  const chickenBaseline = getBaselineAmount('food', 'chicken').value
  const otherMeatBaseline = getBaselineAmount('food', 'other-meat').value

  const beef = estimateDishAnnualAmount('beef', {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dishFrequency: beefDishFrequency
  })
  const pork = estimateDishAnnualAmount('pork', {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dishFrequency: porkDishFrequency
  })
  const chicken = estimateDishAnnualAmount('chicken', {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dishFrequency: chickenDishFrequency
  })
  const otherMeat = estimateDishAnnualAmount('other-meat', {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dishFrequency: porkDishFrequency
  })

  return (
    (getBaselineAmount('food', 'processed-meat').value *
      (beef + pork + chicken + otherMeat)) /
    (beefBaseline + porkBaseline + chickenBaseline + otherMeatBaseline)
  )
}

/**
 * 加工肉のGHG原単位を計算する
 * @returns 加工肉のGHG原単位[kgCO2e/kg]
 */
export const estimateProcessedMeatIntensity = (): number =>
  getBaselineIntensity('food', 'processed-meat').value
