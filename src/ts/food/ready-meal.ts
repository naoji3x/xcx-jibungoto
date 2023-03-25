import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
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
import { estimateFoodLossRatio } from './ratio-calculation'
import {
  estimateSoftDrinkSnackAnnualAmount,
  estimateSoftDrinkSnackIntensity
} from './soft-drink-snack'
import {
  type FoodDirectWaste,
  type FoodLeftover,
  type FoodIntake,
  type DishFrequency,
  type DairyFoodFrequency,
  type SoftDrinkSnackExpenses
} from './types'

interface ReadyMealIntensityParam extends ReadyMealAmountParam {
  beefDishFrequency: DishFrequency
  porkDishFrequency: DishFrequency
  chickenDishFrequency: DishFrequency
  seafoodDishFrequency: DishFrequency
  dairyFoodFrequency: DairyFoodFrequency
  softDrinkSnackExpenses: SoftDrinkSnackExpenses
}

interface ReadyMealAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  foodIntake: FoodIntake
}

export const estimateReadyMealAnnualFootprint = ({
  foodDirectWaste,
  foodLeftover,
  foodIntake,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency,
  seafoodDishFrequency,
  dairyFoodFrequency,
  softDrinkSnackExpenses
}: ReadyMealIntensityParam): number =>
  estimateReadyMealAnnualAmount({
    foodDirectWaste,
    foodLeftover,
    foodIntake
  }) *
  estimateReadyMealIntensity({
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

export const estimateReadyMealAnnualAmount = ({
  foodDirectWaste,
  foodLeftover
}: ReadyMealAmountParam): number => {
  const baseline = getBaselineAmount('food', 'ready-meal').value
  const intake = getParameter('food-intake-factor', 'ready-meal').value
  return (
    baseline * intake * estimateFoodLossRatio(foodDirectWaste, foodLeftover)
  )
}

export const estimateReadyMealIntensity = ({
  foodDirectWaste,
  foodLeftover,
  foodIntake,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency,
  seafoodDishFrequency,
  dairyFoodFrequency,
  softDrinkSnackExpenses
}: ReadyMealIntensityParam): number => {
  // 活動量推定値
  const estimatedAmounts: Record<string, number> = {
    ...estimateFoodIntakeAnnualAmounts({
      foodDirectWaste,
      foodLeftover,
      foodIntake
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
    'sweets-snack': estimateSoftDrinkSnackAnnualAmount('sweets-snack', {
      foodDirectWaste,
      foodLeftover,
      expenses: softDrinkSnackExpenses
    }),
    'processed-meat': estimateProcessedMeatAnnualAmount({
      foodDirectWaste,
      foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    })
  }

  // GHG原単位推定値
  const estimatedIntensities: Record<string, number> = {
    ...estimateFoodIntakeIntensities(),
    ...estimateDishIntensities(),
    ...estimateDairyFoodIntensities(),
    'sweets-snack': estimateSoftDrinkSnackIntensity('sweets-snack'),
    'processed-meat': estimateProcessedMeatIntensity()
  }

  // 活動量ベースライン値
  const baselineAmounts: Record<string, number> = {
    ...getFoodIntakeAnnualBaselineAmounts(),
    ...getDishAnnualBaselineAmounts(),
    ...getDairyFoodAnnualBaselineAmounts(),
    'sweets-snack': getBaselineAmount('food', 'sweets-snack').value,
    'processed-meat': getBaselineAmount('food', 'processed-meat').value
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

  const intensity = getBaselineIntensity('food', 'ready-meal').value
  return (intensity * weightedAvgEstimation) / weightedAvgBaseline
}
