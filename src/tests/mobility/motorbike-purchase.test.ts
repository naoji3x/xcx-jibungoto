import {
  estimateMotorbikePurchaseAnnualAmount,
  estimateMotorbikePurchaseIntensity
} from '../../ts/mobility/motorbike-purchase'

describe('motorbike-purchase', () => {
  test('intensity', () => {
    expect(estimateMotorbikePurchaseIntensity()).toBeCloseTo(979.6575783)
  })

  test('amount case 01', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        annualTravelingTime: 2,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(0.013929601)
  })

  test('amount case A1', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(0.001481261)
  })

  test('amount case A2', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(0.003256596)
  })

  test('amount case A3', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(0.003018645)
  })

  test('amount case A4', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(0.002882468)
  })

  test('amount case A5', () => {
    expect(
      estimateMotorbikePurchaseAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(0.002635317)
  })
})
