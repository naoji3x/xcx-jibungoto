import { getBaselineAmount, getBaselineIntensity } from '../data/database'

export const estimateWaterAnnualFootprint = (): number =>
  estimateWaterAnnualAmount() * estimateWaterIntensity()

export const estimateWaterAnnualAmount = (): number =>
  getBaselineAmount('housing', 'water').value

export const estimateWaterIntensity = (): number =>
  getBaselineIntensity('housing', 'water').value
