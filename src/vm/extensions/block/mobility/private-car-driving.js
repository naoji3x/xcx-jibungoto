import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * 自家用車の運転時のフットプリントを計算
 * @param mileage 自家用車の運転距離[km]
 * @param carType 自動車の種類
 * @param carPassengers 平均乗車人数
 * @param carCharging 自宅充電の割合
 * @param electricityType 家庭での電力の種類
 * @returns 自家用車の運転時のフットプリント[kgCO2e]
 */
export var estimatePrivateCarDrivingFootprint = function (_a) {
    var mileage = _a.mileage, carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    return estimatePrivateCarDrivingAmount({ mileage: mileage }) *
        estimatePrivateCarDrivingIntensity({
            carType: carType,
            carPassengers: carPassengers,
            carCharging: carCharging,
            electricityType: electricityType
        });
};
/**
 * 自家用車の運転時の活動量を計算
 * @param mileage 自家用車の運転距離[km]
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export var estimatePrivateCarDrivingAmount = function (_a) {
    var mileage = _a.mileage;
    return mileage;
};
/**
 * 自家用車の運転時のGHG原単位を計算
 * @param carIntensityFactorFirstKey 自動車の種類
 * @param carPassengersFirstKey 平均乗車人数
 * @param carChargingKey 自宅充電の割合
 * @param electricityIntensityKey 家庭での電力の種類
 * @returns 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimatePrivateCarDrivingIntensity = function (_a) {
    var carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'private-car-driving').value;
    // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
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
    // 人数補正値
    var passengerIntensityRatio = getParameter('car-passengers', carPassengers + '_private-car-factor').value;
    return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio;
};
