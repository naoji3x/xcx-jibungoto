import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface FurnitureParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateFurnitureAnnualFootprint = ({
  expenses,
  residentCount
}: FurnitureParam): number =>
  estimateFurnitureAnnualAmount({ expenses, residentCount }) *
  estimateFurnitureIntensity()

export const estimateFurnitureAnnualAmount = ({
  expenses,
  residentCount
}: FurnitureParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'furniture',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateFurnitureIntensity = (): number =>
  getBaselineIntensity('other', 'furniture').value
