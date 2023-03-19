import {
  estimateBicycleDrivingAnnualAmount,
  estimateBicycleDrivingIntensity,
  estimateBicycleDrivingAnnualFootprint
} from '../../ts/mobility/bicycle-driving'

describe('bicycle-driving', () => {
  test('amount case A1', () => {
    expect(
      estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(340.2621468)
  })

  test('amount case A2', () => {
    expect(
      estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(249.8138366)
  })

  test('amount case A3', () => {
    expect(
      estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(272.4527352)
  })

  test('amount case A4', () => {
    expect(
      estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(139.4906834)
  })

  test('amount case A5', () => {
    expect(
      estimateBicycleDrivingAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(264.0133354)
  })

  // case 01: gasoline, unknown, 1, unknown
  test('intensity case 01', () => {
    expect(estimateBicycleDrivingIntensity()).toBeCloseTo(0.013134541)
  })

  test('footprint', () => {
    expect(
      estimateBicycleDrivingAnnualFootprint({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(340.2621468 * 0.013134541)
  })
})
