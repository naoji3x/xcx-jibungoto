import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateCommunicationAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateCommunicationAnnualAmount({ item: item, expenses: expenses, residentCount: residentCount }) *
        estimateCommunicationIntensity({ item: item });
};
export var estimateCommunicationAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'communication-amount', expenses, residentCount);
};
export var estimateCommunicationIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
