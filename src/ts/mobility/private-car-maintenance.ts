import { getBaselineAmount, getBaselineIntensity } from '../data/database'

interface PrivateCarMaintenanceAmountParam {
  annualMileage: number
}

/**
 * 自家用車の維持のフットプリントを計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param carType 自動車の種類
 * @returns 自家用車の維持のフットプリント[kgCO2e]
 */
export const estimatePrivateCarMaintenanceFootprint = ({
  annualMileage
}: PrivateCarMaintenanceAmountParam): number =>
  estimatePrivateCarMaintenanceAmount({ annualMileage }) *
  estimatePrivateCarMaintenanceIntensity()

/**
 * 自家用車の維持の活動量を計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param residentialAreaSize 住んでいる地域の規模
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
