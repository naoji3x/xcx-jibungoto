/*
 * beef
 * pork
 * chicken
 * other-meat
 * fish
 * processed-fish
 */

import {
  type DishFrequency,
  type DishItem,
  type FoodDirectWaste,
  type FoodLeftover
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

const getFactor = (item: DishItem): string => {
  switch (item) {
    case 'other-meat':
      return 'dish-pork-factor'
    case 'fish':
      return 'dish-seafood-factor'
    case 'processed-fish':
      return 'dish-seafood-factor'
    default:
      return 'dish-' + item + '-factor'
  }
}

interface DishAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  frequency: DishFrequency
}

export const estimateDishAnnualFootprint = (
  item: DishItem,
  { foodDirectWaste, foodLeftover, frequency }: DishAmountParam
): number =>
  estimateDishAnnualAmount(item, {
    foodDirectWaste,
    foodLeftover,
    frequency
  }) * estimateDishIntensity(item)

export const estimateDishAnnualAmount = (
  item: DishItem,
  { foodDirectWaste, foodLeftover, frequency }: DishAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const dishFactor = getParameter(getFactor(item), frequency).value
  return (
    baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

const defaultItems: DishItem[] = [
  'beef',
  'pork',
  'chicken',
  'other-meat',
  'fish',
  'processed-fish'
]

const getDishItems = (
  items: DishItem[],
  beefDishFrequency: DishFrequency,
  porkDishFrequency: DishFrequency,
  chickenDishFrequency: DishFrequency,
  seafoodDishFrequency: DishFrequency
): Array<{ item: DishItem; frequency: DishFrequency }> => {
  const dishItems: Array<{ item: DishItem; frequency: DishFrequency }> = []

  if (items.find((item) => item === 'beef') !== undefined) {
    dishItems.push({ item: 'beef', frequency: beefDishFrequency })
  }
  if (items.find((item) => item === 'pork') !== undefined) {
    dishItems.push({ item: 'pork', frequency: porkDishFrequency })
  }
  if (items.find((item) => item === 'chicken') !== undefined) {
    dishItems.push({ item: 'chicken', frequency: chickenDishFrequency })
  }
  if (items.find((item) => item === 'other-meat') !== undefined) {
    dishItems.push({ item: 'other-meat', frequency: porkDishFrequency })
  }
  if (items.find((item) => item === 'fish') !== undefined) {
    dishItems.push({ item: 'fish', frequency: seafoodDishFrequency })
  }
  if (items.find((item) => item === 'processed-fish') !== undefined) {
    dishItems.push({ item: 'processed-fish', frequency: seafoodDishFrequency })
  }
  return dishItems
}

export const estimateDishAnnualAmounts = (
  {
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  }: {
    foodDirectWaste: FoodDirectWaste
    foodLeftover: FoodLeftover
    beefDishFrequency: DishFrequency
    porkDishFrequency: DishFrequency
    chickenDishFrequency: DishFrequency
    seafoodDishFrequency: DishFrequency
  },
  items?: DishItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  const dishItems = getDishItems(
    items,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  )

  return dishItems.reduce(
    (acc, pair): Record<string, number> => ({
      ...acc,
      [pair.item]: estimateDishAnnualAmount(pair.item, {
        foodDirectWaste,
        foodLeftover,
        frequency: pair.frequency
      })
    }),
    {}
  )
}

export const estimateDishIntensities = (
  items?: DishItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateDishIntensity(item)
    }),
    {}
  )
}

export const getDishAnnualBaselineAmounts = (): Record<string, number> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

export const estimateDishIntensity = (item: DishItem): number =>
  getBaselineIntensity('food', item).value
