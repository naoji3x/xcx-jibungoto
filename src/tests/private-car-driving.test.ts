import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from '../ts/mobility/private-car-driving'

describe('private car driving', () => {
  test('amount', () => {
    expect(estimatePrivateCarDrivingAmount({ mileage: 10 })).toBeCloseTo(10)
  })

  // case 01
  // gasoline
  // unknown
  // 1
  // unknown
  // => 0.251702294
  test('intensity case 01', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'gasoline',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.251702294)
  })

  // case 03
  // light
  // unknown
  // 1
  // => 0.186998401
  test('intensity case 03', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'light',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.186998401)
  })

  // case 04
  // hv
  // unknown
  // 1
  // =>
  test('intensity case 04', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'hv',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.161309963)
  })

  // case 05
  // phv
  // unknown
  // 1
  // => 0.144787514
  test('intensity case 05', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.144787514)
  })

  // case 06
  // ev
  // unknown
  // 1
  // => 0.133772549
  test('intensity case 06', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.133772549)
  })

  // case 07
  // unknown
  // unknown
  // 1
  // => 0.22060004
  test('intensity case 07', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '1'
      })
    ).toBeCloseTo(0.22060004)
  })

  // case 08
  // unknown
  // unknown
  // 1-2
  // => 0.147066693
  test('intensity case 08', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '1-2'
      })
    ).toBeCloseTo(0.147066693)
  })

  // case 09
  // unknown
  // unknown
  // 2
  // => 0.11030002
  test('intensity case 09', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '2'
      })
    ).toBeCloseTo(0.11030002)
  })

  // case 10
  // unknown
  // unknown
  // 2-3
  // => 0.088240016
  test('intensity case 10', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '2-3'
      })
    ).toBeCloseTo(0.088240016)
  })

  // case 11
  // unknown
  // unknown
  // 3
  // => 0.073533347
  test('intensity case 11', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '3'
      })
    ).toBeCloseTo(0.073533347)
  })

  // case 12
  // unknown
  // unknown
  // 3-4
  // => 0.063028583
  test('intensity case 12', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '3-4'
      })
    ).toBeCloseTo(0.063028583)
  })

  // case 13
  // unknown
  // unknown
  // 4-more
  // => 0.05515001
  test('intensity case 13', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: '4-more'
      })
    ).toBeCloseTo(0.05515001)
  })

  // case 14
  // unknown
  // unknown
  // unknown
  // => 0.168396977
  test('intensity case 14', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'unknown',
        carPassengersFirstKey: 'unknown'
      })
    ).toBeCloseTo(0.168396977)
  })

  // case 15
  // ev
  // charge-almost-at-home
  // 1
  // => 0.133772549
  test('intensity case 15', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1',
        carChargingKey: 'charge-almost-at-home'
      })
    ).toBeCloseTo(0.133772549)
  })

  // case 16
  // ev
  // use-charging-spots-occasionally
  // 1
  // => 0.133772549
  test('intensity case 16', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1',
        carChargingKey: 'use-charging-spots-occasionally'
      })
    ).toBeCloseTo(0.133772549)
  })

  // case 17
  // ev
  // use-charging-spots-sometimes
  // 1
  // => 0.133772549
  test('intensity case 17', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1',
        carChargingKey: 'use-charging-spots-sometimes'
      })
    ).toBeCloseTo(0.133772549)
  })

  // case 18
  // ev
  // use-charging-spots-usually
  // 1
  // => 0.133772549
  test('intensity case 18', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1',
        carChargingKey: 'use-charging-spots-usually'
      })
    ).toBeCloseTo(0.133772549)
  })

  // case 19
  // ev
  // charge-almost-at-home
  // 1
  // 30-renewable
  // => 0.114611753
  test('intensity case 19', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'ev',
        carPassengersFirstKey: '1',
        carChargingKey: 'charge-almost-at-home',
        electricityIntensityKey: '30-renewable'
      })
    ).toBeCloseTo(0.114611753)
  })

  // case 20
  // phv
  // use-charging-spots-occasionally
  // 1-2
  // 50-renewable
  // => 0.082615691
  test('intensity case 19', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1-2',
        carChargingKey: 'use-charging-spots-occasionally',
        electricityIntensityKey: '50-renewable'
      })
    ).toBeCloseTo(0.082615691)
  })

  // case 21
  // phv
  // use-charging-spots-sometimes
  // 1-2
  // 100-renewable
  // => 0.0723966
  test('intensity case 21', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1-2',
        carChargingKey: 'use-charging-spots-sometimes',
        electricityIntensityKey: '100-renewable'
      })
    ).toBeCloseTo(0.0723966)
  })

  // case 22
  // phv
  // use-charging-spots-usually
  // 1-2
  // solar-panel
  // => 0.091875879
  test('intensity case 22', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1-2',
        carChargingKey: 'use-charging-spots-usually',
        electricityIntensityKey: 'solar-panel'
      })
    ).toBeCloseTo(0.091875879)
  })

  // case 23
  // phv
  // unknown
  // 1-2
  // unknown
  // => 0.09652501
  test('intensity case 23', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1-2',
        carChargingKey: 'unknown',
        electricityIntensityKey: 'unknown'
      })
    ).toBeCloseTo(0.09652501)
  })

  // case 24
  // phv
  // unknown
  // 1-2
  // conventional
  // => 0.09652501
  test('intensity case 24', () => {
    expect(
      estimatePrivateCarDrivingIntensity({
        carIntensityFactorFirstKey: 'phv',
        carPassengersFirstKey: '1-2',
        carChargingKey: 'unknown',
        electricityIntensityKey: 'conventional'
      })
    ).toBeCloseTo(0.09652501)
  })
})
