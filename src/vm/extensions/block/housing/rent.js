import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
/**
 * 家賃の活動量を計算
 * @param param 家賃の活動量を計算するための引数
 * @returns 家賃の活動量[000JPY]
 */
export var estimateRentAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var housingSizeValue = getParameter('housing-size', housingSize).value;
    var housingSizePerResident = housingSize === 'unknown'
        ? housingSizeValue
        : housingSizeValue / residentCount;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    return (housingSizePerResident * rent) / (imputedRent + rent);
};
/**
 * 家賃のGHG原単位を計算
 * @returns 家賃のGHG原単位[kgCO2e/000JPY]
 */
export var estimateRentIntensity = function () {
    return getBaselineIntensity('housing', 'rent').value;
};
