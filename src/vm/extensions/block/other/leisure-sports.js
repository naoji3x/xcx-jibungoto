import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
/**
 * レジャー・スポーツの年間の活動量を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @param param レジャー・スポーツの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateLeisureSportsAnnualAmount = function (item, _a) {
    var expenses = _a.expenses;
    return estimateAnnualAmount(item, 'leisure-sports-factor', expenses);
};
/**
 * レジャー・スポーツのGHG原単位を計算
 * @param item レジャー・スポーツのカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateLeisureSportsIntensity = function (item) { return getBaselineIntensity('other', item).value; };
