import {
  type CarCharging,
  type CarType,
  type ElectricityType,
  type Month
} from '../../ts/common/types'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityAnnualFootprint,
  estimateElectricityIntensity
} from '../../ts/housing/electricity'

const testAmount = (
  title: string,
  monthlyConsumption: number,
  month: Month,
  residentCount: number,
  value: number,
  privateCar?: {
    carType: CarType
    annualMileage: number
    carCharging: CarCharging
  }
): void => {
  test(title, () => {
    expect(
      estimateElectricityAnnualAmount({
        monthlyConsumption,
        month,
        residentCount,
        privateCar
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (
  title: string,
  electricity: ElectricityType,
  value: number
): void => {
  test(title, () => {
    expect(estimateElectricityIntensity({ electricity })).toBeCloseTo(value)
  })
}

const testFootprint = (
  title: string,
  monthlyConsumption: number,
  month: Month,
  residentCount: number,
  electricity: ElectricityType,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateElectricityAnnualFootprint({
        monthlyConsumption,
        month,
        residentCount,
        electricity
      })
    ).toBeCloseTo(value)
  })
}

describe('electricity', () => {
  testAmount('amount case 01', 750, 'january', 1, 6866.523785)
  testAmount('amount case 02', 750, 'february', 2, 3345.311464)
  testAmount('amount case 03', 750, 'march', 2, 3437.059153)
  testAmount('amount case 04', 750, 'april', 3, 2703.493365)
  testAmount('amount case 05', 750, 'may', 3, 3238.582126)
  testAmount('amount case 06', 750, 'june', 4, 2810.370021)
  testAmount('amount case 07', 750, 'july', 4, 2898.835737)
  testAmount('amount case 08', 750, 'august', 5, 1965.985771)
  testAmount('amount case 09', 750, 'september', 5, 1967.129894)
  testAmount('amount case 10', 750, 'october', 5, 2187.393459)
  testAmount('amount case 11', 750, 'november', 5, 2207.259035)
  testAmount('amount case 12', 750, 'december', 5, 1888.607441)

  testAmount('amount case 16', 750, 'february', 2, 2922.105357, {
    carType: 'ev',
    annualMileage: 5500,
    carCharging: 'charge-almost-at-home'
  })
  testAmount('amount case 17', 750, 'february', 2, 3147.81528, {
    carType: 'phv',
    annualMileage: 5500,
    carCharging: 'use-charging-spots-occasionally'
  })
  testAmount('amount case 18', 750, 'february', 3, 2089.13894, {
    carType: 'phv',
    annualMileage: 5500,
    carCharging: 'use-charging-spots-sometimes'
  })
  testAmount('amount case 19', 750, 'february', 3, 2201.993902, {
    carType: 'phv',
    annualMileage: 5500,
    carCharging: 'use-charging-spots-usually'
  })
  testAmount('amount case 20', 750, 'february', 3, 2032.711459, {
    carType: 'phv',
    annualMileage: 5500,
    carCharging: 'unknown'
  })

  testIntensity('intensity case 01', 'conventional', 0.634319811)
  testIntensity('intensity case 02', '30-renewable', 0.53349389)
  testIntensity('intensity case 03', '50-renewable', 0.399059329)
  testIntensity('intensity case 04', '100-renewable', 0.062972926)
  testIntensity('intensity case 05', 'solar-panel', 0.042861845)
  testIntensity('intensity case 06', 'unknown', 0.634319811)

  testFootprint(
    'footprint case 01',
    750,
    'january',
    1,
    'conventional',
    6866.523785 * 0.634319811
  )
})
