import {
  estimateEatOutAnnualAmount,
  estimateEatOutIntensity
} from '../../ts/food/eat-out'

import {
  type AlcoholFrequency,
  type DairyFoodFrequency,
  type DishFrequency,
  type EatOutExpenses,
  type EatOutItem,
  type FoodDirectWaste,
  type FoodIntake,
  type FoodLeftover,
  type SoftDrinkSnackExpenses
} from '../../ts/common/types'

const expectAmount = (
  param: {
    eatOutExpenses: EatOutExpenses
  },
  itemAndValues: Array<{ item: EatOutItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateEatOutAnnualAmount(inv.item, param)).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  param: {
    foodDirectWaste: FoodDirectWaste
    foodLeftover: FoodLeftover
    foodIntake: FoodIntake

    beefDishFrequency: DishFrequency
    porkDishFrequency: DishFrequency
    chickenDishFrequency: DishFrequency
    seafoodDishFrequency: DishFrequency

    dairyFoodFrequency: DairyFoodFrequency
    alcoholFrequency: AlcoholFrequency
    softDrinkSnackExpenses: SoftDrinkSnackExpenses
  },
  itemAndValues: Array<{ item: EatOutItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateEatOutIntensity(inv.item, param)).toBeCloseTo(inv.value)
  }
}

describe('eat-out', () => {
  test('amount case E6', () => {
    expectAmount(
      {
        eatOutExpenses: '5k-less'
      },
      [
        { item: 'restaurant', value: 23.40224153 },
        { item: 'bar-cafe', value: 6.597758472 }
      ]
    )
  })

  test('amount case 01', () => {
    expectAmount(
      {
        eatOutExpenses: '5k-10k'
      },

      [
        { item: 'restaurant', value: 70.20672458 },
        { item: 'bar-cafe', value: 19.79327542 }
      ]
    )
  })

  test('amount case 02', () => {
    expectAmount(
      {
        eatOutExpenses: '10k-20k'
      },
      [
        { item: 'restaurant', value: 140.4134492 },
        { item: 'bar-cafe', value: 39.58655083 }
      ]
    )
  })

  test('amount case 03', () => {
    expectAmount(
      {
        eatOutExpenses: '20k-50k'
      },

      [
        { item: 'restaurant', value: 374.4358645 },
        { item: 'bar-cafe', value: 105.5641355 }
      ]
    )
  })

  test('amount case 04', () => {
    expectAmount(
      {
        eatOutExpenses: '50k-more'
      },
      [
        { item: 'restaurant', value: 702.0672458 },
        { item: 'bar-cafe', value: 197.9327542 }
      ]
    )
  })

  test('amount case 05', () => {
    expectAmount(
      {
        eatOutExpenses: 'unknown'
      },
      [
        { item: 'restaurant', value: 122.1836001 },
        { item: 'bar-cafe', value: 34.44703713 }
      ]
    )
  })

  test('intensity case E6', () => {
    expectIntensity(
      {
        foodDirectWaste: 'seldom',
        foodLeftover: 'seldom',
        foodIntake: 'very-little',

        beefDishFrequency: 'everyday',
        porkDishFrequency: 'everyday',
        chickenDishFrequency: 'everyday',
        seafoodDishFrequency: 'everyday',

        dairyFoodFrequency: '3-more-per-day',
        alcoholFrequency: 'everyday',
        softDrinkSnackExpenses: '3k-less'
      },
      [
        { item: 'restaurant', value: 4.368957621 },
        { item: 'bar-cafe', value: 4.397409348 }
      ]
    )
  })

  test('intensity case 01', () => {
    expectIntensity(
      {
        foodDirectWaste: '1-per-week',
        foodLeftover: '1-per-week',
        foodIntake: 'somewhat-little',

        beefDishFrequency: '4-5-per-week',
        porkDishFrequency: '4-5-per-week',
        chickenDishFrequency: '4-5-per-week',
        seafoodDishFrequency: '4-5-per-week',

        dairyFoodFrequency: '2-per-day',
        alcoholFrequency: '4-5-per-week',
        softDrinkSnackExpenses: '3k-5k'
      },
      [
        { item: 'restaurant', value: 3.648206169 },
        { item: 'bar-cafe', value: 3.671964185 }
      ]
    )
  })

  test('intensity case 02', () => {
    expectIntensity(
      {
        foodDirectWaste: '2-3-per-week',
        foodLeftover: '2-3-per-week',
        foodIntake: 'moderate',

        beefDishFrequency: '2-3-per-week',
        porkDishFrequency: '2-3-per-week',
        chickenDishFrequency: '2-3-per-week',
        seafoodDishFrequency: '2-3-per-week',

        dairyFoodFrequency: '1-per-day',
        alcoholFrequency: '2-3-per-week',
        softDrinkSnackExpenses: '5k-10k'
      },
      [
        { item: 'restaurant', value: 2.962802471 },
        { item: 'bar-cafe', value: 2.982096969 }
      ]
    )
  })

  test('intensity case 03', () => {
    expectIntensity(
      {
        foodDirectWaste: '4-7-per-week',
        foodLeftover: '4-7-per-week',
        foodIntake: 'somewhat-much',

        beefDishFrequency: '1-per-week',
        porkDishFrequency: '1-per-week',
        chickenDishFrequency: '1-per-week',
        seafoodDishFrequency: '1-per-week',

        dairyFoodFrequency: 'half-of-week',
        alcoholFrequency: '1-per-week',
        softDrinkSnackExpenses: '10k-15k'
      },
      [
        { item: 'restaurant', value: 2.431326837 },
        { item: 'bar-cafe', value: 2.447160236 }
      ]
    )
  })

  test('intensity case 04', () => {
    expectIntensity(
      {
        foodDirectWaste: '8-more-per-week',
        foodLeftover: '8-more-per-week',
        foodIntake: 'very-much',

        beefDishFrequency: '2-3-per-month',
        porkDishFrequency: '2-3-per-month',
        chickenDishFrequency: '2-3-per-month',
        seafoodDishFrequency: '2-3-per-month',

        dairyFoodFrequency: '1-2-less-per-week',
        alcoholFrequency: '2-3-less-per-month',
        softDrinkSnackExpenses: '15k-more'
      },
      [
        { item: 'restaurant', value: 2.295848065 },
        { item: 'bar-cafe', value: 2.310799193 }
      ]
    )
  })

  test('intensity case 05', () => {
    expectIntensity(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        foodIntake: 'unknown',

        beefDishFrequency: '1-less-per-month',
        porkDishFrequency: '1-less-per-month',
        chickenDishFrequency: '1-less-per-month',
        seafoodDishFrequency: '1-less-per-month',

        dairyFoodFrequency: 'never',
        alcoholFrequency: 'never',
        softDrinkSnackExpenses: 'unknown'
      },
      [
        { item: 'restaurant', value: 2.572118492 },
        { item: 'bar-cafe', value: 2.58886876 }
      ]
    )
  })

  test('intensity case 06', () => {
    expectIntensity(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        foodIntake: 'very-much',

        beefDishFrequency: 'never',
        porkDishFrequency: 'never',
        chickenDishFrequency: 'never',
        seafoodDishFrequency: 'never',

        dairyFoodFrequency: 'unknown',
        alcoholFrequency: 'unknown',
        softDrinkSnackExpenses: 'unknown'
      },
      [
        { item: 'restaurant', value: 2.617809024 },
        { item: 'bar-cafe', value: 2.634856841 }
      ]
    )
  })

  test('intensity case 07', () => {
    expectIntensity(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        foodIntake: 'very-much',

        beefDishFrequency: 'unknown',
        porkDishFrequency: 'unknown',
        chickenDishFrequency: 'unknown',
        seafoodDishFrequency: 'unknown',

        dairyFoodFrequency: 'unknown',
        alcoholFrequency: 'unknown',
        softDrinkSnackExpenses: 'unknown'
      },
      [
        { item: 'restaurant', value: 3.073475287 },
        { item: 'bar-cafe', value: 3.093490514 }
      ]
    )
  })
})
