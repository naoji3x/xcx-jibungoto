import {
  getBaselineAmount,
  getBaselineIntensity,
  getParameter
} from '../data/database'
import { estimateFoodLossRate } from './rate-calculation'
import {
  type FoodDirectWaste,
  type FoodLeftover,
  type AlcoholFrequency
} from '../common/types'

interface AlcoholAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  frequency: AlcoholFrequency
}

export const estimateAlcoholAnnualFootprint = ({
  foodDirectWaste,
  foodLeftover,
  frequency
}: AlcoholAmountParam): number =>
  estimateAlcoholAnnualAmount({
    foodDirectWaste,
    foodLeftover,
    frequency
  }) * estimateAlcoholIntensity()

export const estimateAlcoholAnnualAmount = ({
  foodDirectWaste,
  foodLeftover,
  frequency
}: AlcoholAmountParam): number => {
  const baseline = getBaselineAmount('food', 'alcohol').value
  const factor = getParameter('alcohol-factor', frequency).value
  return baseline * factor * estimateFoodLossRate(foodDirectWaste, foodLeftover)
}

export const estimateAlcoholIntensity = (): number =>
  getBaselineIntensity('food', 'alcohol').value
