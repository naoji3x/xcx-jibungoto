/*
 * sweets-snack
 * coffee-tea
 * cold-drink
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
  type SoftDrinkSnackExpenses,
  type SoftDrinkSnackItem
} from '../common/types'

interface SoftDrinkSnackAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  expenses: SoftDrinkSnackExpenses
}

export const estimateSoftDrinkSnackAnnualFootprint = (
  item: SoftDrinkSnackItem,
  { foodDirectWaste, foodLeftover, expenses }: SoftDrinkSnackAmountParam
): number =>
  estimateSoftDrinkSnackAnnualAmount(item, {
    foodDirectWaste,
    foodLeftover,
    expenses
  }) * estimateSoftDrinkSnackIntensity(item)

export const estimateSoftDrinkSnackAnnualAmount = (
  item: SoftDrinkSnackItem,
  { foodDirectWaste, foodLeftover, expenses }: SoftDrinkSnackAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const dishFactor = getParameter('soft-drink-snack-factor', expenses).value
  return (
    baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

const defaultItems: SoftDrinkSnackItem[] = [
  'sweets-snack',
  'coffee-tea',
  'cold-drink'
]

export const estimateSoftDrinkSnackAnnualAmounts = (
  { foodDirectWaste, foodLeftover, expenses }: SoftDrinkSnackAmountParam,
  items?: SoftDrinkSnackItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateSoftDrinkSnackAnnualAmount(item, {
        foodDirectWaste,
        foodLeftover,
        expenses
      })
    }),
    {}
  )
}

export const estimateSoftDrinkSnackIntensities = (
  items?: SoftDrinkSnackItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateSoftDrinkSnackIntensity(item)
    }),
    {}
  )
}

export const getSoftDrinkSnackAnnualBaselineAmounts = (): Record<
  string,
  number
> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item)
    }),
    {}
  )

export const estimateSoftDrinkSnackIntensity = (
  item: SoftDrinkSnackItem
): number => getBaselineIntensity('food', item).value
