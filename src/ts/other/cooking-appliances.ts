import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface CookingAppliancesParam {
  expenses: ApplianceFurnitureExpenses

  residentCount: number
}

export const estimateCookingAppliancesAnnualFootprint = ({
  expenses,
  residentCount
}: CookingAppliancesParam): number =>
  estimateCookingAppliancesAnnualAmount({ expenses, residentCount }) *
  estimateCookingAppliancesIntensity()

export const estimateCookingAppliancesAnnualAmount = ({
  expenses,
  residentCount
}: CookingAppliancesParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'cooking-appliances',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateCookingAppliancesIntensity = (): number =>
  getBaselineIntensity('other', 'cooking-appliances').value
