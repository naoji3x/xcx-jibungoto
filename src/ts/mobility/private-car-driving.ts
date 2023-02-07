import { getBaselineIntensity, getParameter } from '../data/database'

export type PrivateCarDrivingAmountParam = {
  // 年間の走行距離 km/年
  privateCarAnnualMileage: number
}

export type PrivateCarDrivingIntensityParam = {
  // 自家用車の種類
  carIntensityFactorFirstKey:
    | 'gasoline'
    | 'light'
    | 'hv'
    | 'phv'
    | 'ev'
    | 'unknown'
  // 自宅充電の割合
  carChargingKey:
    | 'charge-almost-at-home'
    | 'use-charging-spots-occasionally'
    | 'use-charging-spots-sometimes'
    | 'use-charging-spots-usually'
    | 'unknown'
  // 平均乗車人数
  carPassengersFirstKey:
    | '1'
    | '1-2'
    | '2'
    | '2-3'
    | '3'
    | '3-4'
    | '4-more'
    | 'unknown'

  // 家庭での電力の種類
  electricityIntensityKey:
    | 'conventional'
    | '30-renewable'
    | '50-renewable'
    | '100-renewable'
    | 'solar-panel'
    | 'unknown'
}

/**
 * 自家用車の運転時の活動量[km-passenger]を計算
 */
export const estimatePrivateCarDrivingAmount = (
  param: PrivateCarDrivingAmountParam
): number => {
  return param.privateCarAnnualMileage
}

/**
 * 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]を計算
 */
export const estimatePrivateCarDrivingIntensity = (
  param: PrivateCarDrivingIntensityParam
): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'private-car-driving'
  ).value

  // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
  let ghgIntensityRatio = getParameter(
    'car-intensity-factor',
    param.carIntensityFactorFirstKey + '_driving-factor'
  ).value

  // PHV, EVの補正
  if (
    param.carIntensityFactorFirstKey === 'phv' ||
    param.carIntensityFactorFirstKey === 'ev'
  ) {
    // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
    const electricityIntensityFactor =
      getParameter(
        'electricity-intensity-factor',
        param.electricityIntensityKey
      ).value * getParameter('car-charging', param.carChargingKey).value

    // GHG原単位の補正係数を電力割合で補正
    ghgIntensityRatio =
      ghgIntensityRatio * (1 - electricityIntensityFactor) +
      getParameter(
        'renewable-car-intensity-factor',
        param.carIntensityFactorFirstKey + '_driving-factor'
      ).value *
        electricityIntensityFactor
  }

  // 人数補正値
  const passengerIntensityRatio = getParameter(
    'car-passengers',
    param.carPassengersFirstKey + '_private-car-factor'
  ).value

  return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio
}
