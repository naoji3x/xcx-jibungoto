import { type CarType } from './types'
import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'

interface PrivateCarPurchaseIntensityParam {
  carType: CarType
}
interface PrivateCarPurchaseAmountParam {
  annualMileage: number
}

/**
 * 自家用車の購入時のフットプリントを計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param carType 自動車の種類
 * @returns 自家用車の購入時のフットプリント[kgCO2e]
 */
export const estimatePrivateCarPurchaseFootprint = ({
  annualMileage,
  carType
}: PrivateCarPurchaseAmountParam & PrivateCarPurchaseIntensityParam): number =>
  estimatePrivateCarPurchaseAmount({ annualMileage }) *
  estimatePrivateCarPurchaseIntensity({ carType })

/**
 * 自家用車の購入時の活動量を計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自家用車の購入時の活動量[000JPY]
 */
export const estimatePrivateCarPurchaseAmount = ({
  annualMileage
}: PrivateCarPurchaseAmountParam): number => {
  const purchaseBaseline = getBaselineAmount(
    'mobility',
    'private-car-purchase'
  ).value
  const drivingBaseline = getBaselineAmount(
    'mobility',
    'private-car-driving'
  ).value
  return (purchaseBaseline * annualMileage) / drivingBaseline
}

/**
 * 自家用車の購入時のGHG原単位を計算
 * @param carType 自動車の種類
 * @returns 自家用車の購入時のGHG原単位[kgCO2e/000JPY]
 */
export const estimatePrivateCarPurchaseIntensity = ({
  carType
}: PrivateCarPurchaseIntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'private-car-purchase'
  ).value

  // 自動車種類に応じて運転時GHG原単位の補正係数を取得
  const ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio
}
