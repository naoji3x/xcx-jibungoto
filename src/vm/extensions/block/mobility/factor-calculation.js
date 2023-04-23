import { getParameter } from '../data/database';
/**
 * 自動車種類に応じて運転時GHG原単位の補正係数を取得
 * @param carType 自動車の種類
 * @param carCharging 自宅充電の割合
 * @param electricityType 家庭での電力の種類
 * @param suffix 削減量計算の時はfactor, 削減施策計算の時はintensityを使う
 * @returns 運転時GHG原単位の補正係数
 */
export var estimateCarDrivingIntensityFactor = function (carType, carCharging, electricityType, suffix) {
    if (suffix === void 0) { suffix = 'factor'; }
    // 自家用車の場合は、自動車種類に応じて運転時GHG原単位の補正係数を取得
    var factor = getParameter('car-intensity-factor', carType + '_driving-' + suffix).value;
    // PHV, EVの補正
    if (carType === 'phv' || carType === 'ev') {
        // PHV, EVの場合は自宅での充電割合と再生エネルギー電力の割合で補正
        var electricityIntensityFactor = getParameter('electricity-intensity-factor', electricityType).value *
            getParameter('car-charging', carCharging).value;
        // GHG原単位の補正係数を電力割合で補正
        factor =
            factor * (1 - electricityIntensityFactor) +
                getParameter('renewable-car-intensity-factor', carType + '_driving-factor').value *
                    electricityIntensityFactor;
    }
    return factor;
};
