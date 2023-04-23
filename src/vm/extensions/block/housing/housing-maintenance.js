import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateImputedRentAnnualAmount } from './imputed-rent';
import { estimateRentAnnualAmount } from './rent';
export var estimateHousingMaintenanceAnnualFootprint = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    return estimateHousingMaintenanceAnnualAmount({ residentCount: residentCount, housingSize: housingSize }) *
        estimateHousingMaintenanceIntensity();
};
export var estimateHousingMaintenanceAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var baseline = getBaselineAmount('housing', 'housing-maintenance').value;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    var imputedRentEstimation = estimateImputedRentAnnualAmount({
        residentCount: residentCount,
        housingSize: housingSize
    });
    var rentEstimation = estimateRentAnnualAmount({
        residentCount: residentCount,
        housingSize: housingSize
    });
    var rate = (imputedRentEstimation + rentEstimation) / (imputedRent + rent);
    return baseline * rate;
};
export var estimateHousingMaintenanceIntensity = function () {
    return getBaselineIntensity('housing', 'housing-maintenance').value;
};
