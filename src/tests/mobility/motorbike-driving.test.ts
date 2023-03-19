import {
  estimateMotorbikeDrivingAnnualAmount,
  estimateMotorbikeDrivingIntensity,
  estimateMotorbikeDrivingAnnualFootprint
} from '../../ts/mobility/motorbike-driving'

describe('motorbike-driving', () => {
  test('intensity', () => {
    expect(estimateMotorbikeDrivingIntensity()).toBeCloseTo(0.057043135)
  })

  test('amount case 01', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        annualTravelingTime: 2,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(1345)
  })

  test('amount case A1', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(169.5552676)
  })

  test('amount case A2', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(256.8545121)
  })

  test('amount case A3', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(298.3669602)
  })

  test('amount case A4', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(349.5926185)
  })

  test('amount case A5', () => {
    expect(
      estimateMotorbikeDrivingAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(254.458252)
  })

  test('footprint', () => {
    expect(
      estimateMotorbikeDrivingAnnualFootprint({
        annualTravelingTime: 2,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(0.057043135 * 1345)
  })
})
