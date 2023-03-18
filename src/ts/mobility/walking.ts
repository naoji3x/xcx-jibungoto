import { type ResidentialAreaSize } from './types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountByArea } from './amount-calculation'

interface WalkingAmountParam {
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * 自転車の維持のフットプリントを計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自転車の維持のフットプリント[kgCO2e]
 */

export const estimateWalkingAnnualFootprint = ({
  residentialAreaSize
}: WalkingAmountParam): number =>
  estimateWalkingAnnualAmount({
    residentialAreaSize
  }) * estimateWalkingIntensity()

/**
 * 自転車の維持の活動量を計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 維持費[千円]
 */
export const estimateWalkingAnnualAmount = ({
  residentialAreaSize
}: WalkingAmountParam): number =>
  residentialAreaSize === undefined
    ? getBaselineAmount('mobility', 'walking').value
    : estimateAnnualAmountByArea('walking', residentialAreaSize)

/**
 * 自転車の維持のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/千円]
 */
export const estimateWalkingIntensity = (): number =>
  getBaselineIntensity('mobility', 'walking').value
