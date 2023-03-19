import {
  estimateCarSharingRentalAnnualAmount,
  estimateCarSharingRentalIntensity,
  estimateCarSharingRentalAnnualFootprint
} from '../../ts/mobility/car-sharing-rental'

describe('car-sharing-rental', () => {
  test('amount case 01', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        annualTravelingTime: 20,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(3.589702202)
  })

  test('amount case A1', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(0.236309982)
  })

  test('amount case A2', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(0.136123272)
  })

  test('amount case A3', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(0.126355552)
  })

  test('amount case A4', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(0.123310036)
  })

  test('amount case A5', () => {
    expect(
      estimateCarSharingRentalAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(0.161272731)
  })

  // case 01: gasoline, unknown, 1, unknown
  test('intensity case 01', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'gasoline'
      })
    ).toBeCloseTo(8.584152318)
  })

  // case 03: light, unknown, 1
  test('intensity case 03', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'light'
      })
    ).toBeCloseTo(8.584152318)
  })

  // case 04: hv, unknown, 1
  test('intensity case 04', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'hv'
      })
    ).toBeCloseTo(9.44256755)
  })

  // case 05: phv, unknown, 1
  test('intensity case 05', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'phv'
      })
    ).toBeCloseTo(14.35228394)
  })

  // case 06: ev, unknown, 1
  test('intensity case 06', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'ev'
      })
    ).toBeCloseTo(19.26200032)
  })

  // case 07: unknown, unknown, 1
  test('intensity case 07', () => {
    expect(
      estimateCarSharingRentalIntensity({
        carType: 'unknown'
      })
    ).toBeCloseTo(8.698477742)
  })

  test('footprint', () => {
    expect(
      estimateCarSharingRentalAnnualFootprint({
        annualTravelingTime: 20,
        weeklyTravelingTime: 1,
        carType: 'gasoline'
      })
    ).toBeCloseTo(3.589702202 * 8.584152318)
  })
})
