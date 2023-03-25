import { getParameter } from 'ts/data/database'
import { type FoodDirectWaste, type FoodLeftover } from './types'

export const estimateFoodLossRatio = (
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

  const leftoverRatio = getParameter(
    'food-waste-share',
    'leftover-per-food-waste'
  ).value
  const directWasteRatio = getParameter(
    'food-waste-share',
    'direct-waste-per-food-waste'
  ).value

  const foodWasteRatio = getParameter(
    'food-waste-share',
    'food-waste-per-food'
  ).value

  const foodLossAverageRatio =
    foodDirectWasteFactor * directWasteRatio +
    foodLeftoverFactor * leftoverRatio

  // 全体に影響する割合
  // 食品ロスを考慮した食材購入量の平均に対する比率
  return (1 + foodLossAverageRatio * foodWasteRatio) / (1 + foodWasteRatio)
}
