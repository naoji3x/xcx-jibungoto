import { type CarPassengers } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'

/** タクシーのGHG原単位を計算するための引数 */
export interface TaxiIntensityParam {
  /** 平均乗車人数 */
  carPassengers: CarPassengers
}

/**
 * タクシーのGHG原単位を計算
 * @param param タクシーのGHG原単位を計算するための引数
 * @returns タクシーのGHG原単位[kgCO2e/km-passenger]
 */
export const estimateTaxiIntensity = ({
  carPassengers
}: TaxiIntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity('mobility', 'taxi').value
  //  人数補正値
  const rate = getParameter(
    'car-passengers',
    carPassengers + '_taxi-factor'
  ).value
  return baselineIntensity * rate
}
