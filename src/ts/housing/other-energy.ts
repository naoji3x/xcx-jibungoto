import { getBaselineAmount, getBaselineIntensity } from '../data/database'

export const estimateOtherEnergyAnnualFootprint = (): number =>
  estimateOtherEnergyAnnualAmount() * estimateOtherEnergyIntensity()

export const estimateOtherEnergyAnnualAmount = (): number =>
  getBaselineAmount('housing', 'other-energy').value

export const estimateOtherEnergyIntensity = (): number =>
  getBaselineIntensity('housing', 'other-energy').value
