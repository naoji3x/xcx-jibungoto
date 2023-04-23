import {
  type FoodDirectWaste,
  type FoodLeftover,
  type SoftDrinkSnackExpenses,
  type SoftDrinkSnackItem
} from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'

/** ソフトドリンク・スナックの活動量を計算するための引数 */
interface SoftDrinkSnackAmountParam {
  /** 食料の廃棄量 */
  foodDirectWaste: FoodDirectWaste
  /** 食料の食べ残し量 */
  foodLeftover: FoodLeftover
  /** ソフトドリンク・スナックの支出 */
  expenses: SoftDrinkSnackExpenses
}

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @param item ソフトドリンク・スナックの種類
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @returns ソフトドリンク・スナックの活動量[kg]
 */
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

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックの活動量のMap
 */
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

/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックのGHG原単位のMap
 */
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

/**
 * ソフトドリンク・スナックの活動量を計算する
 * @returns ソフトドリンク・スナックの活動量のMap
 */
export const getSoftDrinkSnackAnnualBaselineAmounts = (): Record<
  string,
  number
> =>
  defaultItems.reduce(
    (acc, item): Record<string, number> => ({
      ...acc,
      [item]: getBaselineAmount('food', item).value
    }),
    {}
  )

/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param item ソフトドリンク・スナックの種類
 * @returns ソフトドリンク・スナックのGHG原単位[kgCO2e/kg]
 */
export const estimateSoftDrinkSnackIntensity = (
  item: SoftDrinkSnackItem
): number => getBaselineIntensity('food', item).value
