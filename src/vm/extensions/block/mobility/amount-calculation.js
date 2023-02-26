import { getParameter } from '../data/database';
/**
 * 年間の移動距離を取得
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param speedType スピードの種類
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateAnnualAmount = function (annualTravelingTime, speedType) {
    return annualTravelingTime * getParameter('transportation-speed', speedType).value;
};
/**
 * 年間の移動距離を取得（週間の移動も考慮）
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param weeklySpeedType 週間の移動のスピード種類
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param annualSpeedType 年間の移動のスピード種類
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateAnnualAmountAddingWeeklyTravel = function (weeklyTravelingTime, weeklySpeedType, annualTravelingTime, annualSpeedType) {
    var _a;
    var wpy = (_a = getParameter('misc', 'weeks-per-year-excluding-long-vacations')) === null || _a === void 0 ? void 0 : _a.value;
    var weekCount = isNaN(wpy) ? 49 : wpy;
    var milage = annualTravelingTime *
        getParameter('transportation-speed', annualSpeedType).value +
        weeklyTravelingTime *
            weekCount *
            getParameter('transportation-speed', weeklySpeedType).value;
    return milage;
};
/**
 * 年間の移動距離を取得（住んでいる地域の規模での平均値を取得）
 * @param item 移動手段
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export var estimateAnnualAmountByArea = function (item, residentialAreaSize) {
    return getParameter('mileage-by-area', residentialAreaSize + '_' + item).value;
};
