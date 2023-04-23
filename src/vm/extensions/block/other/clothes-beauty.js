import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
export var estimateClothesBeautyAnnualFootprint = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateClothesBeautyAnnualAmount({ item: item, expenses: expenses }) *
        estimateClothesBeautyIntensity({ item: item });
};
export var estimateClothesBeautyAnnualAmount = function (_a) {
    var item = _a.item, expenses = _a.expenses;
    return estimateAnnualAmount(item, 'clothes-beauty-factor', expenses);
};
export var estimateClothesBeautyIntensity = function (_a) {
    var item = _a.item;
    return getBaselineIntensity('other', item).value;
};
