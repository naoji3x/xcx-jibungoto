import { getBaselineIntensity, getParameter } from '../data/database';
/**
 * カーシェアリングのレンタルのGHG原単位を計算
 * @param param カーシェアリングのレンタル時のGHG原単位を計算するための引数
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
