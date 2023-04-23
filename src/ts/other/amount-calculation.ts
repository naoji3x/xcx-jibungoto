import { type OtherCategory, type OtherItem } from '../common/types'
import { getBaselineAmount, getParameter } from '../data/database'

/**
 * 居住者の人数を考慮した活動量の補正計算
 * @param item その他のアイテム名
 * @param category パラメータテーブルを検索する際のカテゴリ
 * @param key パラメータテーブルを検索する際のキー
 * @param residentCount 居住者人数
 * @returns 補正された活動量
 */
export const estimateAnnualAmountConsideringResidentCount = (
  item: OtherItem,
  category: OtherCategory,
  key: string,
  residentCount: number
): number => {
  const amount = getBaselineAmount('other', item).value
  if (key === 'unknown') {
    // 国平均の支出額（average-per-capita）が指定されていて、わからない、の回答の場合は
    // 国平均に対する比率は1倍。
    return amount
  } else {
    // 分子はパラメータテーブルから取得
    const numerator = getParameter(category, key).value
    // 国平均の支出額（average-per-capita）を取得
    const averagePerCapita = getParameter(category, 'average-per-capita').value
    // 分母は国平均の支出額（average-per-capita） * 居住人数
    const denominator = averagePerCapita * residentCount
    return (amount * numerator) / denominator
  }
}

/**
 * 活動量の補正計算
 * @param item その他のアイテム名
 * @param category パラメータテーブルを検索する際のカテゴリ
 * @param key パラメータテーブルを検索する際のキー
 * @returns 補正された活動量
 */
export const estimateAnnualAmount = (
  item: OtherItem,
  category: OtherCategory,
  key: string
): number => {
  const amount = getBaselineAmount('other', item).value
  const coefficient = getParameter(category, key).value
  return coefficient * amount
}
