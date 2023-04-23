import {
  estimateFoodIntakeAnnualAmount,
  estimateFoodIntakeIntensity
} from '../../ts/food/food-intake'

import {
  type FoodDirectWaste,
  type FoodIntake,
  type FoodIntakeItem,
  type FoodLeftover
} from '../../ts/common/types'

const expectAmount = (
  param: {
    foodDirectWaste: FoodDirectWaste
    foodLeftover: FoodLeftover
    foodIntake: FoodIntake
  },
  itemAndValues: Array<{ item: FoodIntakeItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateFoodIntakeAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: FoodIntakeItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateFoodIntakeIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('food-intake', () => {
  test('amount case E6', () => {
    expectAmount(
      {
        foodDirectWaste: 'seldom',
        foodLeftover: 'seldom',
        foodIntake: 'very-little'
      },
      [
        { item: 'rice', value: 26.19145639 },
        { item: 'bread-flour', value: 18.33279553 },
        { item: 'noodle', value: 12.31380115 },
        { item: 'potatoes', value: 7.672696201 },
        { item: 'vegetables', value: 60.83319879 },
        { item: 'processed-vegetables', value: 6.744385873 },
        { item: 'beans', value: 15.17467942 },
        { item: 'fruits', value: 25.53894305 },
        { item: 'oil', value: 3.05371957 },
        { item: 'seasoning', value: 17.33570175 }
      ]
    )
  })

  test('amount case 01', () => {
    expectAmount(
      {
        foodDirectWaste: '1-per-week',
        foodLeftover: '1-per-week',
        foodIntake: 'somewhat-little'
      },
      [
        { item: 'rice', value: 38.59256623 },
        { item: 'bread-flour', value: 27.0129929 },
        { item: 'noodle', value: 18.14412988 },
        { item: 'potatoes', value: 11.30555827 },
        { item: 'vegetables', value: 89.63645312 },
        { item: 'processed-vegetables', value: 9.937712305 },
        { item: 'beans', value: 22.35957449 },
        { item: 'fruits', value: 37.6311014 },
        { item: 'oil', value: 4.499592271 },
        { item: 'seasoning', value: 25.54379595 }
      ]
    )
  })

  test('amount case 02', () => {
    expectAmount(
      {
        foodDirectWaste: '2-3-per-week',
        foodLeftover: '2-3-per-week',
        foodIntake: 'moderate'
      },
      [
        { item: 'rice', value: 44.94359267 },
        { item: 'bread-flour', value: 31.45841462 },
        { item: 'noodle', value: 21.13003779 },
        { item: 'potatoes', value: 13.16606941 },
        { item: 'vegetables', value: 104.3875708 },
        { item: 'processed-vegetables', value: 11.57312243 },
        { item: 'beans', value: 26.0392015 },
        { item: 'fruits', value: 43.82390336 },
        { item: 'oil', value: 5.240072428 },
        { item: 'seasoning', value: 29.74743773 }
      ]
    )
  })

  test('amount case 03', () => {
    expectAmount(
      {
        foodDirectWaste: '4-7-per-week',
        foodLeftover: '4-7-per-week',
        foodIntake: 'somewhat-much'
      },
      [
        { item: 'rice', value: 54.46596252 },
        { item: 'bread-flour', value: 38.12362853 },
        { item: 'noodle', value: 25.60693923 },
        { item: 'potatoes', value: 15.95561459 },
        { item: 'vegetables', value: 126.5045622 },
        { item: 'processed-vegetables', value: 14.02516388 },
        { item: 'beans', value: 31.55622612 },
        { item: 'fruits', value: 53.10904038 },
        { item: 'oil', value: 6.350306496 },
        { item: 'seasoning', value: 36.05014045 }
      ]
    )
  })

  test('amount case 04', () => {
    expectAmount(
      {
        foodDirectWaste: '8-more-per-week',
        foodLeftover: '8-more-per-week',
        foodIntake: 'very-much'
      },
      [
        { item: 'rice', value: 73.74556638 },
        { item: 'bread-flour', value: 51.61845028 },
        { item: 'noodle', value: 34.67116248 },
        { item: 'potatoes', value: 21.60350759 },
        { item: 'vegetables', value: 171.284049 },
        { item: 'processed-vegetables', value: 18.98972507 },
        { item: 'beans', value: 42.72634982 },
        { item: 'fruits', value: 71.90832735 },
        { item: 'oil', value: 8.59815796 },
        { item: 'seasoning', value: 48.8109987 }
      ]
    )
  })

  test('amount case 05', () => {
    expectAmount(
      {
        foodDirectWaste: 'unknown',
        foodLeftover: 'unknown',
        foodIntake: 'unknown'
      },
      [
        { item: 'rice', value: 36.32022954 },
        { item: 'bread-flour', value: 25.42246341 },
        { item: 'noodle', value: 17.07580051 },
        { item: 'potatoes', value: 10.63988512 },
        { item: 'vegetables', value: 84.35864392 },
        { item: 'processed-vegetables', value: 9.352578159 },
        { item: 'beans', value: 21.04303905 },
        { item: 'fruits', value: 35.41537591 },
        { item: 'oil', value: 4.234655533 },
        { item: 'seasoning', value: 24.03977302 }
      ]
    )
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'rice', value: 2.852329875 },
      { item: 'bread-flour', value: 2.655219688 },
      { item: 'noodle', value: 2.03794552 },
      { item: 'potatoes', value: 1.567735484 },
      { item: 'vegetables', value: 1.281591651 },
      { item: 'processed-vegetables', value: 3.390013568 },
      { item: 'beans', value: 1.058728707 },
      { item: 'fruits', value: 1.305111781 },
      { item: 'oil', value: 2.404909632 },
      { item: 'seasoning', value: 1.897020567 }
    ])
  })
})
