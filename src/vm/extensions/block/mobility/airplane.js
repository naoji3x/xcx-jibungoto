import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 飛行機の移動のフットプリントを計算
 * @param param 活動量を計算するための引数
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export var estimateAirplaneAnnualFootprint = function (_a) {
    var _b = _a === void 0 ? {} : _a, annualTravelingTime = _b.annualTravelingTime, residentialAreaSize = _b.residentialAreaSize;
    return estimateAirplaneAnnualAmount({
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) * estimateAirplaneIntensity();
};
/**
 * 飛行機での移動時の年間の活動量を計算
 * @param param 活動量を計算するための引数
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateAirplaneAnnualAmount = function (_a) {
    var annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (annualTravelingTime !== undefined) {
        return estimateAnnualAmount(annualTravelingTime, 'airplane-speed');
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('airplane', residentialAreaSize);
    }
    return getBaselineAmount('mobility', 'airplane').value;
};
/**
 * 飛行機での移動時のGHG原単位を計算
 * @returns 移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateAirplaneIntensity = function () {
    return getBaselineIntensity('mobility', 'airplane').value;
};
