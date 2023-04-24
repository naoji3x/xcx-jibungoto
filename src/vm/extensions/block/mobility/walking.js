import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 徒歩移動の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateWalkingAnnualAmount = function (_a) {
    var residentialAreaSize = _a.residentialAreaSize;
    return estimateAnnualAmountByArea('walking', residentialAreaSize);
};
/**
 * 徒歩移動のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateWalkingIntensity = function () {
    return getBaselineIntensity('mobility', 'walking').value;
};
