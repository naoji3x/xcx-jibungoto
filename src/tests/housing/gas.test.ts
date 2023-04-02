import { type GasType, type Month } from '../../ts/common/types'
import {
  estimateGasAnnualAmount,
  estimateGasAnnualFootprint,
  estimateGasIntensity
} from '../../ts/housing/gas'

const testAmount = (
  title: string,
  item: GasType,
  monthlyConsumption: number,
  month: Month,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateGasAnnualAmount(item, {
        monthlyConsumption,
        month,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

const testIntensity = (title: string, item: GasType, value: number): void => {
  test(title, () => {
    expect(estimateGasIntensity(item)).toBeCloseTo(value)
  })
}

const testFootprint = (
  title: string,
  item: GasType,
  monthlyConsumption: number,
  month: Month,
  residentCount: number,
  value: number
): void => {
  test(title, () => {
    expect(
      estimateGasAnnualFootprint(item, {
        monthlyConsumption,
        month,
        residentCount
      })
    ).toBeCloseTo(value)
  })
}

describe('electricity', () => {
  testAmount('amount case 01', 'urban-gas', 15, 'january', 1, 1145.39227)
  testAmount('amount case 02', 'lpg', 15, 'february', 2, 1616.571061)
  testAmount('amount case 03', 'lpg', 15, 'march', 2, 1782.373221)
  testAmount('amount case 04', 'lpg', 15, 'april', 3, 1324.048678)
  testAmount('amount case 05', 'lpg', 15, 'may', 3, 1782.373221)
  testAmount('amount case 06', 'lpg', 15, 'june', 4, 1737.81389)
  testAmount('amount case 07', 'lpg', 15, 'july', 4, 1930.904323)
  testAmount('amount case 08', 'lpg', 15, 'august', 5, 1986.073017)
  testAmount('amount case 09', 'lpg', 15, 'september', 5, 1986.073017)
  testAmount('amount case 10', 'lpg', 15, 'october', 5, 1544.723458)
  testAmount('amount case 11', 'lpg', 15, 'november', 5, 1158.542594)
  testAmount('amount case 12', 'lpg', 15, 'december', 5, 842.5764316)

  testIntensity('intensity case 01', 'urban-gas', 0.310544763)
  testIntensity('intensity case 02', 'lpg', 0.327564907)

  testFootprint(
    'footprint case 01',
    'urban-gas',
    15,
    'january',
    1,
    1145.39227 * 0.310544763
  )
})
