import { getBaselineIntensity, getParameter } from '../data/database'

/** 灯油の活動量を計算するための引数 */
interface KeroseneAmountPram {
  /** 1ヶ月の灯油使用量[L] */
  monthlyConsumption: number
  /** 対象月数 */
  monthCount: number
  /** 居住者数 */
  residentCount: number
}

/**
 * 灯油の年間の活動量を計算
 * @param param 灯油の活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export const estimateKeroseneAnnualAmount = ({
  monthlyConsumption,
  monthCount,
  residentCount
}: KeroseneAmountPram): number => {
  const keroseneFactor = getParameter('energy-heat-intensity', 'kerosene').value
  return (monthlyConsumption * monthCount * keroseneFactor) / residentCount
}

/**
 * 灯油のGHG原単位を計算
 * @returns GHG原単位[kgCO2e/kWh]
 */
export const estimateKeroseneIntensity = (): number =>
  getBaselineIntensity('housing', 'kerosene').value
