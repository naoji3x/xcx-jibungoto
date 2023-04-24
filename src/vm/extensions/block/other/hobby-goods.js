import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
/**
 * 趣味・娯楽の年間の活動量を計算
 * @param item 趣味・娯楽のカーボンフットプリントアイテム名
 * @param param 趣味・娯楽の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateHobbyGoodsAnnualAmount = function (item, _a) {
    var expenses = _a.expenses;
    return estimateAnnualAmount(item, 'hobby-goods-factor', expenses);
};
/**
 * 趣味・娯楽のGHG原単位を計算
 * @param item 趣味・娯楽のカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateHobbyGoodsIntensity = function (item) {
    return getBaselineIntensity('other', item).value;
};
