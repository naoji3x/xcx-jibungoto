import {
  estimateBicycleMaintenanceAnnualAmount,
  estimateBicycleMaintenanceIntensity
} from '../../ts/mobility/bicycle-maintenance'

describe('bicycle-maintenance', () => {
  test('amount case A1', () => {
    expect(
      estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: 'major-city-or-metropolitan-area'
      })
    ).toBeCloseTo(0.482425985)
  })

  test('amount case A2', () => {
    expect(
      estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: 'city-150k-more'
      })
    ).toBeCloseTo(0.399241827)
  })

  test('amount case A3', () => {
    expect(
      estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: 'city-50k-150k'
      })
    ).toBeCloseTo(0.429252268)
  })

  test('amount case A4', () => {
    expect(
      estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: 'area-less-than-50k'
      })
    ).toBeCloseTo(0.240751767)
  })

  test('amount case A5', () => {
    expect(
      estimateBicycleMaintenanceAnnualAmount({
        residentialAreaSize: 'unknown'
      })
    ).toBeCloseTo(0.406667749)
  })

  // case 01: gasoline, unknown, 1, unknown
  test('intensity case 01', () => {
    expect(estimateBicycleMaintenanceIntensity()).toBeCloseTo(2.324385029)
  })
})
