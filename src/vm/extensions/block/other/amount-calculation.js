import { getBaselineAmount, getParameter } from '../data/database';
/**
 * 居住者の人数を考慮した活動量の補正計算
 * @param item その他のアイテム名
 * @param category パラメータテーブルを検索する際のカテゴリ
 * @param key パラメータテーブルを検索する際のキー
 * @param residentCount 居住者人数
 * @returns 補正された活動量
 */
export var estimateAnnualAmountConsideringResidentCount = function (item, category, key, residentCount) {
    var amount = getBaselineAmount('other', item).value;
    if (key === 'unknown') {
        // 国平均の支出額（average-per-capita）が指定されていて、わからない、の回答の場合は
        // 国平均に対する比率は1倍。
        return amount;
    }
    else {
        // 分子はパラメータテーブルから取得
        var numerator = getParameter(category, key).value;
        // 国平均の支出額（average-per-capita）を取得
        var averagePerCapita = getParameter(category, 'average-per-capita').value;
        // 分母は国平均の支出額（average-per-capita） * 居住人数
        var denominator = averagePerCapita * residentCount;
        return (amount * numerator) / denominator;
    }
};
/**
 * 活動量の補正計算
 * @param item その他のアイテム名
 * @param category パラメータテーブルを検索する際のカテゴリ
 * @param key パラメータテーブルを検索する際のキー
 * @returns 補正された活動量
 */
export var estimateAnnualAmount = function (item, category, key) {
    var amount = getBaselineAmount('other', item).value;
    var coefficient = getParameter(category, key).value;
    return coefficient * amount;
};
