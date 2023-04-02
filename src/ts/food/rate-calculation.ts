import { type FoodDirectWaste, type FoodLeftover } from '../common/types'
import { getParameter } from '../data/database'

export const estimateFoodLossRate = (
  foodDirectWaste: FoodDirectWaste,
  foodLeftover: FoodLeftover
): number => {
  const foodDirectWasteFactor = getParameter(
    'food-direct-waste-factor',
    foodDirectWaste
  ).value

  const foodLeftoverFactor = getParameter(
    'food-leftover-factor',
    foodLeftover
  ).value

  const leftoverRate = getParameter(
    'food-waste-share',
    'leftover-per-food-waste'
  ).value
  const directWasteRate = getParameter(
    'food-waste-share',
    'direct-waste-per-food-waste'
  ).value

  const foodWasteRate = getParameter(
    'food-waste-share',
    'food-waste-per-food'
  ).value

  const foodLossAverageRate =
    foodDirectWasteFactor * directWasteRate + foodLeftoverFactor * leftoverRate

  // 全体に影響する割合
  // 食品ロスを考慮した食材購入量の平均に対する比率
  return (1 + foodLossAverageRate * foodWasteRate) / (1 + foodWasteRate)
}
