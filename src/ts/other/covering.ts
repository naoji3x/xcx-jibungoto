import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface CoveringParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateCoveringAnnualFootprint = ({
  expenses,
  residentCount
}: CoveringParam): number =>
  estimateCoveringAnnualAmount({ expenses, residentCount }) *
  estimateCoveringIntensity()

export const estimateCoveringAnnualAmount = ({
  expenses,
  residentCount
}: CoveringParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'covering',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateCoveringIntensity = (): number =>
  getBaselineIntensity('other', 'covering').value
