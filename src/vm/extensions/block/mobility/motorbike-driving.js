import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * バイクでの移動時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateMotorbikeDrivingAnnualAmount = function (param) {
    return 'residentialAreaSize' in param
        ? estimateAnnualAmountByArea('motorbike-driving', param.residentialAreaSize)
        : estimateAnnualAmountAddingWeeklyTravel(param.weeklyTravelingTime, 'motorbike-speed', param.annualTravelingTime, 'long-distance-motorbike-speed');
};
/**
 * バイクでの移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateMotorbikeDrivingIntensity = function () {
    return getBaselineIntensity('mobility', 'motorbike-driving').value;
};
