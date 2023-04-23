import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
export var estimateTravelAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateTravelAnnualAmount({ item: item, expenses: expenses }) *
        estimateTravelIntensity({ item: item });
};
export var estimateTravelAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateAnnualAmount(item, 'travel-factor', expenses);
};
export var estimateTravelIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
