import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * タクシーのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の使用時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns タクシーのフットプリント[kgCO2e]
 */
export var estimateTaxiAnnualFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize, carPassengers = _a.carPassengers;
    return estimateTaxiAnnualAmount({
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
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns タクシーの運転時の活動量[km-passenger]
 */
export var estimateTaxiAnnualAmount = function (_a) {
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
