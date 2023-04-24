import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
/**
 * 衣服・美容の年間の活動量を計算
 * @param item 衣服・美容のカーボンフットプリントアイテム名
 * @param param 衣服・美容の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateClothesBeautyAnnualAmount = function (item, _a) {
    var expenses = _a.expenses;
    return estimateAnnualAmount(item, 'clothes-beauty-factor', expenses);
};
/**
 * 衣服・美容のGHG原単位を計算
 * @param item 衣服・美容のカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateClothesBeautyIntensity = function (item) { return getBaselineIntensity('other', item).value; };
