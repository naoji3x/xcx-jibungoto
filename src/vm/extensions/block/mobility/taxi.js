import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * タクシーのGHG原単位を計算
 * @param param タクシーのGHG原単位を計算するための引数
 * @returns タクシーのGHG原単位[kgCO2e/km-passenger]
 */
export var estimateTaxiIntensity = function (_a) {
    var carPassengers = _a.carPassengers;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'taxi').value;
    //  人数補正値
    var rate = getParameter('car-passengers', carPassengers + '_taxi-factor').value;
    return baselineIntensity * rate;
};
