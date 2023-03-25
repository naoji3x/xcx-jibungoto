import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { type HousingSize } from './types'

interface RentAmountParam {
  housingSize: HousingSize
  residentCount: number
}

export const estimateRentAnnualFootprint = ({
  residentCount,
  housingSize
}: RentAmountParam): number =>
  estimateRentAnnualAmount({ residentCount, housingSize }) *
  estimateRentIntensity()

export const estimateRentAnnualAmount = ({
  residentCount,
  housingSize
}: RentAmountParam): number => {
  const housingSizeValue = getParameter('housing-size', housingSize).value

  const housingSizePerResident =
    housingSize === 'unknown'
      ? housingSizeValue
      : housingSizeValue / residentCount

  const imputedRent = getBaselineAmount('housing', 'imputed-rent').value
  const rent = getBaselineAmount('housing', 'rent').value

  const ratio = rent / (imputedRent + rent)
  return rent * ratio * housingSizePerResident
}

export const estimateRentIntensity = (): number =>
  getBaselineIntensity('housing', 'rent').value
