import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateCommunicationAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateCommunicationAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateCommunicationIntensity();
};
export var estimateCommunicationAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('communication', 'communication-amount', expenses, residentCount);
};
export var estimateCommunicationIntensity = function () {
    return getBaselineIntensity('other', 'communication').value;
};
