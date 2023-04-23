import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 自転車の使用時のフットプリントを計算
 * @param param フットプリントを計算するための引数
 * @returns 自転車の使用時のフットプリント[kgCO2e]
 */
export var estimateBicycleDrivingAnnualFootprint = function (_a) {
    var _b = _a === void 0 ? {} : _a, residentialAreaSize = _b.residentialAreaSize;
    return estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: residentialAreaSize
    }) * estimateBicycleDrivingIntensity();
};
/**
 * 自転車の使用時の活動量を計算
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateBicycleDrivingAnnualAmount = function (_a) {
    var _b = _a === void 0 ? {} : _a, residentialAreaSize = _b.residentialAreaSize;
    return residentialAreaSize === undefined
        ? getBaselineAmount('mobility', 'bicycle-driving').value
        : estimateAnnualAmountByArea('bicycle-driving', residentialAreaSize);
};
/**
 * 自転車の使用時のGHG原単位を計算
 * @returns 自転車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateBicycleDrivingIntensity = function () {
    return getBaselineIntensity('mobility', 'bicycle-driving').value;
};
