import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { type HousingSize } from './types'

interface ImputedRentAmountParam {
  housingSize: HousingSize
  residentCount: number
}

export const estimateImputedRentAnnualFootprint = ({
  residentCount,
  housingSize
}: ImputedRentAmountParam): number =>
  estimateImputedRentAnnualAmount({ residentCount, housingSize }) *
  estimateImputedRentIntensity()

export const estimateImputedRentAnnualAmount = ({
  residentCount,
  housingSize
}: ImputedRentAmountParam): number => {
  const housingSizeValue = getParameter('housing-size', housingSize).value

  const housingSizePerResident =
    housingSize === 'unknown'
      ? housingSizeValue
      : housingSizeValue / residentCount

  const imputedRent = getBaselineAmount('housing', 'imputed-rent').value
  const rent = getBaselineAmount('housing', 'rent').value

  const ratio = imputedRent / (imputedRent + rent)
  return imputedRent * ratio * housingSizePerResident
}

export const estimateImputedRentIntensity = (): number =>
  getBaselineIntensity('housing', 'imputed-rent').value
