import { estimateCarSharingRentalIntensity } from '../../ts/mobility/car-sharing-rental'
import { estimateOtherCarAnnualAmount } from '../../ts/mobility/other-car'

describe('car-sharing-rental', () => {
  test('amount case 01', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
        annualTravelingTime: 20,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(3.589702202)
  })

  test('amount case A1', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(0.236309982)
  })

  test('amount case A2', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(0.136123272)
  })

  test('amount case A3', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(0.126355552)
  })

  test('amount case A4', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(0.123310036)
  })

  test('amount case A5', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-rental', {
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
})
