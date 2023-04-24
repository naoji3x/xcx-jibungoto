import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
/**
 * 日常品の年間の活動量を計算
 * @param item 日常品のカーボンフットプリントアイテム名
 * @param param 日常品の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateDailyGoodsAnnualAmount = function (item, _a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'daily-goods-amount', expenses, residentCount);
};
/**
 * 日常品のGHG原単位を計算
 * @param item 日常品のカーボンフットプリントアイテム名
 * @returns   GHG原単位[kgCO2e/000JPY]
 */
export var estimateDailyGoodsIntensity = function (item) {
    return getBaselineIntensity('other', item).value;
};
