import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface OtherAppliancesParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateOtherAppliancesAnnualFootprint = ({
  expenses,
  residentCount
}: OtherAppliancesParam): number =>
  estimateOtherAppliancesAnnualAmount({ expenses, residentCount }) *
  estimateOtherAppliancesIntensity()

export const estimateOtherAppliancesAnnualAmount = ({
  expenses,
  residentCount
}: OtherAppliancesParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'other-appliances',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateOtherAppliancesIntensity = (): number =>
  getBaselineIntensity('other', 'other-appliances').value
