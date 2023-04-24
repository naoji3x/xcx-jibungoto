import { getBaselineAmount } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * タクシー・カーシェアリングの活動量を計算
 * @remarks 自家用車以外の車（タクシーやカーシェアリンング）の合計の移動時間を引数に設定
 * @param param 移動量を計算するための引数
 * @returns タクシーの運転時の活動量[km-passenger]
 */
export var estimateOtherCarAnnualAmount = function (otherCarItem, param) {
    if ('residentialAreaSize' in param) {
        return estimateAnnualAmountByArea(otherCarItem, param.residentialAreaSize);
    }
    else {
        var otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(param.weeklyTravelingTime, 'car-speed', param.annualTravelingTime, 'long-distance-car-speed');
        var taxiBaseline = getBaselineAmount('mobility', 'taxi').value;
        var carSharingBaseline = getBaselineAmount('mobility', 'car-sharing-driving').value;
        var rate = otherCarItem === 'taxi'
            ? taxiBaseline / (taxiBaseline + carSharingBaseline)
            : carSharingBaseline / (taxiBaseline + carSharingBaseline);
        var mileage = otherCarMileage * rate;
        if (otherCarItem === 'car-sharing-rental') {
            var carSharingRental = getBaselineAmount('mobility', 'car-sharing-rental').value;
            return (carSharingRental * mileage) / carSharingBaseline;
        }
        else {
            return otherCarMileage * rate;
        }
    }
};
