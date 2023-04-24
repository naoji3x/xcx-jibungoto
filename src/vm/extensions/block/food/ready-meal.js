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
import { estimateDairyFoodAnnualAmounts, estimateDairyFoodIntensities, getDairyFoodAnnualBaselineAmounts } from './dairy-food';
import { estimateDishAnnualAmounts, estimateDishIntensities, getDishAnnualBaselineAmounts } from './dish';
import { estimateFoodIntakeAnnualAmounts, estimateFoodIntakeIntensities, getFoodIntakeAnnualBaselineAmounts } from './food-intake';
import { estimateProcessedMeatAnnualAmount, estimateProcessedMeatIntensity } from './processed-meat';
import { estimateFoodLossRate } from './rate-calculation';
import { estimateSoftDrinkSnackAnnualAmount, estimateSoftDrinkSnackIntensity } from './soft-drink-snack';
/**
 * 加工食品の活動量を計算する
 * @param param 加工食品の活動量を計算するための引数
 * @returns 冷凍食品の活動量[kg]
 */
export var estimateReadyMealAnnualAmount = function (_a) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, foodIntake = _a.foodIntake;
    var baseline = getBaselineAmount('food', 'ready-meal').value;
    var intake = getParameter('food-intake-factor', foodIntake).value;
    return baseline * intake * estimateFoodLossRate(foodDirectWaste, foodLeftover);
};
/**
 * 加工食品のGHG原単位を計算する
 * @param param 加工食品のGHG原単位を計算するための引数
 * @returns 冷凍食品のGHG原単位[kgCO2/kg]
 */
export var estimateReadyMealIntensity = function (_a) {
    var foodDirectWaste = _a.foodDirectWasteFrequency, foodLeftover = _a.foodLeftoverFrequency, foodIntake = _a.foodIntake, beefDishFrequency = _a.beefDishFrequency, porkDishFrequency = _a.porkDishFrequency, chickenDishFrequency = _a.chickenDishFrequency, seafoodDishFrequency = _a.seafoodDishFrequency, dairyFoodFrequency = _a.dairyFoodFrequency, softDrinkSnackExpenses = _a.softDrinkSnackExpenses;
    // 活動量推定値
    var estimatedAmounts = __assign(__assign(__assign(__assign({}, estimateFoodIntakeAnnualAmounts({
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        foodIntake: foodIntake
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
    })), { 'sweets-snack': estimateSoftDrinkSnackAnnualAmount('sweets-snack', {
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            softDrinkSnackExpenses: softDrinkSnackExpenses
        }), 'processed-meat': estimateProcessedMeatAnnualAmount({
            foodDirectWasteFrequency: foodDirectWaste,
            foodLeftoverFrequency: foodLeftover,
            beefDishFrequency: beefDishFrequency,
            porkDishFrequency: porkDishFrequency,
            chickenDishFrequency: chickenDishFrequency
        }) });
    // GHG原単位推定値
    var estimatedIntensities = __assign(__assign(__assign(__assign({}, estimateFoodIntakeIntensities()), estimateDishIntensities()), estimateDairyFoodIntensities()), { 'sweets-snack': estimateSoftDrinkSnackIntensity('sweets-snack'), 'processed-meat': estimateProcessedMeatIntensity() });
    // 活動量ベースライン値
    var baselineAmounts = __assign(__assign(__assign(__assign({}, getFoodIntakeAnnualBaselineAmounts()), getDishAnnualBaselineAmounts()), getDairyFoodAnnualBaselineAmounts()), { 'sweets-snack': getBaselineAmount('food', 'sweets-snack').value, 'processed-meat': getBaselineAmount('food', 'processed-meat').value });
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
    var intensity = getBaselineIntensity('food', 'ready-meal').value;
    return (intensity * weightedAvgEstimation) / weightedAvgBaseline;
};
