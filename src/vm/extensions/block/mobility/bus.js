import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * バスでの移動時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateBusAnnualAmount = function (param) {
    return 'residentialAreaSize' in param
        ? estimateAnnualAmountByArea('bus', param.residentialAreaSize)
        : estimateAnnualAmountAddingWeeklyTravel(param.weeklyTravelingTime, 'bus-speed', param.annualTravelingTime, 'express-bus-speed');
};
/**
 * バスでの移動時のGHG原単位を計算
 * @returns バスでの移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateBusIntensity = function () {
    return getBaselineIntensity('mobility', 'bus').value;
};
