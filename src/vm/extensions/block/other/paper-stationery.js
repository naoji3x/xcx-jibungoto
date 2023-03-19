import { getBaselineIntensity } from '../data/database';
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation';
export var estimatePaperStationeryAnnualFootprint = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimatePaperStationeryAnnualAmount({ expenses: expenses, residentCount: residentCount }) *
        estimatePaperStationeryIntensity();
};
export var estimatePaperStationeryAnnualAmount = function (_a) {
    var expenses = _a.expenses, residentCount = _a.residentCount;
    return estimateAnnualAmountConsideringResidentCount('paper-stationery', 'daily-goods-amount', expenses, residentCount);
};
export var estimatePaperStationeryIntensity = function () {
    return getBaselineIntensity('other', 'paper-stationery').value;
};
