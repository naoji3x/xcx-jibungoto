import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateOtherAppliancesAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateOtherAppliancesAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateOtherAppliancesIntensity();
};
export var estimateOtherAppliancesAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('other-appliances', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateOtherAppliancesIntensity = function () {
    return getBaselineIntensity('other', 'other-appliances').value;
};
