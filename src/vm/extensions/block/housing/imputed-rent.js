import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
/**
 * 帰属家賃の活動量を計算
 * @param param 帰属家賃の活動量を計算するための引数
 * @returns 帰属家賃の活動量[000JPY]
 */
export var estimateImputedRentAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var housingSizeValue = getParameter('housing-size', housingSize).value;
    var housingSizePerResident = housingSize === 'unknown'
        ? housingSizeValue
        : housingSizeValue / residentCount;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    return (housingSizePerResident * imputedRent) / (imputedRent + rent);
};
/**
 * 帰属家賃のGHG原単位を計算
 * @returns 帰属家賃のGHG原単位[kgCO2e/000JPY]
 */
export var estimateImputedRentIntensity = function () {
    return getBaselineIntensity('housing', 'imputed-rent').value;
};
