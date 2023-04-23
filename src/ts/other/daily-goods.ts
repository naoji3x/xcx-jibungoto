import { type DailyGoodsExpenses, type DailyGoodsItem } from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'

/** 日常品の活動量を計算するための引数 */
interface DailyGoodsAmountParam {
  /** 日常品に関わる支出 */
  expenses: DailyGoodsExpenses
  /** 居住者数 */
  residentCount: number
}

/**
 * 日常品の年間の活動量を計算
 * @param item 日常品のカーボンフットプリントアイテム名
 * @param param 日常品の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateDailyGoodsAnnualAmount = (
  item: DailyGoodsItem,
  { expenses, residentCount }: DailyGoodsAmountParam
): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'daily-goods-amount',
    expenses,
    residentCount
  )

/**
 * 日常品のGHG原単位を計算
 * @param item 日常品のカーボンフットプリントアイテム名
 * @returns   GHG原単位[kgCO2e/000JPY]
 */
export const estimateDailyGoodsIntensity = (item: DailyGoodsItem): number =>
  getBaselineIntensity('other', item).value
