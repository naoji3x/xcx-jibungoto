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
 * ソフトドリンク・スナックの活動量を計算する
 * @param item ソフトドリンク・スナックの種類
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @returns ソフトドリンク・スナックの活動量[kg]
 */
export var estimateSoftDrinkSnackAnnualAmount = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, expenses = _a.expenses;
    var baseline = getBaselineAmount('food', item).value;
    var dishFactor = getParameter('soft-drink-snack-factor', expenses).value;
    return (baseline * dishFactor * estimateFoodLossRate(foodDirectWaste, foodLeftover));
};
var defaultItems = [
    'sweets-snack',
    'coffee-tea',
    'cold-drink'
];
/**
 * ソフトドリンク・スナックの活動量を計算する
 * @param param ソフトドリンク・スナックの活動量を計算するための引数
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックの活動量のMap
 */
export var estimateSoftDrinkSnackAnnualAmounts = function (_a, items) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, expenses = _a.expenses;
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateSoftDrinkSnackAnnualAmount(item, {
            foodDirectWaste: foodDirectWaste,
            foodLeftover: foodLeftover,
            expenses: expenses
        }), _a)));
    }, {});
};
/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param items ソフトドリンク・スナックの種類の配列
 * @returns ソフトドリンク・スナックのGHG原単位のMap
 */
export var estimateSoftDrinkSnackIntensities = function (items) {
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateSoftDrinkSnackIntensity(item), _a)));
    }, {});
};
/**
 * ソフトドリンク・スナックの活動量を計算する
 * @returns ソフトドリンク・スナックの活動量のMap
 */
export var getSoftDrinkSnackAnnualBaselineAmounts = function () {
    return defaultItems.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = getBaselineAmount('food', item).value, _a)));
    }, {});
};
/**
 * ソフトドリンク・スナックのGHG原単位を計算する
 * @param item ソフトドリンク・スナックの種類
 * @returns ソフトドリンク・スナックのGHG原単位[kgCO2e/kg]
 */
export var estimateSoftDrinkSnackIntensity = function (item) { return getBaselineIntensity('food', item).value; };
