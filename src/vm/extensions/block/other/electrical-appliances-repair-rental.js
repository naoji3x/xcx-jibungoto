import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateElectricalAppliancesRepairRentalAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateElectricalAppliancesRepairRentalAnnualAmount({
        expenses: expenses,
        residentCount: residentCount
    }) * estimateElectricalAppliancesRepairRentalIntensity();
};
export var estimateElectricalAppliancesRepairRentalAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('electrical-appliances-repair-rental', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateElectricalAppliancesRepairRentalIntensity = function () {
    return getBaselineIntensity('other', 'electrical-appliances-repair-rental').value;
};
