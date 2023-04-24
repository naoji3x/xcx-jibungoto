import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateDishAnnualAmount } from './dish';
/**
 * 加工肉の活動量を計算する
 * @param param 加工肉の活動量を計算するための引数
 * @returns 加工肉の活動量[kg]
 */
export var estimateProcessedMeatAnnualAmount = function (_a) {
    var foodDirectWaste = _a.foodDirectWaste, foodLeftover = _a.foodLeftover, beefDishFrequency = _a.beefDishFrequency, porkDishFrequency = _a.porkDishFrequency, chickenDishFrequency = _a.chickenDishFrequency;
    var beefBaseline = getBaselineAmount('food', 'beef').value;
    var porkBaseline = getBaselineAmount('food', 'pork').value;
    var chickenBaseline = getBaselineAmount('food', 'chicken').value;
    var otherMeatBaseline = getBaselineAmount('food', 'other-meat').value;
    var beef = estimateDishAnnualAmount('beef', {
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: beefDishFrequency
    });
    var pork = estimateDishAnnualAmount('pork', {
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: porkDishFrequency
    });
    var chicken = estimateDishAnnualAmount('chicken', {
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: chickenDishFrequency
    });
    var otherMeat = estimateDishAnnualAmount('other-meat', {
        foodDirectWaste: foodDirectWaste,
        foodLeftover: foodLeftover,
        frequency: porkDishFrequency
    });
    return ((getBaselineAmount('food', 'processed-meat').value *
        (beef + pork + chicken + otherMeat)) /
        (beefBaseline + porkBaseline + chickenBaseline + otherMeatBaseline));
};
/**
 * 加工肉のGHG原単位を計算する
 * @returns 加工肉のGHG原単位[kgCO2e/kg]
 */
export var estimateProcessedMeatIntensity = function () {
    return getBaselineIntensity('food', 'processed-meat').value;
};
