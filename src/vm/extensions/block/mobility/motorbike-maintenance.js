import { getBaselineIntensity, getBaselineAmount } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * バイクの移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export var estimateMotorbikeMaintenanceAnnualFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    return estimateMotorbikeMaintenanceAnnualAmount({
        weeklyTravelingTime: weeklyTravelingTime,
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) * estimateMotorbikeMaintenanceIntensity();
};
/**
 * バイクでの移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateMotorbikeMaintenanceAnnualAmount = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        var drivingAmount = estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'motorbike-speed', annualTravelingTime, 'long-distance-motorbike-speed');
        var drivingBaseline = getBaselineAmount('mobility', 'motorbike-driving').value;
        var MaintenanceBaseline = getBaselineAmount('mobility', 'motorbike-maintenance').value;
        // バイクの購入は移動実績と移動ベースラインとの比率で変更
        return (MaintenanceBaseline * drivingAmount) / drivingBaseline;
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('motorbike-maintenance', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'motorbike-maintenance').value;
    }
};
/**
 * バイクでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateMotorbikeMaintenanceIntensity = function () {
    return getBaselineIntensity('mobility', 'motorbike-maintenance').value;
};
