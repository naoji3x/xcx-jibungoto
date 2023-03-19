import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimateElectronicsAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateElectronicsAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimateElectronicsIntensity();
};
export var estimateElectronicsAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('electronics', 'appliance-furniture-amount', expenses, residentCount);
};
export var estimateElectronicsIntensity = function () {
    return getBaselineIntensity('other', 'electronics').value;
};
