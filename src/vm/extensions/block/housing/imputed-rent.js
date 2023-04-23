import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
export var estimateImputedRentAnnualFootprint = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    return estimateImputedRentAnnualAmount({ residentCount: residentCount, housingSize: housingSize }) *
        estimateImputedRentIntensity();
};
export var estimateImputedRentAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var housingSizeValue = getParameter('housing-size', housingSize).value;
    var housingSizePerResident = housingSize === 'unknown'
        ? housingSizeValue
        : housingSizeValue / residentCount;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    return (housingSizePerResident * imputedRent) / (imputedRent + rent);
};
export var estimateImputedRentIntensity = function () {
    return getBaselineIntensity('housing', 'imputed-rent').value;
};
