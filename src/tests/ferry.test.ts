import {
  estimateFerryAnnualAmount,
  estimateFerryIntensity,
  estimateFerryAnnualFootprint
} from '../ts/mobility/ferry'

describe('ferry', () => {
  test('intensity', () => {
    expect(estimateFerryIntensity()).toBeCloseTo(0.424691332)
  })

  test('amount case 01', () => {
    expect(
      estimateFerryAnnualAmount({
        annualTravelingTime: 3
      })
    ).toBeCloseTo(120)
  })

  test('amount case A1', () => {
    expect(
      estimateFerryAnnualAmount({
        mileageByAreaFirstKey: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(20.16526175)
  })

  test('amount case A2', () => {
    expect(
      estimateFerryAnnualAmount({
        mileageByAreaFirstKey: 'city-150k-more'
      })
    ).toBeCloseTo(20.85237234)
  })

  test('amount case A3', () => {
    expect(
      estimateFerryAnnualAmount({
        mileageByAreaFirstKey: 'city-50k-150k'
      })
    ).toBeCloseTo(20.92105917)
  })

  test('amount case A4', () => {
    expect(
      estimateFerryAnnualAmount({
        mileageByAreaFirstKey: 'area-less-than-50k'
      })
    ).toBeCloseTo(17.30611523)
  })

  test('amount case A5', () => {
    expect(
      estimateFerryAnnualAmount({
        mileageByAreaFirstKey: 'unknown'
      })
    ).toBeCloseTo(20.10019321)
  })

  test('footprint', () => {
    expect(
      estimateFerryAnnualFootprint({
        annualTravelingTime: 3
      })
    ).toBeCloseTo(0.424691332 * 120)
  })
})
