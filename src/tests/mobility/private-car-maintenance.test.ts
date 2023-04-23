import {
  estimatePrivateCarMaintenanceAmount,
  estimatePrivateCarMaintenanceIntensity
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
})
