import {
  estimateAlcoholAnnualAmount,
  estimateAlcoholIntensity
} from '../../ts/food/alcohol'

import {
  type AlcoholFrequency,
  type FoodDirectWaste,
  type FoodLeftover
} from '../../ts/common/types'

const testAmount = (
  id: string,
  foodDirectWaste: FoodDirectWaste,
  foodLeftover: FoodLeftover,
  frequency: AlcoholFrequency,
  value: number
): void => {
  test('amount case ' + id, () => {
    expect(
      estimateAlcoholAnnualAmount({
        foodDirectWaste,
        foodLeftover,
        frequency
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (id: string, value: number): void => {
  test('intensity case ' + id, () => {
    expect(estimateAlcoholIntensity()).toBeCloseTo(value)
  })
}

describe('alcohol', () => {
  testAmount('E6', 'seldom', 'seldom', 'everyday', 94.46344332)
  testAmount('01', '1-per-week', '1-per-week', '4-5-per-week', 62.63546353)
  testAmount('02', '2-3-per-week', '2-3-per-week', '2-3-per-week', 36.83996706)
  testAmount('03', '4-7-per-week', '4-7-per-week', '1-per-week', 16.36997668)
  testAmount(
    '04',
    '8-more-per-week',
    '8-more-per-week',
    '2-3-less-per-month',
    4.432908722
  )
  testAmount('05', 'unknown', 'unknown', 'never', 0)
  testAmount('06', 'unknown', 'unknown', 'unknown', 53.83668469)

  testIntensity('01', 0.944414337)
})
