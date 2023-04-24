import { getBaselineAmount, getBaselineIntensity } from '../data/database';
/**
 * 土地代の活動量を計算
 * @returns 土地代の活動量の年換算[000JPY]
 */
export var estimateLandRentAnnualAmount = function () {
    return getBaselineAmount('housing', 'land-rent').value;
};
/**
 * 土地代のGHG原単位を計算
 * @returns 土地代のGHG原単位[kgCO2e/000JPY]
 */
export var estimateLandRentIntensity = function () {
    return getBaselineIntensity('housing', 'land-rent').value;
};
