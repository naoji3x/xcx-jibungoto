import { getBaselineAmount, getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * バイクの購入時の年間の活動量を計算
 * @param param 移動量を計算するための引数
 * @returns バイク購入台数の年間換算[vehicle]
 */
export var estimateMotorbikePurchaseAnnualAmount = function (param) {
    if ('residentialAreaSize' in param) {
        return estimateAnnualAmountByArea('motorbike-purchase', param.residentialAreaSize);
    }
    else {
        var drivingAmount = estimateAnnualAmountAddingWeeklyTravel(param.weeklyTravelingTime, 'motorbike-speed', param.annualTravelingTime, 'long-distance-motorbike-speed');
        var drivingBaseline = getBaselineAmount('mobility', 'motorbike-driving').value;
        var purchaseBaseline = getBaselineAmount('mobility', 'motorbike-purchase').value;
        // バイクの購入は移動実績と移動ベースラインとの比率で変更
        return (purchaseBaseline * drivingAmount) / drivingBaseline;
    }
};
/**
 * バイクでの購入時のGHG原単位を計算
 * @returns バイクの購入のGHG原単位[kgCO2e/vehicle]
 */
export var estimateMotorbikePurchaseIntensity = function () {
    return getBaselineIntensity('mobility', 'motorbike-purchase').value;
};
