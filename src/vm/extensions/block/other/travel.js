import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
/**
 * 旅行の年間の活動量を計算
 * @param item 旅行のカーボンフットプリントアイテム名
 * @param param 旅行の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateTravelAnnualAmount = function (item, _a) {
    var expenses = _a.expenses;
    return estimateAnnualAmount(item, 'travel-factor', expenses);
};
/**
 * 旅行のGHG原単位を計算
 * @param item 旅行のカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateTravelIntensity = function (item) {
    return getBaselineIntensity('other', item).value;
};
