import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface ElectronicsParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateElectronicsAnnualFootprint = ({
  expenses,
  residentCount
}: ElectronicsParam): number =>
  estimateElectronicsAnnualAmount({ expenses, residentCount }) *
  estimateElectronicsIntensity()

export const estimateElectronicsAnnualAmount = ({
  expenses,
  residentCount
}: ElectronicsParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'electronics',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateElectronicsIntensity = (): number =>
  getBaselineIntensity('other', 'electronics').value
