import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateFoodLossRate } from './rate-calculation';
/**
 * アルコールの活動量を計算する
 * @param param アルコールの活動量を計算するための引数
 * @returns アルコールの活動量[kg]
 */
export var estimateAlcoholAnnualAmount = function (_a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    var baseline = getBaselineAmount('food', 'alcohol').value;
    var factor = getParameter('alcohol-factor', frequency).value;
    return baseline * factor * estimateFoodLossRate(foodDirectWaste, foodLeftover);
};
/**
 * アルコールのGHG原単位を計算する
 * @returns アルコールのGHG原単位[kgCO2e/kg]
 */
export var estimateAlcoholIntensity = function () {
    return getBaselineIntensity('food', 'alcohol').value;
};
