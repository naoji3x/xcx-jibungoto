import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateSanitationAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateSanitationAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateSanitationIntensity();
};
export var estimateSanitationAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('sanitation', 'daily-goods-amount', expenses, residentCount);
};
export var estimateSanitationIntensity = function () {
    return getBaselineIntensity('other', 'sanitation').value;
};
