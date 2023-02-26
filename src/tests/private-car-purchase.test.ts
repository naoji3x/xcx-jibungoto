import {
  estimatePrivateCarPurchaseAmount,
  estimatePrivateCarPurchaseIntensity
} from '../ts/mobility/private-car-Purchase'

describe('private car Purchase', () => {
  test('amount', () => {
    expect(
      estimatePrivateCarPurchaseAmount({ annualMileage: 5000 })
    ).toBeCloseTo(0.050106851)
  })

  test('intensity case 01', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'gasoline'
      })
    ).toBeCloseTo(5045.312025)
  })

  test('intensity case 03', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'light'
      })
    ).toBeCloseTo(5045.312025)
  })

  test('intensity case 04', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'hv'
      })
    ).toBeCloseTo(5549.843227)
  })

  test('intensity case 05', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'phv'
      })
    ).toBeCloseTo(8435.515593)
  })

  test('intensity case 06', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'ev'
      })
    ).toBeCloseTo(11321.18796)
  })

  test('intensity case 07', () => {
    expect(
      estimatePrivateCarPurchaseIntensity({
        carType: 'unknown'
      })
    ).toBeCloseTo(5112.506479)
  })
})
