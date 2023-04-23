import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import {
  estimateAnnualAmountAddingWeeklyTravel,
  estimateAnnualAmountByArea
} from './amount-calculation'
import { type ResidentialAreaSizeParam, type TravelingTimeParam } from './param'

/** 移動量を計算するための引数 */
export type MotorbikeMaintenanceAmountParam =
  | TravelingTimeParam
  | ResidentialAreaSizeParam

/**
 * バイクの維持の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の維持費[000JPY]
 */
export const estimateMotorbikeMaintenanceAnnualAmount = (
  param: MotorbikeMaintenanceAmountParam
): number => {
  if ('residentialAreaSize' in param) {
    return estimateAnnualAmountByArea(
      'motorbike-maintenance',
      param.residentialAreaSize
    )
  } else {
    const drivingAmount = estimateAnnualAmountAddingWeeklyTravel(
      param.weeklyTravelingTime,
      'motorbike-speed',
      param.annualTravelingTime,
      'long-distance-motorbike-speed'
    )
    const drivingBaseline = getBaselineAmount(
      'mobility',
      'motorbike-driving'
    ).value
    const MaintenanceBaseline = getBaselineAmount(
      'mobility',
      'motorbike-maintenance'
    ).value
    // バイクの購入は移動実績と移動ベースラインとの比率で変更
    return (MaintenanceBaseline * drivingAmount) / drivingBaseline
  }
}

/**
 * バイクの維持のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/000JPY]
 */
export const estimateMotorbikeMaintenanceIntensity = (): number =>
  getBaselineIntensity('mobility', 'motorbike-maintenance').value
