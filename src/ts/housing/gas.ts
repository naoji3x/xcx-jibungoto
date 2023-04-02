import { getBaselineIntensity, getParameter } from '../data/database'
import { type GasType, type Month } from '../common/types'

interface GasIntensityPram {
  gasType: GasType
}

interface GasAmountPram extends GasIntensityPram {
  monthlyConsumption: number
  month: Month
  residentCount: number
}

export const estimateGasAnnualFootprint = ({
  gasType,
  monthlyConsumption,
  month,
  residentCount
}: GasAmountPram): number =>
  estimateGasAnnualAmount({
    gasType,
    monthlyConsumption,
    month,
    residentCount
  }) * estimateGasIntensity({ gasType })

export const estimateGasAnnualAmount = ({
  gasType,
  monthlyConsumption,
  month,
  residentCount
}: GasAmountPram): number => {
  const gasSeason = getParameter('gas-season-factor', month).value
  const gasFactor = getParameter('energy-heat-intensity', gasType).value
  const ratio = (gasSeason * gasFactor) / residentCount
  return monthlyConsumption * ratio
}

export const estimateGasIntensity = ({ gasType }: GasIntensityPram): number =>
  getBaselineIntensity('housing', gasType).value
