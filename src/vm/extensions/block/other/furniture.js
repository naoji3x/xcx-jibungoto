import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateFurnitureAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateFurnitureAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateFurnitureIntensity();
};
export var estimateFurnitureAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('furniture', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateFurnitureIntensity = function () {
    return getBaselineIntensity('other', 'furniture').value;
};
