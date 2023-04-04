import { type HousingSize } from '../../ts/common/types'
import {
  estimateHousingMaintenanceAnnualAmount,
  estimateHousingMaintenanceAnnualFootprint,
  estimateHousingMaintenanceIntensity
} from '../../ts/housing/housing-maintenance'

const testAmount = (
  title: string,
  housingSize: HousingSize,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateHousingMaintenanceAnnualAmount({
        housingSize,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, value: number): void => {
  test(title, () => {
    expect(estimateHousingMaintenanceIntensity()).toBeCloseTo(value)
  })
}

const testFootprint = (
  title: string,
  housingSize: HousingSize,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateHousingMaintenanceAnnualFootprint({ housingSize, residentCount })
    ).toBeCloseTo(value)
  })
}

describe('housing-maintenance', () => {
  testAmount('amount case 01', '1-room', 1, 22.66022882)
  testAmount('amount case 02', '2-room', 2, 16.99517161)
  testAmount('amount case 03', '3-room', 2, 22.66022882)
  testAmount('amount case 04', '4-room', 3, 22.66022882)
  testAmount('amount case 05', '5-6-room', 3, 30.21363842)
  testAmount('amount case 06', '7-more-room', 4, 33.99034323)
  testAmount('amount case 07', 'unknown', 4, 44.18305217)
  testIntensity('intensity case 01', 1.378245204)
  testFootprint('footprint case 01', '1-room', 1, 22.66022882 * 1.378245204)
})
