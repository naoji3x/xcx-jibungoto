import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmount } from './amount-calculation';
/**
 * サービスの年間の活動量を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @param param サービスの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateServiceAnnualAmount = function (item, _a) {
    var expenses = _a.expenses;
    return estimateAnnualAmount(item, 'service-factor', expenses);
};
/**
 * サービスのGHG原単位を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateServiceIntensity = function (item) {
    return getBaselineIntensity('other', item).value;
};
