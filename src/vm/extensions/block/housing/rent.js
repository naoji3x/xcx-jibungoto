import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
export var estimateRentAnnualFootprint = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    return estimateRentAnnualAmount({ residentCount: residentCount, housingSize: housingSize }) *
        estimateRentIntensity();
};
export var estimateRentAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var housingSizeValue = getParameter('housing-size', housingSize).value;
    var housingSizePerResident = housingSize === 'unknown'
        ? housingSizeValue
        : housingSizeValue / residentCount;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    return (housingSizePerResident * rent) / (imputedRent + rent);
};
export var estimateRentIntensity = function () {
    return getBaselineIntensity('housing', 'rent').value;
};
