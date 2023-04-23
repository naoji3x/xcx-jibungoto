import { getParameter } from '../data/database';
export var estimateFoodLossRate = function (foodDirectWaste, foodLeftover) {
    var foodDirectWasteFactor = getParameter('food-direct-waste-factor', foodDirectWaste).value;
    var foodLeftoverFactor = getParameter('food-leftover-factor', foodLeftover).value;
    var leftoverRate = getParameter('food-waste-share', 'leftover-per-food-waste').value;
    var directWasteRate = getParameter('food-waste-share', 'direct-waste-per-food-waste').value;
    var foodWasteRate = getParameter('food-waste-share', 'food-waste-per-food').value;
    var foodLossAverageRate = foodDirectWasteFactor * directWasteRate + foodLeftoverFactor * leftoverRate;
    // 全体に影響する割合
    // 食品ロスを考慮した食材購入量の平均に対する比率
    return (1 + foodLossAverageRate * foodWasteRate) / (1 + foodWasteRate);
};
