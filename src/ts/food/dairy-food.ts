/*
 * milk
 * other-dairy
 * eggs
 */
import {
  type DairyFoodFrequency,
  type DairyFoodItem,
  type FoodDirectWaste,
  type FoodLeftover
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

interface DairyFoodAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  frequency: DairyFoodFrequency
}

export const estimateDairyFoodAnnualFootprint = (
  item: DairyFoodItem,
  { foodDirectWaste, foodLeftover, frequency }: DairyFoodAmountParam
): number =>
  estimateDairyFoodAnnualAmount(item, {
    foodDirectWaste,
    foodLeftover,
    frequency
  }) * estimateDairyFoodIntensity(item)

export const estimateDairyFoodAnnualAmount = (
  item: DairyFoodItem,
  { foodDirectWaste, foodLeftover, frequency }: DairyFoodAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const foodIntake = getParameter('dairy-food-factor', frequency).value
  return (
    baseline * foodIntake * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

const defaultItems: DairyFoodItem[] = ['milk', 'other-dairy', 'eggs']

export const estimateDairyFoodAnnualAmounts = (
  { foodDirectWaste, foodLeftover, frequency }: DairyFoodAmountParam,
  items?: DairyFoodItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateDairyFoodAnnualAmount(item, {
        foodDirectWaste,
        foodLeftover,
        frequency
      })
    }),
    {}
  )
}

export const estimateDairyFoodIntensities = (
  items?: DairyFoodItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateDairyFoodIntensity(item)
    }),
    {}
  )
}

export const getDairyFoodAnnualBaselineAmounts = (): Record<string, number> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

export const estimateDairyFoodIntensity = (item: DairyFoodItem): number =>
  getBaselineIntensity('food', item).value
