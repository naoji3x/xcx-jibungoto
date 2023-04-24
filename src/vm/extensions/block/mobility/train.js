import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 電車での移動時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateTrainAnnualAmount = function (param) {
    return 'residentialAreaSize' in param
        ? estimateAnnualAmountByArea('train', param.residentialAreaSize)
        : estimateAnnualAmountAddingWeeklyTravel(param.weeklyTravelingTime, 'train-speed', param.annualTravelingTime, 'long-distance-train-speed');
};
/**
 * 電車での移動時のGHG原単位を計算
 * @returns 電車での移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateTrainIntensity = function () {
    return getBaselineIntensity('mobility', 'train').value;
};
