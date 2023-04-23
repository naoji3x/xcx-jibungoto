import {
  estimateTrainAnnualAmount,
  estimateTrainIntensity
} from '../../ts/mobility/train'

describe('train', () => {
  test('intensity', () => {
    expect(estimateTrainIntensity()).toBeCloseTo(0.031326557)
  })

  test('amount case 01', () => {
    expect(
      estimateTrainAnnualAmount({
        annualTravelingTime: 20,
        weeklyTravelingTime: 5
      })
    ).toBeCloseTo(16700)
  })

  test('amount case A1', () => {
    expect(
      estimateTrainAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(4002.878879)
  })

  test('amount case A2', () => {
    expect(
      estimateTrainAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(2831.211796)
  })

  test('amount case A3', () => {
    expect(
      estimateTrainAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(2506.637751)
  })

  test('amount case A4', () => {
    expect(
      estimateTrainAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(1544.263668)
  })

  test('amount case A5', () => {
    expect(
      estimateTrainAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(2883.143695)
  })
})
