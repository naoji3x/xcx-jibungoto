import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateCookingAppliancesAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateCookingAppliancesAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateCookingAppliancesIntensity();
};
export var estimateCookingAppliancesAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('cooking-appliances', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateCookingAppliancesIntensity = function () {
    return getBaselineIntensity('other', 'cooking-appliances').value;
};
