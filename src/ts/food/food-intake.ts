import {
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodIntakeItem,
  type FoodLeftoverFrequency
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

/**
 * 食料摂取量の活動量を計算するための引数
 */
export interface FoodIntakeAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** 食料摂取量 */
  foodIntake: FoodIntake
}

/**
 * 食料摂取量の活動量を計算する
 * @param item 食料の種類
 * @param param 食料摂取量の活動量を計算するための引数
 * @returns 食料摂取量の活動量[kg]
 */
export const estimateFoodIntakeAnnualAmount = (
  item: FoodIntakeItem,
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    foodIntake
  }: FoodIntakeAmountParam
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

/**
 * 食料摂取量の活動量を計算する
 * @param param 食料摂取量の活動量を計算するための引数
 * @param items 食料の種類の配列
 * @returns 食料摂取量の活動量のMap
 */
export const estimateFoodIntakeAnnualAmounts = (
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    foodIntake
  }: FoodIntakeAmountParam,
  items?: FoodIntakeItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateFoodIntakeAnnualAmount(item, {
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        foodIntake
      })
    }),
    {}
  )
}

/**
 * 食料摂取量のGHG原単位を計算する
 * @param items 食料の種類の配列
 * @returns 食料摂取量のGHG原単位のMap
 */
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

/**
 * 食料摂取量の活動量のベースライン値を取得する
 * @returns 食料摂取量の活動量のMap
 */
export const getFoodIntakeAnnualBaselineAmounts = (): Record<string, number> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

/**
 *  食料摂取量のGHG原単位を取得する
 * @param item 食料の種類
 * @returns 食料摂取量のGHG原単位[kgCO2e/kg]
 */
export const estimateFoodIntakeIntensity = (item: FoodIntakeItem): number =>
  getBaselineIntensity('food', item).value
