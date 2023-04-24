import {
  type DairyFoodFrequency,
  type DairyFoodItem,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

/** 乳製品の活動量を計算するための引数 */
export interface DairyFoodAmountParam {
  /** 食料の廃棄量 */
  foodDirectWasteFrequency: FoodDirectWasteFrequency
  /** 食料の食べ残し量 */
  foodLeftoverFrequency: FoodLeftoverFrequency
  /** 乳製品の摂取頻度 */
  dairyFoodFrequency: DairyFoodFrequency
}

/**
 * 乳製品の活動量を計算する
 * @param item 乳製品の種類
 * @param param 乳製品の活動量を計算するための引数
 * @returns 乳製品の活動量[kg]
 */
export const estimateDairyFoodAnnualAmount = (
  item: DairyFoodItem,
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dairyFoodFrequency: frequency
  }: DairyFoodAmountParam
): number => {
  const baseline = getBaselineAmount('food', item).value
  const foodIntake = getParameter('dairy-food-factor', frequency).value
  return (
    baseline * foodIntake * estimateFoodLossRate(foodDirectWaste, foodLeftover)
  )
}

const defaultItems: DairyFoodItem[] = ['milk', 'other-dairy', 'eggs']

/**
 * 乳製品の活動量を計算する
 * @param param 乳製品の活動量を計算するための引数
 * @param items 乳製品の種類の配列
 * @returns 乳製品の活動量のMap
 */
export const estimateDairyFoodAnnualAmounts = (
  {
    foodDirectWasteFrequency: foodDirectWaste,
    foodLeftoverFrequency: foodLeftover,
    dairyFoodFrequency: frequency
  }: DairyFoodAmountParam,
  items?: DairyFoodItem[]
): Record<string, number> => {
  if (items === undefined) {
    items = defaultItems
  }

  return items.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: estimateDairyFoodAnnualAmount(item, {
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        dairyFoodFrequency: frequency
      })
    }),
    {}
  )
}

/**
 * 乳製品のGHG原単位の強度を計算する
 * @param items 乳製品の種類の配列
 * @returns 乳製品のGHG原単位の強度のMap
 */
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

/**
 * 乳製品のGHG原単位を計算する
 * @returns 乳製品のGHG原単位のMap
 */
export const getDairyFoodAnnualBaselineAmounts = (): Record<string, number> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

/**
 * 乳製品のGHG原単位を計算する
 * @param item 乳製品の種類
 * @returns 乳製品のGHG原単位[kgCO2e/kg]
 */
export const estimateDairyFoodIntensity = (item: DairyFoodItem): number =>
  getBaselineIntensity('food', item).value
