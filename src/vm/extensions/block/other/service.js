import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
export var estimateServiceAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateServiceAnnualAmount({ item: item, expenses: expenses }) *
        estimateServiceIntensity({ item: item });
};
export var estimateServiceAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateAnnualAmount(item, 'service-factor', expenses);
};
export var estimateServiceIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
