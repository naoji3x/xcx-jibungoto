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
/**
 * 廃棄の活動量を計算する
 * @remarks
 * wasteは以下のitemのestimation合計/baseline合計とwasteのbaseline値を掛け合わせて求める。
 * - appliance-furniture-amount
 *   - cooking-appliances
 *   - heating-cooling-appliances
 *   - other-appliances
 *   - electronics
 *   - furniture
 *   - covering
 * - clothes-beauty-factor
 *   - clothes-goods
 * - bags-jewelries-goods
 *   - cosmetics
 * - hobby-goods-factor
 *   - culture-goods
 *   - entertainment-goods
 *   - sports-goods
 *   - gardening-flower
 *   - pet
 *   - tobacco
  'books-magazines'
'service-factor'
  'medicine'
'daily-goods-amount'
  'sanitation'
  'kitchen-goods'
  'paper-stationery'
 * @param param 廃棄の活動量を計算するための引数
 * @returns 廃棄の活動量[000JPY]
 */
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
            estimateApplianceFurnitureAnnualAmount(item, {
                expenses: applianceFurnitureExpenses,
                residentCount: residentCount
            });
    }, 0);
    var clothesBeautySum = clothesBeautyItems.reduce(function (sum, item) {
        return sum +
            estimateClothesBeautyAnnualAmount(item, {
                expenses: clothesBeautyExpenses
            });
    }, 0);
    var hobbyGoodsSum = hobbyGoodsItems.reduce(function (sum, item) {
        return sum +
            estimateHobbyGoodsAnnualAmount(item, {
                expenses: hobbyGoodsExpenses
            });
    }, 0);
    var serviceSum = serviceItems.reduce(function (sum, item) {
        return sum +
            estimateServiceAnnualAmount(item, {
                expenses: serviceExpenses
            });
    }, 0);
    var dailyGoodsSum = dailyGoodsItems.reduce(function (sum, item) {
        return sum +
            estimateDailyGoodsAnnualAmount(item, {
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
/**
 * 廃棄のGHG原単位を計算する
 * @returns 廃棄のGHG原単位[kgCO2e/000JPY]
 */
export var estimateWasteIntensity = function () {
    return getBaselineIntensity('other', 'waste').value;
};
