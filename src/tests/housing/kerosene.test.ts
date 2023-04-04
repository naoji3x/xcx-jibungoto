import {
  estimateKeroseneAnnualAmount,
  estimateKeroseneAnnualFootprint,
  estimateKeroseneIntensity
} from '../../ts/housing/kerosene'

const testAmount = (
  title: string,
  monthlyConsumption: number,
  monthCount: number,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateKeroseneAnnualAmount({
        monthlyConsumption,
        monthCount,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateKeroseneIntensity()).toBeCloseTo(value)
  })
}

const testFootprint = (
  title: string,
  monthlyConsumption: number,
  monthCount: number,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateKeroseneAnnualFootprint({
        monthlyConsumption,
        monthCount,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

describe('electricity', () => {
  testAmount('amount case 01', 200, 2, 1, 4077.78104)
  testIntensity('intensity case 01', 0.280081108)
  testFootprint('footprint case 01', 200, 2, 1, 4077.78104 * 0.280081108)
})
