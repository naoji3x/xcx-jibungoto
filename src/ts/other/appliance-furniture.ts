import {
  type ApplianceFurnitureExpenses,
  type ApplianceFurnitureItem
} from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'

/** 家電・家具の活動量を計算するための引数 */

export interface ApplianceFurnitureAmountParam {
  /** 家電・家具に関わる支出 */
  expenses: ApplianceFurnitureExpenses
  /** 居住者数 */
  residentCount: number
}

/**
 * 家電・家具の年間の活動量を計算
 * @param item 家電・家具のカーボンフットプリントアイテム名
 * @param param 家電・家具の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateApplianceFurnitureAnnualAmount = (
  item: ApplianceFurnitureItem,
  { expenses, residentCount }: ApplianceFurnitureAmountParam
): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

/**
 * 家電・家具のGHG原単位を計算
 * @param item 家電・家具のカーボンフットプリントアイテム名
 * @remarks ベースライン値を返す
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export const estimateApplianceFurnitureIntensity = (
  item: ApplianceFurnitureItem
): number => getBaselineIntensity('other', item).value
