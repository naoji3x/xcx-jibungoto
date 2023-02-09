import { getBaselineIntensity, getParameter } from '../data/database'

// 自家用車の種類
export type CarIntensityFactorFirstKey =
  | 'gasoline'
  | 'light'
  | 'hv'
  | 'phv'
  | 'ev'
  | 'unknown'

// 自宅充電の割合
export type CarChargingKey =
  | 'charge-almost-at-home'
  | 'use-charging-spots-occasionally'
  | 'use-charging-spots-sometimes'
  | 'use-charging-spots-usually'
  | 'unknown'

// 平均乗車人数
export type CarPassengersFirstKey =
  | '1'
  | '1-2'
  | '2'
  | '2-3'
  | '3'
  | '3-4'
  | '4-more'
  | 'unknown'

// 家庭での電力の種類
export type ElectricityIntensityKey =
  | 'conventional'
  | '30-renewable'
  | '50-renewable'
  | '100-renewable'
  | 'solar-panel'
  | 'unknown'

/**
 * 自家用車の運転時の活動量[km-passenger]を計算
 */
export const estimatePrivateCarDrivingAmount = (
  privateCarAnnualMileage: number
): number => {
  return privateCarAnnualMileage
}

/**
 * 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]を計算
 */
export const estimatePrivateCarDrivingIntensity = (
  carIntensityFactorFirstKey: CarIntensityFactorFirstKey,
  carChargingKey: CarChargingKey,
  carPassengersFirstKey: CarPassengersFirstKey,
  electricityIntensityKey: ElectricityIntensityKey = 'unknown'
): number => {
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
