import {
  estimateOtherEnergyAnnualAmount,
  estimateOtherEnergyIntensity
} from '../../ts/housing/other-energy'

const testAmount = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateOtherEnergyAnnualAmount()).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateOtherEnergyIntensity()).toBeCloseTo(value)
  })
}

describe('other-energy', () => {
  testAmount('amount case 01', 54.81742592)
  testIntensity('intensity case 01', 0.037319212)
})
