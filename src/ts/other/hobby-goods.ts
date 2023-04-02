import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'
import { type HobbyGoodsItem, type HobbyGoodsExpenses } from '../common/types'

interface HobbyGoodsIntensityParam {
  item: HobbyGoodsItem
}

interface HobbyGoodsAmountParam extends HobbyGoodsIntensityParam {
  expenses: HobbyGoodsExpenses
}

export const estimateHobbyGoodsAnnualFootprint = ({
  item,
  expenses
}: HobbyGoodsAmountParam): number =>
  estimateHobbyGoodsAnnualAmount({ item, expenses }) *
  estimateHobbyGoodsIntensity({ item })

export const estimateHobbyGoodsAnnualAmount = ({
  item,
  expenses
}: HobbyGoodsAmountParam): number =>
  estimateAnnualAmount(item, 'hobby-goods-factor', expenses)

export const estimateHobbyGoodsIntensity = ({
  item
}: HobbyGoodsIntensityParam): number =>
  getBaselineIntensity('other', item).value
