import {
  estimateTaxiAnnualAmount,
  estimateTaxiAnnualFootprint,
  estimateTaxiIntensity
} from '../../ts/mobility/taxi'

describe('taxi', () => {
  test('intensity case 01', () => {
    expect(estimateTaxiIntensity({ carPassengers: '1' })).toBeCloseTo(
      0.708691554
    )
  })
  test('intensity case 08', () => {
    expect(estimateTaxiIntensity({ carPassengers: '1-2' })).toBeCloseTo(
      0.472461036
    )
  })
  test('intensity case 09', () => {
    expect(estimateTaxiIntensity({ carPassengers: '2' })).toBeCloseTo(
      0.354345777
    )
  })
  test('intensity case 10', () => {
    expect(estimateTaxiIntensity({ carPassengers: '2-3' })).toBeCloseTo(
      0.283476622
    )
  })
  test('intensity case 11', () => {
    expect(estimateTaxiIntensity({ carPassengers: '3' })).toBeCloseTo(
      0.236230518
    )
  })
  test('intensity case 12', () => {
    expect(estimateTaxiIntensity({ carPassengers: '3-4' })).toBeCloseTo(
      0.202483301
    )
  })
  test('intensity case 13', () => {
    expect(estimateTaxiIntensity({ carPassengers: '4-more' })).toBeCloseTo(
      0.177172889
    )
  })
  test('intensity case 14', () => {
    expect(estimateTaxiIntensity({ carPassengers: 'unknown' })).toBeCloseTo(
      0.429510033
    )
  })

  test('amount case 01', () => {
    expect(
      estimateTaxiAnnualAmount({
        annualTravelingTime: 20,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(1072.087906)
  })

  test('amount case A1', () => {
    expect(
      estimateTaxiAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(77.0691577)
  })

  test('amount case A2', () => {
    expect(
      estimateTaxiAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(44.27463)
  })

  test('amount case A3', () => {
    expect(
      estimateTaxiAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(33.7682362)
  })

  test('amount case A4', () => {
    expect(
      estimateTaxiAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(24.05233786)
  })

  test('amount case A5', () => {
    expect(
      estimateTaxiAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(48.16514973)
  })

  test('footprint', () => {
    expect(
      estimateTaxiAnnualFootprint({
        annualTravelingTime: 20,
        weeklyTravelingTime: 1,
        carPassengers: '1'
      })
    ).toBeCloseTo(0.708691554 * 1072.087906)
  })
})
