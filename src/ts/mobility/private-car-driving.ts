import {
  type CarType,
  type CarCharging,
  type CarPassengers,
  type ElectricityType
} from '../common/types'
import { getBaselineIntensity, getParameter } from '../data/database'
import { estimateCarDrivingIntensityFactor } from './factor-calculation'

interface PrivateCarDrivingIntensityParam {
  carType: CarType
  carPassengers: CarPassengers
  carCharging?: CarCharging
  electricityType?: ElectricityType
}
interface PrivateCarDrivingAmountParam {
  mileage: number
}

/**
 * 自家用車の運転時のフットプリントを計算
 * @param mileage 自家用車の運転距離[km]
 * @param carType 自動車の種類
 * @param carPassengers 平均乗車人数
 * @param carCharging 自宅充電の割合
 * @param electricityType 家庭での電力の種類
 * @returns 自家用車の運転時のフットプリント[kgCO2e]
 */
export const estimatePrivateCarDrivingFootprint = ({
  mileage,
  carType,
  carPassengers,
  carCharging = 'unknown',
  electricityType = 'unknown'
}: PrivateCarDrivingAmountParam & PrivateCarDrivingIntensityParam): number =>
  estimatePrivateCarDrivingAmount({ mileage }) *
  estimatePrivateCarDrivingIntensity({
    carType,
    carPassengers,
    carCharging,
    electricityType
  })

/**
 * 自家用車の運転時の活動量を計算
 * @param mileage 自家用車の運転距離[km]
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export const estimatePrivateCarDrivingAmount = ({
  mileage
}: PrivateCarDrivingAmountParam): number => mileage

/**
 * 自家用車の運転時のGHG原単位を計算
 * @param carType 自動車の種類
 * @param carPassengers 平均乗車人数
 * @param carCharging 自宅充電の割合
 * @param electricityType 家庭での電力の種類
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
