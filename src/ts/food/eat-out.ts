import {
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type EatOutItem,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import {
  estimateAlcoholAnnualAmount,
  estimateAlcoholIntensity
} from './alcohol'
import {
  estimateDairyFoodAnnualAmounts,
  estimateDairyFoodIntensities,
  getDairyFoodAnnualBaselineAmounts
} from './dairy-food'
import {
  estimateDishAnnualAmounts,
  estimateDishIntensities,
  getDishAnnualBaselineAmounts
} from './dish'
import {
  estimateFoodIntakeAnnualAmounts,
  estimateFoodIntakeIntensities,
  getFoodIntakeAnnualBaselineAmounts
} from './food-intake'
import {
  estimateProcessedMeatAnnualAmount,
  estimateProcessedMeatIntensity
} from './processed-meat'
import {
  estimateReadyMealAnnualAmount,
  estimateReadyMealIntensity
} from './ready-meal'
import {
  estimateSoftDrinkSnackAnnualAmounts,
  estimateSoftDrinkSnackIntensities,
  getSoftDrinkSnackAnnualBaselineAmounts
} from './soft-drink-snack'

/** 外食の活動量を計算するための引数 */
export interface EatOutIntensityParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** 食事の摂取量 */
  foodIntake: FoodIntake
  /** 牛肉料理の頻度 */
  beefDishFrequency: DishFrequency
  /** 豚肉料理の頻度 */
  porkDishFrequency: DishFrequency
  /** 鶏肉料理の頻度 */
  chickenDishFrequency: DishFrequency
  /** 魚介料理の頻度 */
  seafoodDishFrequency: DishFrequency
  /** 乳製品料理の頻度 */
  dairyFoodFrequency: DairyFoodFrequency
  /** アルコールの頻度 */
  alcoholFrequency: AlcoholFrequency
  /** ソフトドリンクとスナックの支出 */
  softDrinkSnackExpenses: SoftDrinkSnackExpenses
}

/** 外食の活動量を計算するための引数 */
interface EatOutAmountParam {
  /** 外食の支出 */
  eatOutExpenses: EatOutExpenses
}

/**
 * 外食の活動量を計算する
 * @param item 外食の種類
 * @param param 外食の活動量を計算するための引数
 * @returns 外食の活動量[000JPY]
 */
export const estimateEatOutAnnualAmount = (
  item: EatOutItem,
  { eatOutExpenses }: EatOutAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const factor = getParameter('eat-out-factor', eatOutExpenses).value
  return baseline * factor
}

/**
 * 外食のGHG原単位を計算する
 * @param item 外食の種類
 * @param param 外食のGHG原単位を計算するための引数
 * @returns 外食のGHG原単位[kgCO2e/000JPY]
 */
export const estimateEatOutIntensity = (
  item: EatOutItem,
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    foodIntake,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency,
    dairyFoodFrequency,
    alcoholFrequency,
    softDrinkSnackExpenses
  }: EatOutIntensityParam
): number => {
  // 活動量推定値
  const estimatedAmounts: Record<string, number> = {
    ...estimateFoodIntakeAnnualAmounts({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake
    }),
    ...estimateSoftDrinkSnackAnnualAmounts({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      softDrinkSnackExpenses
    }),
    ...estimateDishAnnualAmounts({
      foodDirectWaste,
      foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency
    }),
    ...estimateDairyFoodAnnualAmounts({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      dairyFoodFrequency
    }),
    alcohol: estimateAlcoholAnnualAmount({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      alcoholFrequency
    }),
    'processed-meat': estimateProcessedMeatAnnualAmount({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    }),
    'ready-meal': estimateReadyMealAnnualAmount({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake
    })
  }

  // GHG原単位推定値
  const estimatedIntensities: Record<string, number> = {
    ...estimateFoodIntakeIntensities(),
    ...estimateSoftDrinkSnackIntensities(),
    ...estimateDishIntensities(),
    ...estimateDairyFoodIntensities(),
    alcohol: estimateAlcoholIntensity(),
    'processed-meat': estimateProcessedMeatIntensity(),
    'ready-meal': estimateReadyMealIntensity({
      foodDirectWasteFrequency: foodDirectWaste,
      foodLeftoverFrequency: foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      softDrinkSnackExpenses
    })
  }

  // 活動量ベースライン値
  const baselineAmounts: Record<string, number> = {
    ...getFoodIntakeAnnualBaselineAmounts(),
    ...getSoftDrinkSnackAnnualBaselineAmounts(),
    ...getDishAnnualBaselineAmounts(),
    ...getDairyFoodAnnualBaselineAmounts(),
    alcohol: getBaselineAmount('food', 'alcohol').value,
    'processed-meat': getBaselineAmount('food', 'processed-meat').value,
    'ready-meal': getBaselineAmount('food', 'ready-meal').value
  }

  const totalEstimatedAmount = Object.values(estimatedAmounts).reduce(
    (sum, value) => sum + value,
    0
  )
  const totalEstimatedFootprint = Object.entries(estimatedAmounts).reduce(
    (sum, [key, value]) => sum + value * estimatedIntensities[key],
    0
  )

  const totalBaselineAmount = Object.values(baselineAmounts).reduce(
    (sum, value) => sum + value,
    0
  )
  const totalBaselineFootprint = Object.entries(baselineAmounts).reduce(
    (sum, [key, value]) =>
      sum + value * getBaselineIntensity('food', key).value,
    0
  )

  const weightedAvgEstimation = totalEstimatedFootprint / totalEstimatedAmount
  const weightedAvgBaseline = totalBaselineFootprint / totalBaselineAmount

  const intensity = getBaselineIntensity('food', item).value
  return (intensity * weightedAvgEstimation) / weightedAvgBaseline
}
