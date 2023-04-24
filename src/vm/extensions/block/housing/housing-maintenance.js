import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateImputedRentAnnualAmount } from './imputed-rent';
import { estimateRentAnnualAmount } from './rent';
/**
 * 家の維持の活動量を計算
 * @param param 家の維持の活動量を計算するための引数
 * @returns 家の維持の活動量[000JPY]
 */
export var estimateHousingMaintenanceAnnualAmount = function (_a) {
    var residentCount = _a.residentCount, housingSize = _a.housingSize;
    var baseline = getBaselineAmount('housing', 'housing-maintenance').value;
    var imputedRent = getBaselineAmount('housing', 'imputed-rent').value;
    var rent = getBaselineAmount('housing', 'rent').value;
    var imputedRentEstimation = estimateImputedRentAnnualAmount({
        residentCount: residentCount,
        housingSize: housingSize
    });
    var rentEstimation = estimateRentAnnualAmount({
        residentCount: residentCount,
        housingSize: housingSize
    });
    var rate = (imputedRentEstimation + rentEstimation) / (imputedRent + rent);
    return baseline * rate;
};
/**
 * 家の維持のGHG原単位を計算
 * @returns 家の維持のGHG原単位[kgCO2e/000JPY]
 */
export var estimateHousingMaintenanceIntensity = function () {
    return getBaselineIntensity('housing', 'housing-maintenance').value;
};
