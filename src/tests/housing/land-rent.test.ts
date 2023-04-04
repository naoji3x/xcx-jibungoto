import {
  estimateLandRentAnnualAmount,
  estimateLandRentAnnualFootprint,
  estimateLandRentIntensity
} from '../../ts/housing/land-rent'

const testAmount = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateLandRentAnnualAmount()).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateLandRentIntensity()).toBeCloseTo(value)
  })
}

const testFootprint = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateLandRentAnnualFootprint()).toBeCloseTo(value)
  })
}

describe('land-rent', () => {
  testAmount('amount case 01', 1.96142204)
  testIntensity('intensity case 01', 0.542386441)
  testFootprint('footprint case 01', 1.96142204 * 0.542386441)
})
