import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateApplianceFurnitureAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateApplianceFurnitureAnnualAmount({ item: item, expenses: expenses, residentCount: residentCount }) *
        estimateApplianceFurnitureIntensity({ item: item });
};
export var estimateApplianceFurnitureAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateApplianceFurnitureIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
