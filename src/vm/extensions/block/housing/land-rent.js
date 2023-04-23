import { getBaselineAmount, getBaselineIntensity } from '../data/database';
export var estimateLandRentAnnualFootprint = function () {
    return estimateLandRentAnnualAmount() * estimateLandRentIntensity();
};
export var estimateLandRentAnnualAmount = function () {
    return getBaselineAmount('housing', 'land-rent').value;
};
export var estimateLandRentIntensity = function () {
    return getBaselineIntensity('housing', 'land-rent').value;
};
