import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type DailyGoodsItem, type DailyGoodsExpenses } from '../common/types'

interface DailyGoodsIntensityParam {
  item: DailyGoodsItem
}

interface DailyGoodsAmountParam extends DailyGoodsIntensityParam {
  expenses: DailyGoodsExpenses
  residentCount: number
}

export const estimateDailyGoodsAnnualFootprint = ({
  item,
  expenses,
  residentCount
}: DailyGoodsAmountParam): number =>
  estimateDailyGoodsAnnualAmount({ item, expenses, residentCount }) *
  estimateDailyGoodsIntensity({ item })

export const estimateDailyGoodsAnnualAmount = ({
  item,
  expenses,
  residentCount
}: DailyGoodsAmountParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'daily-goods-amount',
    expenses,
    residentCount
  )

export const estimateDailyGoodsIntensity = ({
  item
}: DailyGoodsIntensityParam): number =>
  getBaselineIntensity('other', item).value
