import {
  estimateAirplaneAnnualAmount,
  estimateAirplaneIntensity,
  estimateAirplaneAnnualFootprint
} from '../../ts/mobility/airplane'

describe('airplane', () => {
  test('intensity', () => {
    expect(estimateAirplaneIntensity()).toBeCloseTo(0.124064635)
  })

  test('amount case 01', () => {
    expect(
      estimateAirplaneAnnualAmount({ annualTravelingTime: 20 })
    ).toBeCloseTo(12000)
  })

  test('amount case A1', () => {
    expect(
      estimateAirplaneAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(1507.345223)
  })

  test('amount case A2', () => {
    expect(
      estimateAirplaneAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(1144.893404)
  })

  test('amount case A3', () => {
    expect(
      estimateAirplaneAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(1016.677146)
  })

  test('amount case A4', () => {
    expect(
      estimateAirplaneAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(775.2649318)
  })

  test('amount case A5', () => {
    expect(
      estimateAirplaneAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(1161.463556)
  })

  test('footprint', () => {
    expect(
      estimateAirplaneAnnualFootprint({ annualTravelingTime: 20 })
    ).toBeCloseTo(0.124064635 * 12000)
  })
})
