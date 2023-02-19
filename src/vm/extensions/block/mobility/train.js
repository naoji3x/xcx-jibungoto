import { getBaselineIntensity, getBaselineAmount } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './annual-amount';
/**
 * 電車の移動のフットプリントを計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param mileageByAreaFirstKey 住んでいる地域の規模
 * @returns 移動の年間のフットプリント[kgCO2e]
 */
export var estimateTrainFootprint = function (weeklyTravelingTime, annualTravelingTime, mileageByAreaFirstKey) {
    if (weeklyTravelingTime === void 0) { weeklyTravelingTime = undefined; }
    if (annualTravelingTime === void 0) { annualTravelingTime = undefined; }
    if (mileageByAreaFirstKey === void 0) { mileageByAreaFirstKey = undefined; }
    return estimateTrainAnnualAmount(weeklyTravelingTime, annualTravelingTime, mileageByAreaFirstKey) * estimateTrainIntensity();
};
/**
 * 電車での移動時の年間の活動量を計算
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param mileageByAreaFirstKey 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateTrainAnnualAmount = function (weeklyTravelingTime, annualTravelingTime, mileageByAreaFirstKey) {
    if (weeklyTravelingTime === void 0) { weeklyTravelingTime = undefined; }
    if (annualTravelingTime === void 0) { annualTravelingTime = undefined; }
    if (mileageByAreaFirstKey === void 0) { mileageByAreaFirstKey = undefined; }
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        return estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'train-speed', annualTravelingTime, 'long-distance-train-speed');
    }
    else if (mileageByAreaFirstKey !== undefined) {
        return estimateAnnualAmountByArea('train', mileageByAreaFirstKey);
    }
    else {
        return getBaselineAmount('mobility', 'train').value;
    }
};
/**
 * 電車での移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateTrainIntensity = function () {
    return getBaselineIntensity('mobility', 'train').value;
};
