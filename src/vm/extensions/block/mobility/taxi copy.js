import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * タクシーのフットプリントを計算
 * @param mileage 自家用車の運転距離[km]
 * @param carType 自動車の種類
 * @param carPassengers 平均乗車人数
 * @param carCharging 自宅充電の割合
 * @param electricityType 家庭での電力の種類
 * @returns 自家用車の運転時のフットプリント[kgCO2e]
 */
export var estimateTaxiFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize, carPassengers = _a.carPassengers;
    return estimateTaxiAmount({
        weeklyTravelingTime: weeklyTravelingTime,
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) *
        estimateTaxiIntensity({
            carPassengers: carPassengers
        });
};
/**
 * タクシーの活動量を計算
 * @param mileage 自家用車の運転距離[km]
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export var estimateTaxiAmount = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        var otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'car-speed', annualTravelingTime, 'long-distance-car-speed');
        var taxiBaseline = getBaselineAmount('mobility', 'taxi').value;
        var carSharingBaseline = getBaselineAmount('mobility', 'car-sharing-driving').value;
        var ratio = taxiBaseline / (taxiBaseline + carSharingBaseline);
        return otherCarMileage * ratio;
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('taxi', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'taxi').value;
    }
};
/**
 * タクシーのGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns タクシーのGHG原単位[kgCO2e/km-passenger]
 */
export var estimateTaxiIntensity = function (_a) {
    var _b = _a === void 0 ? {} : _a, carPassengers = _b.carPassengers;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'taxi').value;
    var passengerIntensityRatio = 1;
    if (carPassengers !== undefined) {
        // 人数補正値
        passengerIntensityRatio = getParameter('car-passengers', carPassengers + '_taxi-factor').value;
    }
    return baselineIntensity * passengerIntensityRatio;
};
