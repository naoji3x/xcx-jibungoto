import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * 自家用車の運転時のフットプリントを計算
 * @param privateCarMileage 自家用車の運転距離[km]
 * @param carIntensityFactorFirstKey 自動車の種類
 * @param carPassengersFirstKey 平均乗車人数
 * @param carChargingKey 自宅充電の割合
 * @param electricityIntensityKey 家庭での電力の種類
 * @returns 自家用車の運転時のフットプリント[kgCO2e]
 */
export var estimatePrivateCarDrivingFootprint = function (_a) {
    var mileage = _a.mileage, carIntensityFactorFirstKey = _a.carIntensityFactorFirstKey, carPassengersFirstKey = _a.carPassengersFirstKey, _b = _a.carChargingKey, carChargingKey = _b === void 0 ? 'unknown' : _b, _c = _a.electricityIntensityKey, electricityIntensityKey = _c === void 0 ? 'unknown' : _c;
    return estimatePrivateCarDrivingAmount({ mileage: mileage }) *
        estimatePrivateCarDrivingIntensity({
            carIntensityFactorFirstKey: carIntensityFactorFirstKey,
            carPassengersFirstKey: carPassengersFirstKey,
            carChargingKey: carChargingKey,
            electricityIntensityKey: electricityIntensityKey
        });
};
/**
 * 自家用車の運転時の活動量を計算
 * @param privateCarMileage 自家用車の運転距離[km]
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export var estimatePrivateCarDrivingAmount = function (_a) {
    var privateCarMileage = _a.mileage;
    return privateCarMileage;
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
    var carIntensityFactorFirstKey = _a.carIntensityFactorFirstKey, carPassengersFirstKey = _a.carPassengersFirstKey, _b = _a.carChargingKey, carChargingKey = _b === void 0 ? 'unknown' : _b, _c = _a.electricityIntensityKey, electricityIntensityKey = _c === void 0 ? 'unknown' : _c;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'private-car-driving').value;
    // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
    var ghgIntensityRatio = getParameter('car-intensity-factor', carIntensityFactorFirstKey + '_driving-factor').value;
    // PHV, EVの補正
    if (carIntensityFactorFirstKey === 'phv' ||
        carIntensityFactorFirstKey === 'ev') {
        // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
        var electricityIntensityFactor = getParameter('electricity-intensity-factor', electricityIntensityKey)
            .value * getParameter('car-charging', carChargingKey).value;
        // GHG原単位の補正係数を電力割合で補正
        ghgIntensityRatio =
            ghgIntensityRatio * (1 - electricityIntensityFactor) +
                getParameter('renewable-car-intensity-factor', carIntensityFactorFirstKey + '_driving-factor').value *
                    electricityIntensityFactor;
    }
    // 人数補正値
    var passengerIntensityRatio = getParameter('car-passengers', carPassengersFirstKey + '_private-car-factor').value;
    return baselineIntensity * ghgIntensityRatio * passengerIntensityRatio;
};
