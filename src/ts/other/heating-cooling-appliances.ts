import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface HeatingCoolingAppliancesParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateHeatingCoolingAppliancesAnnualFootprint = ({
  expenses,
  residentCount
}: HeatingCoolingAppliancesParam): number =>
  estimateHeatingCoolingAppliancesAnnualAmount({ expenses, residentCount }) *
  estimateHeatingCoolingAppliancesIntensity()

export const estimateHeatingCoolingAppliancesAnnualAmount = ({
  expenses,
  residentCount
}: HeatingCoolingAppliancesParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'heating-cooling-appliances',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateHeatingCoolingAppliancesIntensity = (): number =>
  getBaselineIntensity('other', 'heating-cooling-appliances').value
