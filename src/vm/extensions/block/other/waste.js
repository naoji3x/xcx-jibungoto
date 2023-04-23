var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateApplianceFurnitureAnnualAmount } from './appliance-furniture';
import { estimateClothesBeautyAnnualAmount } from './clothes-beauty';
import { estimateDailyGoodsAnnualAmount } from './daily-goods';
import { estimateHobbyGoodsAnnualAmount } from './hobby-goods';
import { estimateServiceAnnualAmount } from './service';
export var estimateWasteAnnualFootprint = function (_a) {
    var applianceFurnitureExpenses = _a.applianceFurnitureExpenses, clothesBeautyExpenses = _a.clothesBeautyExpenses, hobbyGoodsExpenses = _a.hobbyGoodsExpenses, serviceExpenses = _a.serviceExpenses, dailyGoodsExpenses = _a.dailyGoodsExpenses, residentCount = _a.residentCount;
    return estimateWasteAnnualAmount({
        applianceFurnitureExpenses: applianceFurnitureExpenses,
        clothesBeautyExpenses: clothesBeautyExpenses,
        hobbyGoodsExpenses: hobbyGoodsExpenses,
        serviceExpenses: serviceExpenses,
        dailyGoodsExpenses: dailyGoodsExpenses,
        residentCount: residentCount
    }) * estimateWasteIntensity();
};
export var estimateWasteAnnualAmount = function (_a) {
    var applianceFurnitureExpenses = _a.applianceFurnitureExpenses, clothesBeautyExpenses = _a.clothesBeautyExpenses, hobbyGoodsExpenses = _a.hobbyGoodsExpenses, serviceExpenses = _a.serviceExpenses, dailyGoodsExpenses = _a.dailyGoodsExpenses, residentCount = _a.residentCount;
    var applianceFurnitureItems = [
        'cooking-appliances',
        'heating-cooling-appliances',
        'other-appliances',
        'electronics',
        'furniture',
        'covering'
    ];
    var clothesBeautyItems = [
        'clothes-goods',
        'bags-jewelries-goods',
        'cosmetics'
    ];
    var hobbyGoodsItems = [
        'culture-goods',
        'entertainment-goods',
        'sports-goods',
        'gardening-flower',
        'pet',
        'tobacco',
        'books-magazines'
    ];
    var serviceItems = ['medicine'];
    var dailyGoodsItems = [
        'sanitation',
        'kitchen-goods',
        'paper-stationery'
    ];
    var allItems = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], applianceFurnitureItems, true), clothesBeautyItems, true), hobbyGoodsItems, true), serviceItems, true), dailyGoodsItems, true);
    // 分子の計算
    var applianceFurnitureSum = applianceFurnitureItems.reduce(function (sum, item) {
        return sum +
            estimateApplianceFurnitureAnnualAmount({
                item: item,
                expenses: applianceFurnitureExpenses,
                residentCount: residentCount
            });
    }, 0);
    var clothesBeautySum = clothesBeautyItems.reduce(function (sum, item) {
        return sum +
            estimateClothesBeautyAnnualAmount({
                item: item,
                expenses: clothesBeautyExpenses
            });
    }, 0);
    var hobbyGoodsSum = hobbyGoodsItems.reduce(function (sum, item) {
        return sum +
            estimateHobbyGoodsAnnualAmount({
                item: item,
                expenses: hobbyGoodsExpenses
            });
    }, 0);
    var serviceSum = serviceItems.reduce(function (sum, item) {
        return sum +
            estimateServiceAnnualAmount({
                item: item,
                expenses: serviceExpenses
            });
    }, 0);
    var dailyGoodsSum = dailyGoodsItems.reduce(function (sum, item) {
        return sum +
            estimateDailyGoodsAnnualAmount({
                item: item,
                expenses: dailyGoodsExpenses,
                residentCount: residentCount
            });
    }, 0);
    var numerator = applianceFurnitureSum +
        clothesBeautySum +
        hobbyGoodsSum +
        serviceSum +
        dailyGoodsSum;
    // 分母の計算
    var denominator = allItems.reduce(function (sum, item) { return sum + getBaselineAmount('other', item).value; }, 0);
    return (getBaselineAmount('other', 'waste').value * numerator) / denominator;
};
export var estimateWasteIntensity = function () {
    return getBaselineIntensity('other', 'waste').value;
};
