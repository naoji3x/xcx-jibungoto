import {
  estimateWalkingAnnualAmount,
  estimateWalkingIntensity,
  estimateWalkingAnnualFootprint
} from '../ts/mobility/walking'

describe('bicycle-maintenance', () => {
  test('amount case A1', () => {
    expect(
      estimateWalkingAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(168.9344406)
  })

  test('amount case A2', () => {
    expect(
      estimateWalkingAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(168.9344406)
  })

  test('amount case A3', () => {
    expect(
      estimateWalkingAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(168.9344406)
  })

  test('amount case A4', () => {
    expect(
      estimateWalkingAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(168.9344406)
  })

  test('amount case A5', () => {
    expect(
      estimateWalkingAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(168.9344406)
  })

  // case 01: gasoline, unknown, 1, unknown
  test('intensity case 01', () => {
    expect(estimateWalkingIntensity()).toBeCloseTo(0)
  })

  test('footprint', () => {
    expect(
      estimateWalkingAnnualFootprint({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(168.9344406 * 0)
  })
})
