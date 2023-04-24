import {
  type DairyFoodFrequency,
  type DishFrequency,
  type FoodDirectWasteFrequency,
  type FoodIntake,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses
} from '../../ts/common/types'
import {
  estimateReadyMealAnnualAmount,
  estimateReadyMealIntensity
} from '../../ts/food/ready-meal'

const testAmount = (
  id: string,
  foodDirectWaste: FoodDirectWasteFrequency,
  foodLeftover: FoodLeftoverFrequency,
  foodIntake: FoodIntake,
  value: number
): void => {
  test('amount case ' + id, () => {
    expect(
      estimateReadyMealAnnualAmount({
        foodIntake,
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (
  id: string,
  foodDirectWaste: FoodDirectWasteFrequency,
  foodLeftover: FoodLeftoverFrequency,
  foodIntake: FoodIntake,
  beefDishFrequency: DishFrequency,
  porkDishFrequency: DishFrequency,
  chickenDishFrequency: DishFrequency,
  seafoodDishFrequency: DishFrequency,
  dairyFoodFrequency: DairyFoodFrequency,
  softDrinkSnackExpenses: SoftDrinkSnackExpenses,
  value: number
): void => {
  test('intensity case ' + id, () => {
    expect(
      estimateReadyMealIntensity({
        foodDirectWasteFrequency: foodDirectWaste,
        foodLeftoverFrequency: foodLeftover,
        foodIntake,
        beefDishFrequency,
        porkDishFrequency,
        chickenDishFrequency,
        seafoodDishFrequency,
        dairyFoodFrequency,
        softDrinkSnackExpenses
      })
    ).toBeCloseTo(value)
  })
}

describe('ready-meal', () => {
  //
  // Amount
  //
  testAmount('E6', 'seldom', 'seldom', 'very-little', 28.92491378)
  testAmount('01', '1-per-week', '1-per-week', 'somewhat-little', 42.62025883)
  testAmount('02', '2-3-per-week', '2-3-per-week', 'moderate', 49.63410676)
  testAmount('03', '4-7-per-week', '4-7-per-week', 'somewhat-much', 60.15027366)
  testAmount(
    '04',
    '8-more-per-week',
    '8-more-per-week',
    'very-much',
    81.4419831
  )
  testAmount('05', 'unknown', 'unknown', 'unknown', 40.11077093)
  //
  // Intensity
  //
  testIntensity(
    'E6',
    'seldom',
    'seldom',
    'very-little',
    'everyday',
    'everyday',
    'everyday',
    'everyday',
    '3-more-per-day',
    '3k-less',
    5.038020502
  )

  testIntensity(
    '01',
    '1-per-week',
    '1-per-week',
    'somewhat-little',
    '4-5-per-week',
    '4-5-per-week',
    '4-5-per-week',
    '4-5-per-week',
    '2-per-day',
    '3k-5k',
    4.343537625
  )

  testIntensity(
    '02',
    '2-3-per-week',
    '2-3-per-week',
    'moderate',
    '2-3-per-week',
    '2-3-per-week',
    '2-3-per-week',
    '2-3-per-week',
    '1-per-day',
    '5k-10k',
    4.002209523
  )

  testIntensity(
    '03',
    '4-7-per-week',
    '4-7-per-week',
    'somewhat-much',
    '1-per-week',
    '1-per-week',
    '1-per-week',
    '1-per-week',
    'half-of-week',
    '10k-15k',
    3.759010407
  )

  testIntensity(
    '04',
    '8-more-per-week',
    '8-more-per-week',
    'very-much',
    '2-3-per-month',
    '2-3-per-month',
    '2-3-per-month',
    '2-3-per-month',
    '1-2-less-per-week',
    '15k-more',
    3.708710026
  )

  testIntensity(
    '05',
    'unknown',
    'unknown',
    'unknown',
    '1-less-per-month',
    '1-less-per-month',
    '1-less-per-month',
    '1-less-per-month',
    'never',
    'unknown',
    3.42912259
  )

  testIntensity(
    '06',
    'unknown',
    'unknown',
    'very-much',
    'never',
    'never',
    'never',
    'never',
    'unknown',
    'unknown',
    3.089207203
  )

  testIntensity(
    '07',
    'unknown',
    'unknown',
    'very-much',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    3.65415704
  )
})
