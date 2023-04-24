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
var getFactor = function (item) {
    switch (item) {
        case 'other-meat':
            return 'dish-pork-factor';
        case 'fish':
            return 'dish-seafood-factor';
        case 'processed-fish':
            return 'dish-seafood-factor';
        default:
            return 'dish-' + item + '-factor';
    }
};
/**
 * 料理の活動量を計算する
 * @param item 料理の種類
 * @param param 料理の活動量を計算するための引数
 * @returns 料理の活動量[kg]
 */
export var estimateDishAnnualAmount = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, frequency = _a.dishFrequency;
    var baseline = getBaselineAmount('food', item).value;
    var dishFactor = getParameter(getFactor(item), frequency).value;
    return (baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover));
};
var defaultItems = [
    'beef',
    'pork',
    'chicken',
    'other-meat',
    'fish',
    'processed-fish'
];
var getDishItems = function (items, beefDishFrequency, porkDishFrequency, chickenDishFrequency, seafoodDishFrequency) {
    var dishItems = [];
    if (items.find(function (item) { return item === 'beef'; }) !== undefined) {
        dishItems.push({ item: 'beef', frequency: beefDishFrequency });
    }
    if (items.find(function (item) { return item === 'pork'; }) !== undefined) {
        dishItems.push({ item: 'pork', frequency: porkDishFrequency });
    }
    if (items.find(function (item) { return item === 'chicken'; }) !== undefined) {
        dishItems.push({ item: 'chicken', frequency: chickenDishFrequency });
    }
    if (items.find(function (item) { return item === 'other-meat'; }) !== undefined) {
        dishItems.push({ item: 'other-meat', frequency: porkDishFrequency });
    }
    if (items.find(function (item) { return item === 'fish'; }) !== undefined) {
        dishItems.push({ item: 'fish', frequency: seafoodDishFrequency });
    }
    if (items.find(function (item) { return item === 'processed-fish'; }) !== undefined) {
        dishItems.push({ item: 'processed-fish', frequency: seafoodDishFrequency });
    }
    return dishItems;
};
/**
 * 料理の活動量を計算する
 * @param param 料理の活動量を計算するための引数
 * @param items 料理の種類
 * @returns 料理の活動量のMap
 */
export var estimateDishAnnualAmounts = function (_a, items) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, beefDishFrequency = _a.beefDishFrequency, porkDishFrequency = _a.porkDishFrequency, chickenDishFrequency = _a.chickenDishFrequency, seafoodDishFrequency = _a.seafoodDishFrequency;
    if (items === undefined) {
        items = defaultItems;
    }
    var dishItems = getDishItems(items, beefDishFrequency, porkDishFrequency, chickenDishFrequency, seafoodDishFrequency);
    return dishItems.reduce(function (acc, pair) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[pair.item] = estimateDishAnnualAmount(pair.item, {
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            dishFrequency: pair.frequency
        }), _a)));
    }, {});
};
/**
 * 料理のGHG原単位を計算する
 * @param items 料理の種類
 * @returns  料理のGHG原単位のMap
 */
export var estimateDishIntensities = function (items) {
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateDishIntensity(item), _a)));
    }, {});
};
/**
 * 料理の活動量のベースライン値を取得する
 * @returns 料理の活動量のベースライン値のMap
 */
export var getDishAnnualBaselineAmounts = function () {
    return defaultItems.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = getBaselineAmount('food', item).value, _a)));
    }, {});
};
/**
 * 料理のGHG原単位を計算する
 * @param item 料理の種類
 * @returns 料理のGHG原単位[kgCO2e/kg]
 */
export var estimateDishIntensity = function (item) {
    return getBaselineIntensity('food', item).value;
};
