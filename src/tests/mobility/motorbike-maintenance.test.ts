import {
  estimateMotorbikeMaintenanceAnnualAmount,
  estimateMotorbikeMaintenanceIntensity,
  estimateMotorbikeMaintenanceAnnualFootprint
} from '../../ts/mobility/motorbike-maintenance'

describe('motorbike-maintenance', () => {
  test('intensity', () => {
    expect(estimateMotorbikeMaintenanceIntensity()).toBeCloseTo(1.965801837)
  })

  test('amount case 01', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        annualTravelingTime: 2,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(2.35807591)
  })

  test('amount case A1', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(0.297496117)
  })

  test('amount case A2', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(0.568630562)
  })

  test('amount case A3', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(0.464008876)
  })

  test('amount case A4', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(0.475465667)
  })

  test('amount case A5', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(0.446120353)
  })

  test('footprint', () => {
    expect(
      estimateMotorbikeMaintenanceAnnualFootprint({
        annualTravelingTime: 2,
        weeklyTravelingTime: 1
      })
    ).toBeCloseTo(1.965801837 * 2.35807591)
  })
})
