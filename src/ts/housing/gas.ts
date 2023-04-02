import { type GasType, type Month } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'

/** estimateGasAnnualAmount の引数 */
export interface GasAmountPram {
  /** 1ヶ月のガス使用量[m3] */
  monthlyConsumption: number
  /** 対象月 */
  month: Month
  /** 居住者数 */
  residentCount: number
}

/**
 * 自宅のガスの年間のカーボンフットプリントを計算
 * @param param0 計算に必要なパラメータ
 * @returns カーボンフットプリント[kgCO2e]
 */
export const estimateGasAnnualFootprint = (
  item: GasType,
  { monthlyConsumption, month, residentCount }: GasAmountPram
): number =>
  estimateGasAnnualAmount(item, {
    monthlyConsumption,
    month,
    residentCount
  }) * estimateGasIntensity(item)

/**
 * 自宅のガスの年間の活動量を計算
 * @param param0 計算に必要なパラメータ
 * @returns 活動量[m3]
 */
export const estimateGasAnnualAmount = (
  item: GasType,
  { monthlyConsumption, month, residentCount }: GasAmountPram
): number => {
  const gasSeason = getParameter('gas-season-factor', month).value
  const gasFactor = getParameter('energy-heat-intensity', item).value
  const ratio = (gasSeason * gasFactor) / residentCount
  return monthlyConsumption * ratio
}

/**
 * 自宅のガスのGHG原単位を計算
 * @param param0 計算に必要なパラメータ
 * @returns GHG原単位[kgCO2e/m3]
 */
export const estimateGasIntensity = (item: GasType): number =>
  getBaselineIntensity('housing', item).value
