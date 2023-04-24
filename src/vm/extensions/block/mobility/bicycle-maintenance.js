import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 自転車の維持の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 維持費[000JPY]
 */
export var estimateBicycleMaintenanceAnnualAmount = function (_a) {
    var residentialAreaSize = _a.residentialAreaSize;
    return estimateAnnualAmountByArea('bicycle-maintenance', residentialAreaSize);
};
/**
 * 自転車の維持のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/000JPY]
 */
export var estimateBicycleMaintenanceIntensity = function () {
    return getBaselineIntensity('mobility', 'bicycle-maintenance').value;
};
