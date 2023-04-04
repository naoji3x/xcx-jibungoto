import {
  estimateWaterAnnualAmount,
  estimateWaterAnnualFootprint,
  estimateWaterIntensity
} from '../../ts/housing/water'

const testAmount = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateWaterAnnualAmount()).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateWaterIntensity()).toBeCloseTo(value)
  })
}

const testFootprint = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateWaterAnnualFootprint()).toBeCloseTo(value)
  })
}

describe('water', () => {
  testAmount('amount case 01', 103.5505)
  testIntensity('intensity case 01', 0.584462203)
  testFootprint('footprint case 01', 103.5505 * 0.584462203)
})
