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
 * 食料摂取量の活動量を計算する
 * @param item 食料の種類
 * @param param 食料摂取量の活動量を計算するための引数
 * @returns 食料摂取量の活動量[kg]
 */
export var estimateFoodIntakeAnnualAmount = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, foodIntake = _a.foodIntake;
    var baseline = getBaselineAmount('food', item).value;
    var intake = getParameter('food-intake-factor', foodIntake).value;
    return baseline * intake * estimateFoodLossRate(foodDirectWaste, foodLeftover);
};
var defaultItems = [
    'rice',
    'bread-flour',
    'noodle',
    'potatoes',
    'vegetables',
    'processed-vegetables',
    'beans',
    'fruits',
    'oil',
    'seasoning'
];
/**
 * 食料摂取量の活動量を計算する
 * @param param 食料摂取量の活動量を計算するための引数
 * @param items 食料の種類の配列
 * @returns 食料摂取量の活動量のMap
 */
export var estimateFoodIntakeAnnualAmounts = function (_a, items) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, foodIntake = _a.foodIntake;
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateFoodIntakeAnnualAmount(item, {
            foodDirectWaste: foodDirectWaste,
            foodLeftover: foodLeftover,
            foodIntake: foodIntake
        }), _a)));
    }, {});
};
/**
 * 食料摂取量のGHG原単位を計算する
 * @param items 食料の種類の配列
 * @returns 食料摂取量のGHG原単位のMap
 */
export var estimateFoodIntakeIntensities = function (items) {
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateFoodIntakeIntensity(item), _a)));
    }, {});
};
/**
 * 食料摂取量の活動量のベースライン値を取得する
 * @returns 食料摂取量の活動量のMap
 */
export var getFoodIntakeAnnualBaselineAmounts = function () {
    return defaultItems.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = getBaselineAmount('food', item).value, _a)));
    }, {});
};
/**
 *  食料摂取量のGHG原単位を取得する
 * @param item 食料の種類
 * @returns 食料摂取量のGHG原単位[kgCO2e/kg]
 */
export var estimateFoodIntakeIntensity = function (item) {
    return getBaselineIntensity('food', item).value;
};
