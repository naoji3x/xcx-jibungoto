import { getBaselineIntensity, getBaselineAmount } from '../data/database';
import { estimateAnnualAmount, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 飛行機の移動のフットプリントを計算
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export var estimateFerryAnnualFootprint = function (_a) {
    var annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    return estimateFerryAnnualAmount({
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) * estimateFerryIntensity();
};
/**
 * 飛行機での移動時の年間の活動量を計算
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateFerryAnnualAmount = function (_a) {
    var annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (annualTravelingTime !== undefined) {
        return estimateAnnualAmount(annualTravelingTime, 'ferry-speed');
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('ferry', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'ferry').value;
    }
};
/**
 * 飛行機での移動時のGHG原単位を計算
 * @returns 移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateFerryIntensity = function () {
    return getBaselineIntensity('mobility', 'ferry').value;
};
