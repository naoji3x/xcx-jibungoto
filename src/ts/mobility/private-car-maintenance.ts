import { getBaselineAmount, getBaselineIntensity } from '../data/database'

/** 自家用車の維持の活動量を計算するための引数 */
interface PrivateCarMaintenanceAmountParam {
  /** 自家用車の年間運転距離[km] */
  annualMileage: number
}

/**
 * 自家用車の維持の活動量を計算
 * @param param 自家用車の維持の活動量を計算するための引数
 * @returns 自家用車の維持の活動量[000JPY]
 */
export const estimatePrivateCarMaintenanceAmount = ({
  annualMileage
}: PrivateCarMaintenanceAmountParam): number => {
  const MaintenanceBaseline = getBaselineAmount(
    'mobility',
    'private-car-maintenance'
  ).value
  const drivingBaseline = getBaselineAmount(
    'mobility',
    'private-car-driving'
  ).value
  return (MaintenanceBaseline * annualMileage) / drivingBaseline
}

/**
 * 自家用車の維持のGHG原単位を計算
 * @returns 自家用車の維持のGHG原単位[kgCO2e/000JPY]
 */
export const estimatePrivateCarMaintenanceIntensity = (): number =>
  getBaselineIntensity('mobility', 'private-car-maintenance').value
