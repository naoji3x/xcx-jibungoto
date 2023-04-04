import { type HousingSize } from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateImputedRentAnnualAmount } from './imputed-rent'
import { estimateRentAnnualAmount } from './rent'

interface HousingMaintenanceAmountParam {
  housingSize: HousingSize
  residentCount: number
}

export const estimateHousingMaintenanceAnnualFootprint = ({
  residentCount,
  housingSize
}: HousingMaintenanceAmountParam): number =>
  estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize }) *
  estimateHousingMaintenanceIntensity()

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

export const estimateHousingMaintenanceIntensity = (): number =>
  getBaselineIntensity('housing', 'housing-maintenance').value
