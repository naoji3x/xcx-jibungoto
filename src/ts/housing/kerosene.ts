import { getBaselineIntensity, getParameter } from '../data/database'

interface KeroseneAmountPram {
  monthlyConsumption: number
  monthCount: number
  residentCount: number
}

export const estimateKeroseneAnnualFootprint = ({
  monthlyConsumption,
  monthCount,
  residentCount
}: KeroseneAmountPram): number =>
  estimateKeroseneAnnualAmount({
    monthlyConsumption,
    monthCount,
    residentCount
  }) * estimateKeroseneIntensity()

export const estimateKeroseneAnnualAmount = ({
  monthlyConsumption,
  monthCount,
  residentCount
}: KeroseneAmountPram): number => {
  const keroseneFactor = getParameter('energy-heat-intensity', 'kerosene').value
  const ratio = keroseneFactor / residentCount
  return monthlyConsumption * monthCount * ratio
}

export const estimateKeroseneIntensity = (): number =>
  getBaselineIntensity('housing', 'kerosene').value
