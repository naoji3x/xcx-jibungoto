import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
export var estimateHobbyGoodsAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateHobbyGoodsAnnualAmount({ item: item, expenses: expenses }) *
        estimateHobbyGoodsIntensity({ item: item });
};
export var estimateHobbyGoodsAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateAnnualAmount(item, 'hobby-goods-factor', expenses);
};
export var estimateHobbyGoodsIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
