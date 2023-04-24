import { getBaselineIntensity, getParameter } from '../data/database';
import { estimateCarDrivingIntensityFactor } from './factor-calculation';
/**
 * カーシェアリングの運転時のGHG原単位を計算
 * @param param カーシェアリングの運転時のGHG原単位を計算するための引数
 * @returns カーシェアリングの運転時のGHG原単位[kgCO2e/km-passenger]
 */
export var estimateCarSharingDrivingIntensity = function (_a) {
    var carType = _a.carType, carPassengers = _a.carPassengers, _b = _a.carCharging, carCharging = _b === void 0 ? 'unknown' : _b, _c = _a.electricityType, electricityType = _c === void 0 ? 'unknown' : _c;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'car-sharing-driving').value;
    // 自動車種類に応じて運転時GHG原単位の補正係数を取得
    var carDrivingIntensityFactor = estimateCarDrivingIntensityFactor(carType, carCharging, electricityType);
    // 人数補正値
    var passengerIntensityFactor = getParameter('car-passengers', carPassengers + '_private-car-factor').value;
    return (baselineIntensity * carDrivingIntensityFactor * passengerIntensityFactor);
};
