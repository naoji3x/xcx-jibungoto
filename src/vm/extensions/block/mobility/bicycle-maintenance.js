import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 自転車の維持のフットプリントを計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自転車の維持のフットプリント[kgCO2e]
 */
export var estimateBicycleMaintenanceAnnualFootprint = function (_a) {
    var residentialAreaSize = _a.residentialAreaSize;
    return estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: residentialAreaSize
    }) * estimateBicycleMaintenanceIntensity();
};
/**
 * 自転車の維持の活動量を計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 維持費[千円]
 */
export var estimateBicycleMaintenanceAnnualAmount = function (_a) {
    var _b = _a === void 0 ? {} : _a, residentialAreaSize = _b.residentialAreaSize;
    return residentialAreaSize === undefined
        ? getBaselineAmount('mobility', 'bicycle-maintenance').value
        : estimateAnnualAmountByArea('bicycle-maintenance', residentialAreaSize);
};
/**
 * 自転車の維持のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/千円]
 */
export var estimateBicycleMaintenanceIntensity = function () {
    return getBaselineIntensity('mobility', 'bicycle-maintenance').value;
};
