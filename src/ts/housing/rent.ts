import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { type HousingParam } from './param'

/** 家賃の活動量を計算するための引数 */
export type RentAmountParam = HousingParam

/**
 * 家賃の活動量を計算
 * @param param 家賃の活動量を計算するための引数
 * @returns 家賃の活動量[000JPY]
 */
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

  return (housingSizePerResident * rent) / (imputedRent + rent)
}

/**
 * 家賃のGHG原単位を計算
 * @returns 家賃のGHG原単位[kgCO2e/000JPY]
 */
export const estimateRentIntensity = (): number =>
  getBaselineIntensity('housing', 'rent').value
