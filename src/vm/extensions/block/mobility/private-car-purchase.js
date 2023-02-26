import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
/**
 * 自家用車の購入時のフットプリントを計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param carType 自動車の種類
 * @returns 自家用車の購入時のフットプリント[kgCO2e]
 */
export var estimatePrivateCarPurchaseFootprint = function (_a) {
    var annualMileage = _a.annualMileage, carType = _a.carType;
    return estimatePrivateCarPurchaseAmount({ annualMileage: annualMileage }) *
        estimatePrivateCarPurchaseIntensity({ carType: carType });
};
/**
 * 自家用車の購入時の活動量を計算
 * @param annualMileage 自家用車の年間運転距離[km]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 自家用車の購入時の活動量[000JPY]
 */
export var estimatePrivateCarPurchaseAmount = function (_a) {
    var annualMileage = _a.annualMileage;
    var purchaseBaseline = getBaselineAmount('mobility', 'private-car-purchase').value;
    var drivingBaseline = getBaselineAmount('mobility', 'private-car-driving').value;
    return (purchaseBaseline * annualMileage) / drivingBaseline;
};
/**
 * 自家用車の購入時のGHG原単位を計算
 * @param carType 自動車の種類
 * @returns 自家用車の購入時のGHG原単位[kgCO2e/000JPY]
 */
export var estimatePrivateCarPurchaseIntensity = function (_a) {
    var carType = _a.carType;
    // ベースラインの運転時のGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'private-car-purchase').value;
    // 自動車種類に応じて運転時GHG原単位の補正係数を取得
    var ghgIntensityRatio = getParameter('car-intensity-factor', carType + '_manufacturing-factor').value;
    return baselineIntensity * ghgIntensityRatio;
};