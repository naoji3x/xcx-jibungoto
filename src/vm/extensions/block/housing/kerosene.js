import { getBaselineIntensity, getParameter } from '../data/database';
export var estimateKeroseneAnnualFootprint = function (_a) {
    var monthlyConsumption = _a.monthlyConsumption, monthCount = _a.monthCount, residentCount = _a.residentCount;
    return estimateKeroseneAnnualAmount({
        monthlyConsumption: monthlyConsumption,
        monthCount: monthCount,
        residentCount: residentCount
    }) * estimateKeroseneIntensity();
};
export var estimateKeroseneAnnualAmount = function (_a) {
    var monthlyConsumption = _a.monthlyConsumption, monthCount = _a.monthCount, residentCount = _a.residentCount;
    var keroseneFactor = getParameter('energy-heat-intensity', 'kerosene').value;
    return (monthlyConsumption * monthCount * keroseneFactor) / residentCount;
};
export var estimateKeroseneIntensity = function () {
    return getBaselineIntensity('housing', 'kerosene').value;
};
