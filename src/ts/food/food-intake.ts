/*
 * rice
 * bread-flour
 * noodle
 * potatoes
 * vegetables
 * processed-vegetables
 * beans
 * fruits
 * oil
 * seasoning
 * ready-meal
 */
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'
import {
  type FoodDirectWaste,
  type FoodLeftover,
  type FoodIntake,
  type FoodIntakeItem
} from '../common/types'

interface FoodIntakeAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  foodIntake: FoodIntake
}

export const estimateFoodIntakeAnnualFootprint = (
  item: FoodIntakeItem,
  { foodDirectWaste, foodLeftover, foodIntake }: FoodIntakeAmountParam
): number =>
  estimateFoodIntakeAnnualAmount(item, {
    foodDirectWaste,
    foodLeftover,
    foodIntake
  }) * estimateFoodIntakeIntensity(item)

export const estimateFoodIntakeAnnualAmount = (
  item: FoodIntakeItem,
  { foodDirectWaste, foodLeftover, foodIntake }: FoodIntakeAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const intake = getParameter('food-intake-factor', foodIntake).value
  return baseline * intake * estimateFoodLossRate(foodDirectWaste, foodLeftover)
}

const defaultItems: FoodIntakeItem[] = [
  'rice',
  'bread-flour',
  'noodle',
  'potatoes',
  'vegetables',
  'processed-vegetables',
  'beans',
  'fruits',
  'oil',
  'seasoning'
]

export const estimateFoodIntakeAnnualAmounts = (
  { foodDirectWaste, foodLeftover, foodIntake }: FoodIntakeAmountParam,
  items?: FoodIntakeItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateFoodIntakeAnnualAmount(item, {
        foodDirectWaste,
        foodLeftover,
        foodIntake
      })
    }),
    {}
  )
}

export const estimateFoodIntakeIntensities = (
  items?: FoodIntakeItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateFoodIntakeIntensity(item)
    }),
    {}
  )
}

export const getFoodIntakeAnnualBaselineAmounts = (): Record<string, number> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item)
    }),
    {}
  )

export const estimateFoodIntakeIntensity = (item: FoodIntakeItem): number =>
  getBaselineIntensity('food', item).value
