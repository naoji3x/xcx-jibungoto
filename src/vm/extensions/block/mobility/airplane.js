import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * 飛行機での移動時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateAirplaneAnnualAmount = function (param) {
    return 'residentialAreaSize' in param
        ? estimateAnnualAmountByArea('airplane', param.residentialAreaSize)
        : estimateAnnualAmount(param.annualTravelingTime, 'airplane-speed');
};
/**
 * 飛行機での移動時のGHG原単位を計算
 * @returns 移動時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateAirplaneIntensity = function () {
    return getBaselineIntensity('mobility', 'airplane').value;
};
