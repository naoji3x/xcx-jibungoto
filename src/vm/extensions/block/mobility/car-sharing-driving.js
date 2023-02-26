import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * カーシェアリングのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングの運転時のフットプリント[kgCO2e]
 */
export var estimateCarSharingDrivingAnnualFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize, carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    return estimateCarSharingDrivingAnnualAmount({
        weeklyTravelingTime: weeklyTravelingTime,
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) *
        estimateCarSharingDrivingIntensity({
            carType: carType,
            carPassengers: carPassengers,
            carCharging: carCharging,
            electricityType: electricityType
        });
};
/**
 * カーシェアリングの運転時の活動量を計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateCarSharingDrivingAnnualAmount = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        var otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'car-speed', annualTravelingTime, 'long-distance-car-speed');
        var taxiBaseline = getBaselineAmount('mobility', 'taxi').value;
        var carSharingBaseline = getBaselineAmount('mobility', 'car-sharing-driving').value;
        var ratio = carSharingBaseline / (taxiBaseline + carSharingBaseline);
        return otherCarMileage * ratio;
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('car-sharing-driving', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'car-sharing-driving').value;
    }
};
/**
 * カーシェアリングの運転時のGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングの運転時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateCarSharingDrivingIntensity = function (_a) {
    var carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'car-sharing-driving').value;
    // 自動車種類に応じて運転時GHG原単位の補正係数を取得
    var ghgIntensityRatio = getParameter('car-intensity-factor', carType + '_driving-factor').value;
    // PHV, EVの補正
    if (carType === 'phv' || carType === 'ev') {
        // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
        var electricityIntensityFactor = getParameter('electricity-intensity-factor', electricityType).value *
            getParameter('car-charging', carCharging).value;
        // GHG原単位の補正係数を電力割合で補正
        ghgIntensityRatio =
            ghgIntensityRatio * (1 - electricityIntensityFactor) +
                getParameter('renewable-car-intensity-factor', carType + '_driving-factor').value *
                    electricityIntensityFactor;
    }
    var passengerIntensityRatio = 1;
    if (carPassengers !== undefined) {
        // 人数補正値
        passengerIntensityRatio = getParameter('car-passengers', carPassengers + '_private-car-factor').value;
    }
    return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio;
};
