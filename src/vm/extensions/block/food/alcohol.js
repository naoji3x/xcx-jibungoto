import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateFoodLossRate } from './rate-calculation';
export var estimateAlcoholAnnualFootprint = function (_a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    return estimateAlcoholAnnualAmount({
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: frequency
    }) * estimateAlcoholIntensity();
};
export var estimateAlcoholAnnualAmount = function (_a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    var baseline = getBaselineAmount('food', 'alcohol').value;
    var factor = getParameter('alcohol-factor', frequency).value;
    return baseline * factor * estimateFoodLossRate(foodDirectWaste, foodLeftover);
};
export var estimateAlcoholIntensity = function () {
    return getBaselineIntensity('food', 'alcohol').value;
};
