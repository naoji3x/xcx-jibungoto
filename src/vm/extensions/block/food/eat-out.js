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
import { estimateAlcoholAnnualAmount, estimateAlcoholIntensity } from './alcohol';
import { estimateDairyFoodAnnualAmounts, estimateDairyFoodIntensities, getDairyFoodAnnualBaselineAmounts } from './dairy-food';
import { estimateDishAnnualAmounts, estimateDishIntensities, getDishAnnualBaselineAmounts } from './dish';
import { estimateFoodIntakeAnnualAmounts, estimateFoodIntakeIntensities, getFoodIntakeAnnualBaselineAmounts } from './food-intake';
import { estimateProcessedMeatAnnualAmount, estimateProcessedMeatIntensity } from './processed-meat';
import { estimateReadyMealAnnualAmount, estimateReadyMealIntensity } from './ready-meal';
import { estimateSoftDrinkSnackAnnualAmounts, estimateSoftDrinkSnackIntensities, getSoftDrinkSnackAnnualBaselineAmounts } from './soft-drink-snack';
/**
 * 外食の活動量を計算する
 * @param item 外食の種類
 * @param param 外食の活動量を計算するための引数
 * @returns 外食の活動量[000JPY]
 */
export var estimateEatOutAnnualAmount = function (item, _a) {
    var eatOutExpenses = _a.eatOutExpenses;
    var baseline = getBaselineAmount('food', item).value;
    var factor = getParameter('eat-out-factor', eatOutExpenses).value;
    return baseline * factor;
};
/**
 * 外食のGHG原単位を計算する
 * @param item 外食の種類
 * @param param 外食のGHG原単位を計算するための引数
 * @returns 外食のGHG原単位[kgCO2e/000JPY]
 */
export var estimateEatOutIntensity = function (item, _a) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, foodIntake = _a.foodIntake, beefDishFrequency = _a.beefDishFrequency, porkDishFrequency = _a.porkDishFrequency, chickenDishFrequency = _a.chickenDishFrequency, seafoodDishFrequency = _a.seafoodDishFrequency, dairyFoodFrequency = _a.dairyFoodFrequency, alcoholFrequency = _a.alcoholFrequency, softDrinkSnackExpenses = _a.softDrinkSnackExpenses;
    // 活動量推定値
    var estimatedAmounts = __assign(__assign(__assign(__assign(__assign({}, estimateFoodIntakeAnnualAmounts({
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        foodIntake: foodIntake
    })), estimateSoftDrinkSnackAnnualAmounts({
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        softDrinkSnackExpenses: softDrinkSnackExpenses
    })), estimateDishAnnualAmounts({
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        beefDishFrequency: beefDishFrequency,
        porkDishFrequency: porkDishFrequency,
        chickenDishFrequency: chickenDishFrequency,
        seafoodDishFrequency: seafoodDishFrequency
    })), estimateDairyFoodAnnualAmounts({
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        dairyFoodFrequency: dairyFoodFrequency
    })), { alcohol: estimateAlcoholAnnualAmount({
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            alcoholFrequency: alcoholFrequency
        }), 'processed-meat': estimateProcessedMeatAnnualAmount({
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            beefDishFrequency: beefDishFrequency,
            porkDishFrequency: porkDishFrequency,
            chickenDishFrequency: chickenDishFrequency
        }), 'ready-meal': estimateReadyMealAnnualAmount({
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            foodIntake: foodIntake
        }) });
    // GHG原単位推定値
    var estimatedIntensities = __assign(__assign(__assign(__assign(__assign({}, estimateFoodIntakeIntensities()), estimateSoftDrinkSnackIntensities()), estimateDishIntensities()), estimateDairyFoodIntensities()), { alcohol: estimateAlcoholIntensity(), 'processed-meat': estimateProcessedMeatIntensity(), 'ready-meal': estimateReadyMealIntensity({
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            foodIntake: foodIntake,
            beefDishFrequency: beefDishFrequency,
            porkDishFrequency: porkDishFrequency,
            chickenDishFrequency: chickenDishFrequency,
            seafoodDishFrequency: seafoodDishFrequency,
            dairyFoodFrequency: dairyFoodFrequency,
            softDrinkSnackExpenses: softDrinkSnackExpenses
        }) });
    // 活動量ベースライン値
    var baselineAmounts = __assign(__assign(__assign(__assign(__assign({}, getFoodIntakeAnnualBaselineAmounts()), getSoftDrinkSnackAnnualBaselineAmounts()), getDishAnnualBaselineAmounts()), getDairyFoodAnnualBaselineAmounts()), { alcohol: getBaselineAmount('food', 'alcohol').value, 'processed-meat': getBaselineAmount('food', 'processed-meat').value, 'ready-meal': getBaselineAmount('food', 'ready-meal').value });
    var totalEstimatedAmount = Object.values(estimatedAmounts).reduce(function (sum, value) { return sum + value; }, 0);
    var totalEstimatedFootprint = Object.entries(estimatedAmounts).reduce(function (sum, _a) {
        var key = _a[0], value = _a[1];
        return sum + value * estimatedIntensities[key];
    }, 0);
    var totalBaselineAmount = Object.values(baselineAmounts).reduce(function (sum, value) { return sum + value; }, 0);
    var totalBaselineFootprint = Object.entries(baselineAmounts).reduce(function (sum, _a) {
        var key = _a[0], value = _a[1];
        return sum + value * getBaselineIntensity('food', key).value;
    }, 0);
    var weightedAvgEstimation = totalEstimatedFootprint / totalEstimatedAmount;
    var weightedAvgBaseline = totalBaselineFootprint / totalBaselineAmount;
    var intensity = getBaselineIntensity('food', item).value;
    return (intensity * weightedAvgEstimation) / weightedAvgBaseline;
};
