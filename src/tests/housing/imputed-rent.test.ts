import { type HousingSize } from '../../ts/common/types'
import {
  estimateImputedRentAnnualAmount,
  estimateImputedRentAnnualFootprint,
  estimateImputedRentIntensity
} from '../../ts/housing/imputed-rent'

const testAmount = (
  title: string,
  housingSize: HousingSize,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateImputedRentAnnualAmount({
        housingSize,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateImputedRentIntensity()).toBeCloseTo(value)
  })
}

const testFootprint = (
  title: string,
  housingSize: HousingSize,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateImputedRentAnnualFootprint({ housingSize, residentCount })
    ).toBeCloseTo(value)
  })
}

describe('imputed-rent', () => {
  testAmount('amount case 01', '1-room', 1, 16.44358036)
  testAmount('amount case 02', '2-room', 2, 12.33268527)
  testAmount('amount case 03', '3-room', 2, 16.44358036)
  testAmount('amount case 04', '4-room', 3, 16.44358036)
  testAmount('amount case 05', '5-6-room', 3, 21.92477381)
  testAmount('amount case 06', '7-more-room', 4, 24.66537054)
  testAmount('amount case 07', 'unknown', 4, 32.06179314)

  testIntensity('intensity case 01', 0.930699)
  testFootprint('footprint case 01', '1-room', 1, 16.44358036 * 0.930699)
})
