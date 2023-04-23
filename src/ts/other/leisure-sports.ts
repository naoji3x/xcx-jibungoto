import {
  type LeisureSportsExpenses,
  type LeisureSportsItem
} from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** レジャー・スポーツの活動量を計算するための引数 */
interface LeisureSportsAmountParam {
  /** レジャー・スポーツに関わる支出 */
  expenses: LeisureSportsExpenses
}

/**
 * レジャー・スポーツの年間の活動量を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @param param レジャー・スポーツの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateLeisureSportsAnnualAmount = (
  item: LeisureSportsItem,
  { expenses }: LeisureSportsAmountParam
): number => estimateAnnualAmount(item, 'leisure-sports-factor', expenses)

/**
 * レジャー・スポーツのGHG原単位を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export const estimateLeisureSportsIntensity = (
  item: LeisureSportsItem
): number => getBaselineIntensity('other', item).value
