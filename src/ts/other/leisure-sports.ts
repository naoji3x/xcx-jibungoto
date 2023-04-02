import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'
import {
  type LeisureSportsItem,
  type LeisureSportsExpenses
} from '../common/types'

// clothes-beauty

interface LeisureSportsIntensityParam {
  item: LeisureSportsItem
}

interface LeisureSportsAmountParam extends LeisureSportsIntensityParam {
  expenses: LeisureSportsExpenses
}

export const estimateLeisureSportsAnnualFootprint = ({
  item,
  expenses
}: LeisureSportsAmountParam): number =>
  estimateLeisureSportsAnnualAmount({ item, expenses }) *
  estimateLeisureSportsIntensity({ item })

export const estimateLeisureSportsAnnualAmount = ({
  item,
  expenses
}: LeisureSportsAmountParam): number =>
  estimateAnnualAmount(item, 'leisure-sports-factor', expenses)

export const estimateLeisureSportsIntensity = ({
  item
}: LeisureSportsIntensityParam): number =>
  getBaselineIntensity('other', item).value
