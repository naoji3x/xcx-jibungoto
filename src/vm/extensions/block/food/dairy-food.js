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
export var estimateDairyFoodAnnualFootprint = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    return estimateDairyFoodAnnualAmount(item, {
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: frequency
    }) * estimateDairyFoodIntensity(item);
};
export var estimateDairyFoodAnnualAmount = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    var baseline = getBaselineAmount('food', item).value;
    var foodIntake = getParameter('dairy-food-factor', frequency).value;
    return (baseline * foodIntake * estimateFoodLossRate(foodDirectWaste, foodLeftover));
};
var defaultItems = ['milk', 'other-dairy', 'eggs'];
export var estimateDairyFoodAnnualAmounts = function (_a, items) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, frequency = _a.frequency;
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateDairyFoodAnnualAmount(item, {
            foodDirectWaste: foodDirectWaste,
            foodLeftover: foodLeftover,
            frequency: frequency
        }), _a)));
    }, {});
};
export var estimateDairyFoodIntensities = function (items) {
    if (items === undefined) {
        items = defaultItems;
    }
    return items.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = estimateDairyFoodIntensity(item), _a)));
    }, {});
};
export var getDairyFoodAnnualBaselineAmounts = function () {
    return defaultItems.reduce(function (acc, item) {
        var _a;
        return (__assign(__assign({}, acc), (_a = {}, _a[item] = getBaselineAmount('food', item).value, _a)));
    }, {});
};
export var estimateDairyFoodIntensity = function (item) {
    return getBaselineIntensity('food', item).value;
};
