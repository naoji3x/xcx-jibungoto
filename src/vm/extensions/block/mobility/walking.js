import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 自転車の維持のフットプリントを計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自転車の維持のフットプリント[kgCO2e]
 */
export var estimateWalkingAnnualFootprint = function (_a) {
    var residentialAreaSize = _a.residentialAreaSize;
    return estimateWalkingAnnualAmount({
        residentialAreaSize: residentialAreaSize
    }) * estimateWalkingIntensity();
};
/**
 * 自転車の維持の活動量を計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 維持費[千円]
 */
export var estimateWalkingAnnualAmount = function (_a) {
    var residentialAreaSize = _a.residentialAreaSize;
    return residentialAreaSize === undefined
        ? getBaselineAmount('mobility', 'walking').value
        : estimateAnnualAmountByArea('walking', residentialAreaSize);
};
/**
 * 自転車の維持のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/千円]
 */
export var estimateWalkingIntensity = function () {
    return getBaselineIntensity('mobility', 'walking').value;
};
