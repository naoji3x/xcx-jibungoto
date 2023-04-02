import {
  type CarCharging,
  type CarType,
  type ElectricityType,
  type Month
} from '../common/types'
import { getParameter } from '../data/database'

/** estimateElectricityIntensity の引数 */
export interface ElectricityIntensityParam {
  /** 自宅での電力の種類 */
  electricity: ElectricityType
}

/** estimateElectricityAnnualAmount の引数 */
export interface ElectricityAmountParam {
  /** 1ヶ月の電力使用量[kWh] */
  monthlyConsumption: number
  /** 対象月 */
  month: Month
  /** 居住者数 */
  residentCount: number
  /** 自家用車の情報。EV, PHVの場合の補正に使用 */
  privateCar?: {
    /** 車の種類 */
    carType: CarType
    /** 年間走行距離[km/年] */
    annualMileage: number
    /** 自宅充電の頻度 */
    carCharging: CarCharging
  }
}

/**
 * 自宅の電力の年間のカーボンフットプリントを計算
 * @param param0 計算に必要なパラメータ
 * @returns カーボンフットプリント[kgCO2e]
 */
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

/**
 * 自宅の電力の年間の活動量を計算
 * @param param0 計算に必要なパラメータ
 * @returns 活動量[kWh]
 */
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

  const rate = electricitySeason / residentCount
  return monthlyConsumption * rate - mobilityElectricityAmount
}

/**
 * 自宅の電力のGHG原単位を計算
 * @param param0 計算に必要なパラメータ
 * @returns GHG原単位[kgCO2e/kWh]
 */
export const estimateElectricityIntensity = ({
  electricity
}: ElectricityIntensityParam): number =>
  getParameter('electricity-intensity', electricity).value
