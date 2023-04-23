import { getBaselineAmount, getBaselineIntensity } from '../data/database';
export var estimateOtherEnergyAnnualFootprint = function () {
    return estimateOtherEnergyAnnualAmount() * estimateOtherEnergyIntensity();
};
export var estimateOtherEnergyAnnualAmount = function () {
    return getBaselineAmount('housing', 'other-energy').value;
};
export var estimateOtherEnergyIntensity = function () {
    return getBaselineIntensity('housing', 'other-energy').value;
};
