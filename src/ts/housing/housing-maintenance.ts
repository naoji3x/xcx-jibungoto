import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateImputedRentAnnualAmount } from './imputed-rent'
import { type HousingParam } from './param'
import { estimateRentAnnualAmount } from './rent'

/** 家の維持の活動量を計算するための引数 */
export type HousingMaintenanceAmountParam = HousingParam

/**
 * 家の維持の活動量を計算
 * @param param 家の維持の活動量を計算するための引数
 * @returns 家の維持の活動量[000JPY]
 */
export const estimateHousingMaintenanceAnnualAmount = ({
  residentCount,
  housingSize
}: HousingMaintenanceAmountParam): number => {
  const baseline = getBaselineAmount('housing', 'housing-maintenance').value
  const imputedRent = getBaselineAmount('housing', 'imputed-rent').value
  const rent = getBaselineAmount('housing', 'rent').value
  const imputedRentEstimation = estimateImputedRentAnnualAmount({
    residentCount,
    housingSize
  })
  const rentEstimation = estimateRentAnnualAmount({
    residentCount,
    housingSize
  })

  const rate = (imputedRentEstimation + rentEstimation) / (imputedRent + rent)
  return baseline * rate
}

/**
 * 家の維持のGHG原単位を計算
 * @returns 家の維持のGHG原単位[kgCO2e/000JPY]
 */
export const estimateHousingMaintenanceIntensity = (): number =>
  getBaselineIntensity('housing', 'housing-maintenance').value
