import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType
} from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'
import { estimateCarDrivingIntensityFactor } from './factor-calculation'

/** 自家用車の運転時のGHG原単位を計算するための引数 */
interface PrivateCarDrivingIntensityParam {
  /** 車の種類 */
  carType: CarType
  /** 平均乗車人数 */
  carPassengers: CarPassengers
  /** 充電方法 */
  carCharging?: CarCharging
  /** 電力の種類 */
  electricityType?: ElectricityType
}

/** 自家用車の運転時の活動量を計算するための引数 */
interface PrivateCarDrivingAmountParam {
  /** 自家用車の運転距離[km] */
  mileage: number
}

/**
 * 自家用車の運転時の活動量を計算
 * @param param 自家用車の運転時の活動量を計算するための引数
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export const estimatePrivateCarDrivingAmount = ({
  mileage
}: PrivateCarDrivingAmountParam): number => mileage

/**
 * 自家用車の運転時のGHG原単位を計算
 * @param param 自家用車の運転時のGHG原単位を計算するための引数
 * @returns 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]
 */
export const estimatePrivateCarDrivingIntensity = ({
  carType,
  carPassengers,
  carCharging = 'unknown',
  electricityType = 'unknown'
}: PrivateCarDrivingIntensityParam): number => {
  // ベースラインの運転時のGHG原単位を取得
  const baselineIntensity = getBaselineIntensity(
    'mobility',
    'private-car-driving'
  ).value

  // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
  const carDrivingIntensityFactor = estimateCarDrivingIntensityFactor(
    carType,
    carCharging,
    electricityType
  )

  // 人数補正値
  const passengerIntensityFactor = getParameter(
    'car-passengers',
    carPassengers + '_private-car-factor'
  ).value

  return (
    baselineIntensity * carDrivingIntensityFactor * passengerIntensityFactor
  )
}
