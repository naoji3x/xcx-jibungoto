import { getBaselineAmount, getBaselineIntensity } from '../data/database';
export var estimateWaterAnnualFootprint = function () {
    return estimateWaterAnnualAmount() * estimateWaterIntensity();
};
export var estimateWaterAnnualAmount = function () {
    return getBaselineAmount('housing', 'water').value;
};
export var estimateWaterIntensity = function () {
    return getBaselineIntensity('housing', 'water').value;
};
