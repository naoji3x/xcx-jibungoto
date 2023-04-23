import { getBaselineIntensity } from '../data/database'
import {
  estimateAnnualAmount,
  estimateAnnualAmountByArea
} from './amount-calculation'
import {
  type AnnualTravelingTimeParam,
  type ResidentialAreaSizeParam
} from './param'

/** 移動量を計算するための引数 */
export type FerryAmountParam =
  | AnnualTravelingTimeParam
  | ResidentialAreaSizeParam

/**
 * フェリーでの移動時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateFerryAnnualAmount = (param: FerryAmountParam): number =>
  'residentialAreaSize' in param
    ? estimateAnnualAmountByArea('ferry', param.residentialAreaSize)
    : estimateAnnualAmount(param.annualTravelingTime, 'ferry-speed')

/**
 * 飛行機での移動時のGHG原単位を計算
 * @returns 移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateFerryIntensity = (): number =>
  getBaselineIntensity('mobility', 'ferry').value
