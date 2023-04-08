import {
  type DishFrequency,
  type FoodDirectWaste,
  type FoodLeftover
} from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateDishAnnualAmount } from './dish'

interface ProcessedMeatAmountParam {
  foodDirectWaste: FoodDirectWaste
  foodLeftover: FoodLeftover
  beefDishFrequency: DishFrequency
  porkDishFrequency: DishFrequency
  chickenDishFrequency: DishFrequency
}

export const estimateProcessedMeatAnnualFootprint = ({
  foodDirectWaste,
  foodLeftover,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency
}: ProcessedMeatAmountParam): number =>
  estimateProcessedMeatAnnualAmount({
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency
  }) * estimateProcessedMeatIntensity()

export const estimateProcessedMeatAnnualAmount = ({
  foodDirectWaste,
  foodLeftover,
  beefDishFrequency,
  porkDishFrequency,
  chickenDishFrequency
}: ProcessedMeatAmountParam): number => {
  const beefBaseline = getBaselineAmount('food', 'beef').value
  const porkBaseline = getBaselineAmount('food', 'pork').value
  const chickenBaseline = getBaselineAmount('food', 'chicken').value
  const otherMeatBaseline = getBaselineAmount('food', 'other-meat').value

  const beef = estimateDishAnnualAmount('beef', {
    foodDirectWaste,
    foodLeftover,
    frequency: beefDishFrequency
  })
  const pork = estimateDishAnnualAmount('pork', {
    foodDirectWaste,
    foodLeftover,
    frequency: porkDishFrequency
  })
  const chicken = estimateDishAnnualAmount('chicken', {
    foodDirectWaste,
    foodLeftover,
    frequency: chickenDishFrequency
  })
  const otherMeat = estimateDishAnnualAmount('other-meat', {
    foodDirectWaste,
    foodLeftover,
    frequency: porkDishFrequency
  })

  return (
    (getBaselineAmount('food', 'processed-meat').value *
      (beef + pork + chicken + otherMeat)) /
    (beefBaseline + porkBaseline + chickenBaseline + otherMeatBaseline)
  )
}

export const estimateProcessedMeatIntensity = (): number =>
  getBaselineIntensity('food', 'processed-meat').value
