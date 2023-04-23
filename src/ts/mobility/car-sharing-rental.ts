import { type CarType } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'

/** カーシェアリングのレンタル時のGHG原単位を計算するための引数 */

interface CarSharingRentalIntensityParam {
  /** 車の種類 */
  carType: CarType
}
/**
 * カーシェアリングのレンタルのGHG原単位を計算
 * @param param カーシェアリングのレンタル時のGHG原単位を計算するための引数
 * @returns カーシェアリングのレンタルのGHG原単位[kgCO2e/レンタル回数]
 */
export const estimateCarSharingRentalIntensity = ({
  carType
}: CarSharingRentalIntensityParam): number => {
  // ベースラインのレンタルのGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'car-sharing-rental'
  ).value

  // 自動車種類に応じてレンタルのGHG原単位の補正係数を取得
  const ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio
}
