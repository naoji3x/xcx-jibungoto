import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * 自宅のガスの年間の活動量を計算
 * @param item 自宅のガスの種類
 * @param param 自宅のガスの活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export var estimateGasAnnualAmount = function (item, _a) {
    var monthlyConsumption = _a.monthlyConsumption, month = _a.month, residentCount = _a.residentCount;
    var gasSeason = getParameter('gas-season-factor', month).value;
    var gasFactor = getParameter('energy-heat-intensity', item).value;
    var ratio = (gasSeason * gasFactor) / residentCount;
    return monthlyConsumption * ratio;
};
/**
 * 自宅のガスのGHG原単位を計算
 * @param item 自宅のガスの種類
 * @returns GHG原単位[kgCO2e/kWh]
 */
export var estimateGasIntensity = function (item) {
    return getBaselineIntensity('housing', item).value;
};
