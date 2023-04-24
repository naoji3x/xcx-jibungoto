import { getBaselineAmount, getBaselineIntensity } from '../data/database';
/**
 * 自家用車の維持の活動量を計算
 * @param param 自家用車の維持の活動量を計算するための引数
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
