import {
  estimateSoftDrinkSnackAnnualAmount,
  estimateSoftDrinkSnackIntensity
} from '../../ts/food/soft-drink-snack'

import {
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency,
  type SoftDrinkSnackExpenses,
  type SoftDrinkSnackItem
} from '../../ts/common/types'

const expectAmount = (
  param: {
    foodDirectWasteFrequency: FoodDirectWasteFrequency
    foodLeftoverFrequency: FoodLeftoverFrequency
    softDrinkSnackExpenses: SoftDrinkSnackExpenses
  },
  itemAndValues: Array<{ item: SoftDrinkSnackItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateSoftDrinkSnackAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: SoftDrinkSnackItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateSoftDrinkSnackIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('soft-drink-snack', () => {
  test('amount case E6', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'seldom',
        foodLeftoverFrequency: 'seldom',
        softDrinkSnackExpenses: '3k-less'
      },
      [
        { item: 'sweets-snack', value: 6.570425326 },
        { item: 'coffee-tea', value: 43.29127593 },
        { item: 'cold-drink', value: 41.23117778 }
      ]
    )
  })
  test('amount case 01', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '1-per-week',
        foodLeftoverFrequency: '1-per-week',
        softDrinkSnackExpenses: '3k-5k'
      },
      [
        { item: 'sweets-snack', value: 13.55393908 },
        { item: 'coffee-tea', value: 89.3043125 },
        { item: 'cold-drink', value: 85.05459603 }
      ]
    )
  })

  test('amount case 02', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '2-3-per-week',
        foodLeftoverFrequency: '2-3-per-week',
        softDrinkSnackExpenses: '5k-10k'
      },
      [
        { item: 'sweets-snack', value: 26.90532509 },
        { item: 'coffee-tea', value: 177.2740416 },
        { item: 'cold-drink', value: 168.8381173 }
      ]
    )
  })

  test('amount case 03', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '4-7-per-week',
        foodLeftoverFrequency: '4-7-per-week',
        softDrinkSnackExpenses: '10k-15k'
      },
      [
        { item: 'sweets-snack', value: 49.81450621 },
        { item: 'coffee-tea', value: 328.2182547 },
        { item: 'cold-drink', value: 312.5993615 }
      ]
    )
  })

  test('amount case 04', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: '8-more-per-week',
        foodLeftoverFrequency: '8-more-per-week',
        softDrinkSnackExpenses: '15k-more'
      },
      [
        { item: 'sweets-snack', value: 75.5413227 },
        { item: 'coffee-tea', value: 497.7273285 },
        { item: 'cold-drink', value: 474.0420219 }
      ]
    )
  })

  test('amount case 05', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'unknown',
        foodLeftoverFrequency: 'unknown',
        softDrinkSnackExpenses: 'unknown'
      },
      [
        { item: 'sweets-snack', value: 20.70887802 },
        { item: 'coffee-tea', value: 136.4468369 },
        { item: 'cold-drink', value: 129.9537532 }
      ]
    )
  })

  test('amount case 06', () => {
    expectAmount(
      {
        foodDirectWasteFrequency: 'unknown',
        foodLeftoverFrequency: 'unknown',
        softDrinkSnackExpenses: 'unknown'
      },
      [
        { item: 'sweets-snack', value: 20.70887802 },
        { item: 'coffee-tea', value: 136.4468369 },
        { item: 'cold-drink', value: 129.9537532 }
      ]
    )
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'sweets-snack', value: 4.939585725 },
      { item: 'coffee-tea', value: 0.465905509 },
      { item: 'cold-drink', value: 0.482549688 }
    ])
  })
})
