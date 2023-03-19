import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateCoveringAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateCoveringAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateCoveringIntensity();
};
export var estimateCoveringAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('covering', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateCoveringIntensity = function () {
    return getBaselineIntensity('other', 'covering').value;
};
