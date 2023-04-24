import { getBaselineIntensity, getParameter } from '../data/database';
import { estimateCarDrivingIntensityFactor } from './factor-calculation';
/**
 * 自家用車の運転時の活動量を計算
 * @param param 自家用車の運転時の活動量を計算するための引数
 * @returns 自家用車の運転時の活動量[km-passenger]
 */
export var estimatePrivateCarDrivingAmount = function (_a) {
    var mileage = _a.mileage;
    return mileage;
};
/**
 * 自家用車の運転時のGHG原単位を計算
 * @param param 自家用車の運転時のGHG原単位を計算するための引数
 * @returns 自家用車の運転時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimatePrivateCarDrivingIntensity = function (_a) {
    var carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'private-car-driving').value;
    // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
    var carDrivingIntensityFactor = estimateCarDrivingIntensityFactor(carType, carCharging, electricityType);
    // 人数補正値
    var passengerIntensityFactor = getParameter('car-passengers', carPassengers + '_private-car-factor').value;
    return (baselineIntensity * carDrivingIntensityFactor * passengerIntensityFactor);
};
