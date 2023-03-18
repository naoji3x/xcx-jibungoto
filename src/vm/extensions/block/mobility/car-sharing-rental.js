import { getBaselineAmount, getBaselineIntensity, getParameter } from '../data/database';
import { estimateAnnualAmountAddingWeeklyTravel, estimateAnnualAmountByArea } from './amount-calculation';
/**
 * カーシェアリングのレンタルのフットプリントを計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングのレンタルのフットプリント[kgCO2e]
 */
export var estimateCarSharingRentalAnnualFootprint = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize, carType = _a.carType;
    return estimateCarSharingRentalAnnualAmount({
        weeklyTravelingTime: weeklyTravelingTime,
        annualTravelingTime: annualTravelingTime,
        residentialAreaSize: residentialAreaSize
    }) *
        estimateCarSharingRentalIntensity({
            carType: carType
        });
};
/**
 * カーシェアリングのレンタルの活動量を計算
 * 自家用車以外の車（タクシーやカーシェアリンング）の移動時間を引数に設定
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns レンタル回数[回数]
 */
export var estimateCarSharingRentalAnnualAmount = function (_a) {
    var weeklyTravelingTime = _a.weeklyTravelingTime, annualTravelingTime = _a.annualTravelingTime, residentialAreaSize = _a.residentialAreaSize;
    if (weeklyTravelingTime !== undefined || annualTravelingTime !== undefined) {
        weeklyTravelingTime = weeklyTravelingTime !== null && weeklyTravelingTime !== void 0 ? weeklyTravelingTime : 0;
        annualTravelingTime = annualTravelingTime !== null && annualTravelingTime !== void 0 ? annualTravelingTime : 0;
        var otherCarMileage = estimateAnnualAmountAddingWeeklyTravel(weeklyTravelingTime, 'car-speed', annualTravelingTime, 'long-distance-car-speed');
        var taxiBaseline = getBaselineAmount('mobility', 'taxi').value;
        var carSharingBaseline = getBaselineAmount('mobility', 'car-sharing-driving').value;
        var ratio = carSharingBaseline / (taxiBaseline + carSharingBaseline);
        var carSharing = otherCarMileage * ratio;
        var carSharingRental = getBaselineAmount('mobility', 'car-sharing-rental').value;
        return (carSharingRental * carSharing) / carSharingBaseline;
    }
    else if (residentialAreaSize !== undefined) {
        return estimateAnnualAmountByArea('car-sharing-rental', residentialAreaSize);
    }
    else {
        return getBaselineAmount('mobility', 'car-sharing-rental').value;
    }
};
/**
 * カーシェアリングのレンタルのGHG原単位を計算
 * @param carPassengers 平均乗車人数
 * @returns カーシェアリングのレンタルのGHG原単位[kgCO2e/レンタル回数]
 */
export var estimateCarSharingRentalIntensity = function (_a) {
    var carType = _a.carType;
    // ベースラインのレンタルのGHG原単位を取得
    var baselineIntensity = getBaselineIntensity('mobility', 'car-sharing-rental').value;
    // 自動車種類に応じてレンタルのGHG原単位の補正係数を取得
    var ghgIntensityRatio = getParameter('car-intensity-factor', carType + '_manufacturing-factor').value;
    return baselineIntensity * ghgIntensityRatio;
};
