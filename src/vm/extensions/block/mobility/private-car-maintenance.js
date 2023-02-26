import { getBaselineAmount, getBaselineIntensity } from '../data/database';
/**
 * 自家用車の維持のフットプリントを計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param carType 自動車の種類
 * @returns 自家用車の維持のフットプリント[kgCO2e]
 */
export var estimatePrivateCarMaintenanceFootprint = function (_a) {
    var annualMileage = _a.annualMileage;
    return estimatePrivateCarMaintenanceAmount({ annualMileage: annualMileage }) *
        estimatePrivateCarMaintenanceIntensity();
};
/**
 * 自家用車の維持の活動量を計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自家用車の維持の活動量[000JPY]
 */
export var estimatePrivateCarMaintenanceAmount = function (_a) {
    var annualMileage = _a.annualMileage;
    var MaintenanceBaseline = getBaselineAmount('mobility', 'private-car-maintenance').value;
    var drivingBaseline = getBaselineAmount('mobility', 'private-car-driving').value;
    return (MaintenanceBaseline * annualMileage) / drivingBaseline;
};
/**
 * 自家用車の維持のGHG原単位を計算
 * @returns 自家用車の維持のGHG原単位[kgCO2e/000JPY]
 */
export var estimatePrivateCarMaintenanceIntensity = function () {
    return getBaselineIntensity('mobility', 'private-car-maintenance').value;
};
