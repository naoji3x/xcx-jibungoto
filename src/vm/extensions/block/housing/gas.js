import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * 自宅のガスの年間のカーボンフットプリントを計算
 * @param param0 計算に必要なパラメータ
 * @returns カーボンフットプリント[kgCO2e]
 */
export var estimateGasAnnualFootprint = function (item, _a) {
    var monthlyConsumption = _a.monthlyConsumption, month = _a.month, residentCount = _a.residentCount;
    return estimateGasAnnualAmount(item, {
        monthlyConsumption: monthlyConsumption,
        month: month,
        residentCount: residentCount
    }) * estimateGasIntensity(item);
};
/**
 * 自宅のガスの年間の活動量を計算
 * @param param0 計算に必要なパラメータ
 * @returns 活動量[m3]
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
 * @param param0 計算に必要なパラメータ
 * @returns GHG原単位[kgCO2e/m3]
 */
export var estimateGasIntensity = function (item) {
    return getBaselineIntensity('housing', item).value;
};
