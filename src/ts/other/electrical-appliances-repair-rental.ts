import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface ElectricalAppliancesRepairRentalParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateElectricalAppliancesRepairRentalAnnualFootprint = ({
  expenses,
  residentCount
}: ElectricalAppliancesRepairRentalParam): number =>
  estimateElectricalAppliancesRepairRentalAnnualAmount({
    expenses,
    residentCount
  }) * estimateElectricalAppliancesRepairRentalIntensity()

export const estimateElectricalAppliancesRepairRentalAnnualAmount = ({
  expenses,
  residentCount
}: ElectricalAppliancesRepairRentalParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'electrical-appliances-repair-rental',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateElectricalAppliancesRepairRentalIntensity = (): number =>
  getBaselineIntensity('other', 'electrical-appliances-repair-rental').value
