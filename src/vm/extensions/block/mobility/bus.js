import { getBaselineIntensity, getBaselineAmount } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './annual-amount';
/**
 * バスの移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export var estimateBusAnnualFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    return estimateBusAnnualAmount({
        weeklyTravelingTime: weeklyTravelingTime,
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) * estimateBusIntensity();
};
/**
 * バスでの移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateBusAnnualAmount = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        return estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'bus-speed', annualTravelingTime, 'express-bus-speed');
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('bus', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'bus').value;
    }
};
/**
 * バスでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateBusIntensity = function () {
    return getBaselineIntensity('mobility', 'bus').value;
};
