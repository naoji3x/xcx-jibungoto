import { type GasItem, type Month } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'

/** 自宅のガスの活動量を計算するための引数 */
export interface GasAmountPram {
  /** 1ヶ月のガス使用量[m3] */
  monthlyConsumption: number
  /** 対象月 */
  month: Month
  /** 居住者数 */
  residentCount: number
}

/**
 * 自宅のガスの年間の活動量を計算
 * @param item 自宅のガスの種類
 * @param param 自宅のガスの活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export const estimateGasAnnualAmount = (
  item: GasItem,
  { monthlyConsumption, month, residentCount }: GasAmountPram
): number => {
  const gasSeason = getParameter('gas-season-factor', month).value
  const gasFactor = getParameter('energy-heat-intensity', item).value
  const ratio = (gasSeason * gasFactor) / residentCount
  return monthlyConsumption * ratio
}

/**
 * 自宅のガスのGHG原単位を計算
 * @param item 自宅のガスの種類
 * @returns GHG原単位[kgCO2e/kWh]
 */
export const estimateGasIntensity = (item: GasItem): number =>
  getBaselineIntensity('housing', item).value
