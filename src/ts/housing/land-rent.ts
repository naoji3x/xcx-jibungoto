import { getBaselineAmount, getBaselineIntensity } from '../data/database'

export const estimateLandRentAnnualFootprint = (): number =>
  estimateLandRentAnnualAmount() * estimateLandRentIntensity()

export const estimateLandRentAnnualAmount = (): number =>
  getBaselineAmount('housing', 'land-rent').value

export const estimateLandRentIntensity = (): number =>
  getBaselineIntensity('housing', 'land-rent').value
