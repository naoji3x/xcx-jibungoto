import {
  estimateBusAnnualAmount,
  estimateBusIntensity
} from '../../ts/mobility/bus'

describe('bus', () => {
  test('intensity', () => {
    expect(estimateBusIntensity()).toBeCloseTo(0.082993045)
  })

  test('amount case 01', () => {
    expect(
      estimateBusAnnualAmount({
        annualTravelingTime: 20,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(1490)
  })

  test('amount case A1', () => {
    expect(
      estimateBusAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(698.5895508)
  })

  test('amount case A2', () => {
    expect(
      estimateBusAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(388.0210822)
  })

  test('amount case A3', () => {
    expect(
      estimateBusAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(310.4002107)
  })

  test('amount case A4', () => {
    expect(
      estimateBusAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(304.4881964)
  })

  test('amount case A5', () => {
    expect(
      estimateBusAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(430.6177624)
  })
})
