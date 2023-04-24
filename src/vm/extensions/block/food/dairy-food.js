var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateFoodLossRate } from './rate-calculation';
/**
 * 乳製品の活動量を計算する
 * @param item 乳製品の種類
 * @param param 乳製品の活動量を計算するための引数
 * @returns 乳製品の活動量[kg]
 */
export var estimateDairyFoodAnnualAmount = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, frequency = _a.dairyFoodFrequency;
    var baseline = getBaselineAmount('food', item).value;
    var foodIntake = getParameter('dairy-food-factor', frequency).value;
    return (baseline * foodIntake * estimateFoodLossRate(foodDirectWaste, foodLeftover));
};
var defaultItems = ['milk', 'other-dairy', 'eggs'];
/**
 * 乳製品の活動量を計算する
 * @param param 乳製品の活動量を計算するための引数
 * @param items 乳製品の種類の配列
 * @returns 乳製品の活動量のMap
 */
export var estimateDairyFoodAnnualAmounts = function (_a, items) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, frequency = _a.dairyFoodFrequency;
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateDairyFoodAnnualAmount(item, {
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            dairyFoodFrequency: frequency
        }), _a)));
    }, {});
};
/**
 * 乳製品のGHG原単位の強度を計算する
 * @param items 乳製品の種類の配列
 * @returns 乳製品のGHG原単位の強度のMap
 */
export var estimateDairyFoodIntensities = function (items) {
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateDairyFoodIntensity(item), _a)));
    }, {});
};
/**
 * 乳製品のGHG原単位を計算する
 * @returns 乳製品のGHG原単位のMap
 */
export var getDairyFoodAnnualBaselineAmounts = function () {
    return defaultItems.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = getBaselineAmount('food', item).value, _a)));
    }, {});
};
/**
 * 乳製品のGHG原単位を計算する
 * @param item 乳製品の種類
 * @returns 乳製品のGHG原単位[kgCO2e/kg]
 */
export var estimateDairyFoodIntensity = function (item) {
    return getBaselineIntensity('food', item).value;
};
