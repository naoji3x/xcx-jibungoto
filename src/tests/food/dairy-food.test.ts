import {
  estimateDairyFoodAnnualAmount,
  estimateDairyFoodIntensity
} from '../../ts/food/dairy-food'

import {
  type DairyFoodFrequency,
  type DairyFoodItem,
  type FoodDirectWaste,
  type FoodLeftover
} from '../../ts/common/types'

const expectAmount = (
  param: {
    foodDirectWaste: FoodDirectWaste
    foodLeftover: FoodLeftover
    frequency: DairyFoodFrequency
  },
  itemAndValues: Array<{ item: DairyFoodItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDairyFoodAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: DairyFoodItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDairyFoodIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('dairy-food', () => {
  test('amount case E6', () => {
    expectAmount(
      {
        foodDirectWaste: 'seldom',
        foodLeftover: 'seldom',
        frequency: '3-more-per-day'
      },
      [
        { item: 'milk', value: 49.28508344 },
        { item: 'other-dairy', value: 24.14995192 },
        { item: 'eggs', value: 17.97475465 }
      ]
    )
  })
  test('amount case 01', () => {
    expectAmount(
      {
        foodDirectWaste: '1-per-week',
        foodLeftover: '1-per-week',
        frequency: '2-per-day'
      },
      [
        { item: 'milk', value: 33.88958783 },
        { item: 'other-dairy', value: 16.60607753 },
        { item: 'eggs', value: 12.35986599 }
      ]
    )
  })

  test('amount case 02', () => {
    expectAmount(
      {
        foodDirectWaste: '2-3-per-week',
        foodLeftover: '2-3-per-week',
        frequency: '1-per-day'
      },
      [
        { item: 'milk', value: 17.93939257 },
        { item: 'other-dairy', value: 8.790397374 },
        { item: 'eggs', value: 6.542672907 }
      ]
    )
  })

  test('amount case 03', () => {
    expectAmount(
      {
        foodDirectWaste: '4-7-per-week',
        foodLeftover: '4-7-per-week',
        frequency: 'half-of-week'
      },
      [
        { item: 'milk', value: 9.964294945 },
        { item: 'other-dairy', value: 4.882557298 },
        { item: 'eggs', value: 3.634076366 }
      ]
    )
  })

  test('amount case 04', () => {
    expectAmount(
      {
        foodDirectWaste: '8-more-per-week',
        foodLeftover: '8-more-per-week',
        frequency: '1-2-less-per-week'
      },
      [
        { item: 'milk', value: 4.625625926 },
        { item: 'other-dairy', value: 2.266581203 },
        { item: 'eggs', value: 1.687011269 }
      ]
    )
  })

  test('amount case 05', () => {
    expectAmount(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        frequency: 'never'
      },
      [
        { item: 'milk', value: 0 },
        { item: 'other-dairy', value: 0 },
        { item: 'eggs', value: 0 }
      ]
    )
  })

  test('amount case 06', () => {
    expectAmount(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        frequency: 'unknown'
      },
      [
        { item: 'milk', value: 27.99026002 },
        { item: 'other-dairy', value: 13.71537565 },
        { item: 'eggs', value: 10.20832311 }
      ]
    )
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'milk', value: 0.876594709 },
      { item: 'other-dairy', value: 2.204505819 },
      { item: 'eggs', value: 1.450456835 }
    ])
  })
})
