import {
  type DishFrequency,
  type FoodDirectWaste,
  type FoodLeftover
} from '../../ts/common/types'
import {
  estimateProcessedMeatAnnualAmount,
  estimateProcessedMeatIntensity
} from '../../ts/food/processed-meat'

const testAmount = (
  id: string,
  foodDirectWaste: FoodDirectWaste,
  foodLeftover: FoodLeftover,
  beefDishFrequency: DishFrequency,
  porkDishFrequency: DishFrequency,
  chickenDishFrequency: DishFrequency,
  value: number
): void => {
  test('amount case ' + id, () => {
    expect(
      estimateProcessedMeatAnnualAmount({
        foodDirectWaste,
        foodLeftover,
        beefDishFrequency,
        porkDishFrequency,
        chickenDishFrequency
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (id: string, value: number): void => {
  test('intensity case ' + id, () => {
    expect(estimateProcessedMeatIntensity()).toBeCloseTo(value)
  })
}

describe('processed-meat', () => {
  //
  // Amount
  //
  testAmount(
    'E6',
    'seldom',
    'seldom',
    'everyday',
    'everyday',
    'everyday',
    11.46859484
  )

  testAmount(
    '01',
    '1-per-week',
    '1-per-week',
    '4-5-per-week',
    '4-5-per-week',
    '4-5-per-week',
    7.604431183
  )

  testAmount(
    '02',
    '2-3-per-week',
    '2-3-per-week',
    '2-3-per-week',
    '2-3-per-week',
    '2-3-per-week',
    4.472657796
  )

  testAmount(
    '03',
    '4-7-per-week',
    '4-7-per-week',
    '1-per-week',
    '1-per-week',
    '1-per-week',
    1.987442163
  )

  testAmount(
    '04',
    '8-more-per-week',
    '8-more-per-week',
    '2-3-per-month',
    '2-3-per-month',
    '2-3-per-month',
    1.345473771
  )

  testAmount(
    '05',
    'unknown',
    'unknown',
    '1-less-per-month',
    '1-less-per-month',
    '1-less-per-month',
    0.420956474
  )

  testAmount('06', 'unknown', 'unknown', 'never', 'never', 'never', 0)

  testAmount(
    '07',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    'unknown',
    4.140424111
  )

  //
  // Intensity
  //
  testIntensity('01', 5.336739155)
})
