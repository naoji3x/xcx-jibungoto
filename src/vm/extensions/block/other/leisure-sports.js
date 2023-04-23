import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
export var estimateLeisureSportsAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateLeisureSportsAnnualAmount({ item: item, expenses: expenses }) *
        estimateLeisureSportsIntensity({ item: item });
};
export var estimateLeisureSportsAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateAnnualAmount(item, 'leisure-sports-factor', expenses);
};
export var estimateLeisureSportsIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
