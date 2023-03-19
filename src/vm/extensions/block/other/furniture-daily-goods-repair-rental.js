import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateFurnitureDailyGoodsRepairRentalAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateFurnitureDailyGoodsRepairRentalAnnualAmount({
        expenses: expenses,
        residentCount: residentCount
    }) * estimateFurnitureDailyGoodsRepairRentalIntensity();
};
export var estimateFurnitureDailyGoodsRepairRentalAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('furniture-daily-goods-repair-rental', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateFurnitureDailyGoodsRepairRentalIntensity = function () {
    return getBaselineIntensity('other', 'furniture-daily-goods-repair-rental').value;
};
