import { getParameter } from '../data/database'
import { type Electricity, type Month } from './types'
import { type CarCharging, type CarType } from '../mobility/types'

interface ElectricityIntensityParam {
  electricity: Electricity
}

interface ElectricityAmountParam {
  monthlyConsumption: number
  month: Month
  residentCount: number
  privateCar?: {
    carType: CarType
    annualMileage: number
    carCharging: CarCharging
  }
}

export const estimateElectricityAnnualFootprint = ({
  electricity,
  monthlyConsumption,
  month,
  residentCount,
  privateCar
}: ElectricityIntensityParam & ElectricityAmountParam): number =>
  estimateElectricityAnnualAmount({
    monthlyConsumption,
    month,
    residentCount,
    privateCar
  }) * estimateElectricityIntensity({ electricity })

export const estimateElectricityAnnualAmount = ({
  monthlyConsumption,
  month,
  residentCount,
  privateCar = undefined
}: ElectricityAmountParam): number => {
  const electricitySeason = getParameter(
    'electricity-season-factor',
    month
  ).value

  // PHV, EVの場合は活動量がダブルカウントにならないように補正
  let mobilityElectricityAmount = 0
  if (privateCar !== undefined) {
    if (privateCar.carType === 'phv' || privateCar.carType === 'ev') {
      const mobilityElectricity = getParameter(
        'car-intensity-factor',
        privateCar.carType + '_electricity-intensity'
      ).value
      const mobilityCharging = getParameter(
        'car-charging',
        privateCar.carCharging
      ).value
      mobilityElectricityAmount =
        privateCar.annualMileage * mobilityElectricity * mobilityCharging
    }
  }

  const ratio = electricitySeason / residentCount
  return monthlyConsumption * ratio - mobilityElectricityAmount
}

export const estimateElectricityIntensity = ({
  electricity
}: ElectricityIntensityParam): number =>
  getParameter('electricity-intensity', electricity).value
