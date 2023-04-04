import { type HousingSize } from '../common/types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'

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

  return (housingSizePerResident * imputedRent) / (imputedRent + rent)
}

export const estimateImputedRentIntensity = (): number =>
  getBaselineIntensity('housing', 'imputed-rent').value
