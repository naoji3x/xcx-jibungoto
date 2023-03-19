import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateBroadcastingAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateBroadcastingAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateBroadcastingIntensity();
};
export var estimateBroadcastingAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('broadcasting', 'communication-amount', expenses, residentCount);
};
export var estimateBroadcastingIntensity = function () {
    return getBaselineIntensity('other', 'broadcasting').value;
};
