import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type DailyGoodsExpenses } from './types'

interface KitchenGoodsParam {
  expenses: DailyGoodsExpenses
  residentCount: number
}

export const estimateKitchenGoodsAnnualFootprint = ({
  expenses,
  residentCount
}: KitchenGoodsParam): number =>
  estimateKitchenGoodsAnnualAmount({ expenses, residentCount }) *
  estimateKitchenGoodsIntensity()

export const estimateKitchenGoodsAnnualAmount = ({
  expenses,
  residentCount
}: KitchenGoodsParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'kitchen-goods',
    'daily-goods-amount',
    expenses,
    residentCount
  )

export const estimateKitchenGoodsIntensity = (): number =>
  getBaselineIntensity('other', 'kitchen-goods').value
