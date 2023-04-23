import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateDailyGoodsAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateDailyGoodsAnnualAmount({ item: item, expenses: expenses, residentCount: residentCount }) *
        estimateDailyGoodsIntensity({ item: item });
};
export var estimateDailyGoodsAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'daily-goods-amount', expenses, residentCount);
};
export var estimateDailyGoodsIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
