import {
  type CarIntensityFactorFirstKey,
  type CarChargingKey,
  type CarPassengersFirstKey,
  type ElectricityIntensityKey
} from './types'
import { getBaselineIntensity, getParameter } from '../data/database'

interface IntensityParam {
  carIntensityFactorFirstKey: CarIntensityFactorFirstKey
  carPassengersFirstKey: CarPassengersFirstKey
  carChargingKey?: CarChargingKey
  electricityIntensityKey?: ElectricityIntensityKey
}
interface AmountParam {
  mileage: number
}

/**
 * 自家用車の運転時のフットプリントを計算
 * @param privateCarMileage 自家用車の運転距離[km]
 * @param carIntensityFactorFirstKey 自動車の種類
 * @param carPassengersFirstKey 平均乗車人数
 * @param carChargingKey 自宅充電の割合
 * @param electricityIntensityKey 家庭での電力の種類
 * @returns 自家用車の運転時のフットプリント[kgCO2e]
 */
export const estimatePrivateCarDrivingFootprint = ({
  mileage,
  carIntensityFactorFirstKey,
  carPassengersFirstKey,
  carChargingKey = 'unknown',
  electricityIntensityKey = 'unknown'
}: AmountParam & IntensityParam): number =>
  estimatePrivateCarDrivingAmount({ mileage }) *
  estimatePrivateCarDrivingIntensity({
    carIntensityFactorFirstKey,
    carPassengersFirstKey,
    carChargingKey,
    electricityIntensityKey
  })

/**
 * 自家用車の運転時の活動量を計算
 * @param privateCarMileage 自家用車の運転距離[km]
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export const estimatePrivateCarDrivingAmount = ({
  mileage: privateCarMileage
}: AmountParam): number => {
  return privateCarMileage
}

/**
 * 自家用車の運転時のGHG原単位を計算
 * @param carIntensityFactorFirstKey 自動車の種類
 * @param carPassengersFirstKey 平均乗車人数
 * @param carChargingKey 自宅充電の割合
 * @param electricityIntensityKey 家庭での電力の種類
 * @returns 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimatePrivateCarDrivingIntensity = ({
  carIntensityFactorFirstKey,
  carPassengersFirstKey,
  carChargingKey = 'unknown',
  electricityIntensityKey = 'unknown'
}: IntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'private-car-driving'
  ).value

  // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
  let ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    carIntensityFactorFirstKey + '_driving-factor'
  ).value

  // PHV, EVの補正
  if (
    carIntensityFactorFirstKey === 'phv' ||
    carIntensityFactorFirstKey === 'ev'
  ) {
    // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
    const electricityIntensityFactor =
      getParameter('electricity-intensity-factor', electricityIntensityKey)
        .value * getParameter('car-charging', carChargingKey).value

    // GHG原単位の補正係数を電力割合で補正
    ghgIntensityRatio =
      ghgIntensityRatio * (1 - electricityIntensityFactor) +
      getParameter(
        'renewable-car-intensity-factor',
        carIntensityFactorFirstKey + '_driving-factor'
      ).value *
        electricityIntensityFactor
  }

  // 人数補正値
  const passengerIntensityRatio = getParameter(
    'car-passengers',
    carPassengersFirstKey + '_private-car-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio
}
