import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * 灯油の年間の活動量を計算
 * @param param 灯油の活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export var estimateKeroseneAnnualAmount = function (_a) {
    var monthlyConsumption = _a.monthlyConsumption, monthCount = _a.monthCount, residentCount = _a.residentCount;
    var keroseneFactor = getParameter('energy-heat-intensity', 'kerosene').value;
    return (monthlyConsumption * monthCount * keroseneFactor) / residentCount;
};
/**
 * 灯油のGHG原単位を計算
 * @returns GHG原単位[kgCO2e/kWh]
 */
export var estimateKeroseneIntensity = function () {
    return getBaselineIntensity('housing', 'kerosene').value;
};
