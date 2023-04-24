import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
/**
 * 家電・家具の年間の活動量を計算
 * @param item 家電・家具のカーボンフットプリントアイテム名
 * @param param 家電・家具の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateApplianceFurnitureAnnualAmount = function (item, _a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'appliance-furniture-amount', expenses, residentCount);
};
/**
 * 家電・家具のGHG原単位を計算
 * @param item 家電・家具のカーボンフットプリントアイテム名
 * @remarks ベースライン値を返す
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateApplianceFurnitureIntensity = function (item) { return getBaselineIntensity('other', item).value; };
