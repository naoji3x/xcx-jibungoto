import { estimateCarSharingDrivingIntensity } from '../../ts/mobility/car-sharing-driving'
import { estimateOtherCarAnnualAmount } from '../../ts/mobility/other-car'

describe('car-sharing-driving', () => {
  test('amount case 01', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        annualTravelingTime: 20,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(1352.912094)
  })

  test('amount case A1', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(89.06216)
  })

  test('amount case A2', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(51.30309174)
  })

  test('amount case A3', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(47.62176474)
  })

  test('amount case A4', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(46.47394961)
  })

  test('amount case A5', () => {
    expect(
      estimateOtherCarAnnualAmount('car-sharing-driving', {
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(60.7815956)
  })

  // case 01: gasoline, unknown, 1, unknown
  test('intensity case 01', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'gasoline',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.252186904)
  })

  // case 03: light, unknown, 1
  test('intensity case 03', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'light',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.187358435)
  })

  // case 04: hv, unknown, 1
  test('intensity case 04', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'hv',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.161620538)
  })

  // case 05: phv, unknown, 1
  test('intensity case 05', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.145066278)
  })

  // case 06: ev, unknown, 1
  test('intensity case 06', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.134030105)
  })

  // case 07: unknown, unknown, 1
  test('intensity case 07', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '1'
      })
    ).toBeCloseTo(0.221024768)
  })

  // case 08: unknown, unknown, 1-2
  test('intensity case 08', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '1-2'
      })
    ).toBeCloseTo(0.147349845)
  })

  // case 09: 2,
  test('intensity case 09', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '2'
      })
    ).toBeCloseTo(0.110512384)
  })

  // case 10: unknown, unknown, 2-3
  test('intensity case 10', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '2-3'
      })
    ).toBeCloseTo(0.088409907)
  })

  // case 11: unknown, unknown, 3
  test('intensity case 11', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '3'
      })
    ).toBeCloseTo(0.073674923)
  })

  // case 12: unknown, unknown, 3-4
  test('intensity case 12', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '3-4'
      })
    ).toBeCloseTo(0.063149934)
  })

  // case 13: unknown, unknown, 4-more
  test('intensity case 13', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: '4-more'
      })
    ).toBeCloseTo(0.055256192)
  })

  // case 14: unknown, unknown, unknown
  test('intensity case 14', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'unknown',
        carPassengers: 'unknown'
      })
    ).toBeCloseTo(0.168721197)
  })

  // case 15: ev, charge-almost-at-home, 1
  test('intensity case 15', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1',
        carCharging: 'charge-almost-at-home'
      })
    ).toBeCloseTo(0.134030105)
  })

  // case 16: ev, use-charging-spots-occasionally, 1
  test('intensity case 16', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1',
        carCharging: 'use-charging-spots-occasionally'
      })
    ).toBeCloseTo(0.134030105)
  })

  // case 17: ev, use-charging-spots-sometimes, 1
  test('intensity case 17', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1',
        carCharging: 'use-charging-spots-sometimes'
      })
    ).toBeCloseTo(0.134030105)
  })

  // case 18: ev, use-charging-spots-usually, 1
  test('intensity case 18', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1',
        carCharging: 'use-charging-spots-usually'
      })
    ).toBeCloseTo(0.134030105)
  })

  // case 19: ev, charge-almost-at-home, 1, 30-renewable
  test('intensity case 19', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'ev',
        carPassengers: '1',
        carCharging: 'charge-almost-at-home',
        electricityType: '30-renewable'
      })
    ).toBeCloseTo(0.114832418)
  })

  // case 20: phv, use-charging-spots-occasionally, 1-2, 50-renewable
  test('intensity case 20', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1-2',
        carCharging: 'use-charging-spots-occasionally',
        electricityType: '50-renewable'
      })
    ).toBeCloseTo(0.082774753)
  })

  // case 21: phv, use-charging-spots-sometimes, 1-2, 100-renewable
  test('intensity case 21', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1-2',
        carCharging: 'use-charging-spots-sometimes',
        electricityType: '100-renewable'
      })
    ).toBeCloseTo(0.072535987)
  })

  // case 22: phv, use-charging-spots-usually, 1-2, solar-panel
  test('intensity case 22', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1-2',
        carCharging: 'use-charging-spots-usually',
        electricityType: 'solar-panel'
      })
    ).toBeCloseTo(0.091875879)
  })

  // case 23: phv, unknown, 1-2, unknown
  test('intensity case 23', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1-2',
        carCharging: 'unknown',
        electricityType: 'unknown'
      })
    ).toBeCloseTo(0.096710852)
  })

  // case 24: phv, unknown, 1-2, conventional
  test('intensity case 24', () => {
    expect(
      estimateCarSharingDrivingIntensity({
        carType: 'phv',
        carPassengers: '1-2',
        carCharging: 'unknown',
        electricityType: 'conventional'
      })
    ).toBeCloseTo(0.096710852)
  })
})
