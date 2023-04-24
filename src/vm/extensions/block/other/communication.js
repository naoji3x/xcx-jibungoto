import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
/**
 * 通信の年間の活動量を計算
 * @param item 通信のカーボンフットプリントアイテム名
 * @param param 通信の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export var estimateCommunicationAnnualAmount = function (item, _a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount(item, 'communication-amount', expenses, residentCount);
};
/**
 * 通信のGHG原単位を計算
 * @param item 通信のカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export var estimateCommunicationIntensity = function (item) { return getBaselineIntensity('other', item).value; };
