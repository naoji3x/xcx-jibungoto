import {
  estimatePrivateCarMaintenanceAmount,
  estimatePrivateCarMaintenanceIntensity,
  estimatePrivateCarMaintenanceFootprint
} from '../../ts/mobility/private-car-maintenance'

describe('PrivateCarMaintenance', () => {
  test('intensity', () => {
    expect(estimatePrivateCarMaintenanceIntensity()).toBeCloseTo(1.648088312)
  })

  test('amount case 01', () => {
    expect(
      estimatePrivateCarMaintenanceAmount({
        annualMileage: 5000
      })
    ).toBeCloseTo(64.17671714)
  })

  test('footprint', () => {
    expect(
      estimatePrivateCarMaintenanceFootprint({
        annualMileage: 5000
      })
    ).toBeCloseTo(1.648088312 * 64.17671714)
  })
})
