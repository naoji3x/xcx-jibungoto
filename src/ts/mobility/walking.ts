import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountByArea } from './amount-calculation'
import { type ResidentialAreaSizeParam } from './param'

/** 移動量を計算するための引数 */
export type WalkingAmountParam = ResidentialAreaSizeParam

/**
 * 徒歩移動の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateWalkingAnnualAmount = ({
  residentialAreaSize
}: WalkingAmountParam): number =>
  estimateAnnualAmountByArea('walking', residentialAreaSize)

/**
 * 徒歩移動のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateWalkingIntensity = (): number =>
  getBaselineIntensity('mobility', 'walking').value
