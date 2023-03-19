import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateKitchenGoodsAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateKitchenGoodsAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateKitchenGoodsIntensity();
};
export var estimateKitchenGoodsAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('kitchen-goods', 'daily-goods-amount', expenses, residentCount);
};
export var estimateKitchenGoodsIntensity = function () {
    return getBaselineIntensity('other', 'kitchen-goods').value;
};
