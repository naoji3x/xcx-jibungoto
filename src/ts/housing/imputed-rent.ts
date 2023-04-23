import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { type HousingParam } from './param'

/** 帰属家賃の活動量を計算するための引数 */
export type ImputedRentAmountParam = HousingParam

/**
 * 帰属家賃の活動量を計算
 * @param param 帰属家賃の活動量を計算するための引数
 * @returns 帰属家賃の活動量[000JPY]
 */
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

/**
 * 帰属家賃のGHG原単位を計算
 * @returns 帰属家賃のGHG原単位[kgCO2e/000JPY]
 */
export const estimateImputedRentIntensity = (): number =>
  getBaselineIntensity('housing', 'imputed-rent').value
