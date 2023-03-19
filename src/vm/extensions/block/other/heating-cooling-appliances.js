import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateHeatingCoolingAppliancesAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateHeatingCoolingAppliancesAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateHeatingCoolingAppliancesIntensity();
};
export var estimateHeatingCoolingAppliancesAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('heating-cooling-appliances', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateHeatingCoolingAppliancesIntensity = function () {
    return getBaselineIntensity('other', 'heating-cooling-appliances').value;
};
