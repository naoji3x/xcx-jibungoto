import { type ResidentialAreaSize } from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountByArea } from './amount-calculation'

/**
 * 自転車の使用の活動量を計算するための引数
 * @remarks
 * 引数が省略された場合はベースライン値が返される
 */
export interface BicycleDrivingAmountParam {
  /** 住んでいる地域の規模 */
  residentialAreaSize?: ResidentialAreaSize
}

/**
 * 自転車の使用時のフットプリントを計算
 * @param param フットプリントを計算するための引数
 * @returns 自転車の使用時のフットプリント[kgCO2e]
 */
export const estimateBicycleDrivingAnnualFootprint = ({
  residentialAreaSize
}: BicycleDrivingAmountParam = {}): number =>
  estimateBicycleDrivingAnnualAmount({
    residentialAreaSize
  }) * estimateBicycleDrivingIntensity()

/**
 * 自転車の使用時の活動量を計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateBicycleDrivingAnnualAmount = ({
  residentialAreaSize
}: BicycleDrivingAmountParam = {}): number =>
  residentialAreaSize === undefined
    ? getBaselineAmount('mobility', 'bicycle-driving').value
    : estimateAnnualAmountByArea('bicycle-driving', residentialAreaSize)

/**
 * 自転車の使用時のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimateBicycleDrivingIntensity = (): number =>
  getBaselineIntensity('mobility', 'bicycle-driving').value
