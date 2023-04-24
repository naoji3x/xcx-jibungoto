import { getBaselineAmount, getBaselineIntensity } from '../data/database';
/**
 * その他のエネルギーの活動量を計算
 * @returns その他のエネルギーの活動量の年換算[kWh]
 */
export var estimateOtherEnergyAnnualAmount = function () {
    return getBaselineAmount('housing', 'other-energy').value;
};
/**
 * その他のエネルギーのGHG原単位を計算
 * @returns その他のエネルギーのGHG原単位[kgCO2e/kWh]
 */
export var estimateOtherEnergyIntensity = function () {
    return getBaselineIntensity('housing', 'other-energy').value;
};
