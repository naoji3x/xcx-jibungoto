import {
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type EatOutItem,
  type FoodDirectWaste,
  type FoodIntake,
  type FoodLeftover,
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

interface EatOutIntensityParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  foodIntake: FoodIntake

  beefDishFrequency: DishFrequency
  porkDishFrequency: DishFrequency
  chickenDishFrequency: DishFrequency
  seafoodDishFrequency: DishFrequency

  dairyFoodFrequency: DairyFoodFrequency
  alcoholFrequency: AlcoholFrequency
  softDrinkSnackExpenses: SoftDrinkSnackExpenses
}

interface EatOutAmountParam {
  eatOutExpenses: EatOutExpenses
}

export const estimateEatOutAnnualFootprint = (
  item: EatOutItem,
  {
    eatOutExpenses,
    foodDirectWaste,
    foodLeftover,
    foodIntake,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency,
    dairyFoodFrequency,
    alcoholFrequency,
    softDrinkSnackExpenses
  }: EatOutAmountParam & EatOutIntensityParam
): number =>
  estimateEatOutAnnualAmount(item, {
    eatOutExpenses
  }) *
  estimateEatOutIntensity(item, {
    foodDirectWaste,
    foodLeftover,
    foodIntake,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency,
    dairyFoodFrequency,
    alcoholFrequency,
    softDrinkSnackExpenses
  })

export const estimateEatOutAnnualAmount = (
  item: EatOutItem,
  { eatOutExpenses }: EatOutAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const factor = getParameter('eat-out-factor', eatOutExpenses).value
  return baseline * factor
}

export const estimateEatOutIntensity = (
  item: EatOutItem,
  {
    foodDirectWaste,
    foodLeftover,
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
      foodDirectWaste,
      foodLeftover,
      foodIntake
    }),
    ...estimateSoftDrinkSnackAnnualAmounts({
      foodDirectWaste,
      foodLeftover,
      expenses: softDrinkSnackExpenses
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
      foodDirectWaste,
      foodLeftover,
      frequency: dairyFoodFrequency
    }),
    alcohol: estimateAlcoholAnnualAmount({
      foodDirectWaste,
      foodLeftover,
      frequency: alcoholFrequency
    }),
    'processed-meat': estimateProcessedMeatAnnualAmount({
      foodDirectWaste,
      foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    }),
    'ready-meal': estimateReadyMealAnnualAmount({
      foodDirectWaste,
      foodLeftover,
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
      foodDirectWaste,
      foodLeftover,
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

  console.log(estimatedAmounts)
  console.log(estimatedIntensities)

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
