import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type DailyGoodsExpenses } from './types'

interface SanitationParam {
  expenses: DailyGoodsExpenses
  residentCount: number
}

export const estimateSanitationAnnualFootprint = ({
  expenses,
  residentCount
}: SanitationParam): number =>
  estimateSanitationAnnualAmount({ expenses, residentCount }) *
  estimateSanitationIntensity()

export const estimateSanitationAnnualAmount = ({
  expenses,
  residentCount
}: SanitationParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'sanitation',
    'daily-goods-amount',
    expenses,
    residentCount
  )

export const estimateSanitationIntensity = (): number =>
  getBaselineIntensity('other', 'sanitation').value
