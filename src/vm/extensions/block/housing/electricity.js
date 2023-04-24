import { getParameter } from '../data/database';
/**
 * 自宅の電力の年間の活動量を計算
 * @param param 自宅の電力の活動量を計算するための引数
 * @returns 活動量[kWh]
 */
export var estimateElectricityAnnualAmount = function (_a) {
    var monthlyConsumption = _a.monthlyConsumption, month = _a.month, residentCount = _a.residentCount, _b = _a.privateCar, privateCar = _b === void 0 ? undefined : _b;
    var electricitySeason = getParameter('electricity-season-factor', month).value;
    // PHV, EVの場合は活動量がダブルカウントにならないように補正
    var mobilityElectricityAmount = 0;
    if (privateCar !== undefined) {
        if (privateCar.carType === 'phv' || privateCar.carType === 'ev') {
            var mobilityElectricity = getParameter('car-intensity-factor', privateCar.carType + '_electricity-intensity').value;
            var mobilityCharging = getParameter('car-charging', privateCar.carCharging).value;
            mobilityElectricityAmount =
                privateCar.annualMileage * mobilityElectricity * mobilityCharging;
        }
    }
    var rate = electricitySeason / residentCount;
    return monthlyConsumption * rate - mobilityElectricityAmount;
};
/**
 * 自宅の電力のGHG原単位を計算
 * @param param 自宅の電力のGHG原単位を計算するための引数
 * @returns GHG原単位[kgCO2e/kWh]
 */
export var estimateElectricityIntensity = function (_a) {
    var electricity = _a.electricityType;
    return getParameter('electricity-intensity', electricity).value;
};
