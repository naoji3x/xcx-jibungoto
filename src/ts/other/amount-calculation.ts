import { getBaselineAmount, getParameter } from '../data/database'
import { type Category, type Item } from './types'

export const estimateAnnualAmountConsideringResidentCount = (
  item: Item,
  category: Category,
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

export const estimateAnnualAmount = (
  item: Item,
  category: Category,
  key: string
): number => {
  const amount = getBaselineAmount('other', item).value
  const coefficient = getParameter(category, key).value
  return coefficient * amount
}
