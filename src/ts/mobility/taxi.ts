import { type CarPassengers } from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'
import {
  estimateOtherCarAnnualAmount,
  type OtherCarAmountParam
} from './other-car'

/** タクシーのGHG原単位を計算するための引数 */
export interface TaxiIntensityParam {
  /** 平均乗車人数 */
  carPassengers: CarPassengers
}

/**
 * タクシーのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の使用時間を引数に設定
 * @param amountParam 移動量を計算するための引数
 * @param intensityParam タクシーのGHG原単位を計算するための引数
 * @returns タクシーのフットプリント[kgCO2e]
 */
export const estimateTaxiAnnualFootprint = (
  amountParam: OtherCarAmountParam,
  intensityParam: TaxiIntensityParam
): number =>
  estimateOtherCarAnnualAmount('taxi', amountParam) *
  estimateTaxiIntensity(intensityParam)

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
