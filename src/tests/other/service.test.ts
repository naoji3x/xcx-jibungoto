import {
  estimateServiceAnnualAmount,
  estimateServiceAnnualFootprint,
  estimateServiceIntensity
} from '../../ts/other/service'
import { type ServiceItem, type ServiceExpenses } from '../../ts/common/types'

const expectAmount = (
  param: { expenses: ServiceExpenses },
  itemAndValues: Array<{ item: ServiceItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateServiceAnnualAmount({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectFootprint = (
  param: { expenses: ServiceExpenses },
  itemAndValues: Array<{ item: ServiceItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateServiceAnnualFootprint({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: ServiceItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateServiceIntensity({ item: inv.item })).toBeCloseTo(inv.value)
  }
}

describe('service', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less' }, [
      { item: 'medicine', value: 5.343035666 },
      { item: 'housework', value: 0.194589204 },
      { item: 'washing', value: 0.762378308 },
      { item: 'medical-care', value: 20.7986888 },
      { item: 'nursing', value: 1.196397185 },
      { item: 'caring', value: 1.141364888 },
      { item: 'formal-education', value: 8.60236983 },
      { item: 'informal-education', value: 3.961176123 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k' }, [
      { item: 'medicine', value: 11.44936214 },
      { item: 'housework', value: 0.416976865 },
      { item: 'washing', value: 1.633667804 },
      { item: 'medical-care', value: 44.56861885 },
      { item: 'nursing', value: 2.563708253 },
      { item: 'caring', value: 2.445781904 },
      { item: 'formal-education', value: 18.43364964 },
      { item: 'informal-education', value: 8.488234549 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k' }, [
      { item: 'medicine', value: 22.89872428 },
      { item: 'housework', value: 0.833953731 },
      { item: 'washing', value: 3.267335607 },
      { item: 'medical-care', value: 89.1372377 },
      { item: 'nursing', value: 5.127416506 },
      { item: 'caring', value: 4.891563808 },
      { item: 'formal-education', value: 36.86729927 },
      { item: 'informal-education', value: 16.9764691 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-50k' }, [
      { item: 'medicine', value: 53.43035666 },
      { item: 'housework', value: 1.945892038 },
      { item: 'washing', value: 7.623783083 },
      { item: 'medical-care', value: 207.986888 },
      { item: 'nursing', value: 11.96397185 },
      { item: 'caring', value: 11.41364888 },
      { item: 'formal-education', value: 86.0236983 },
      { item: 'informal-education', value: 39.61176123 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '50k-more' }, [
      { item: 'medicine', value: 114.4936214 },
      { item: 'housework', value: 4.169768653 },
      { item: 'washing', value: 16.33667804 },
      { item: 'medical-care', value: 445.6861885 },
      { item: 'nursing', value: 25.63708253 },
      { item: 'caring', value: 24.45781904 },
      { item: 'formal-education', value: 184.3364964 },
      { item: 'informal-education', value: 84.88234549 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown' }, [
      { item: 'medicine', value: 20.34191228 },
      { item: 'housework', value: 0.740836626 },
      { item: 'washing', value: 2.902513411 },
      { item: 'medical-care', value: 79.18440556 },
      { item: 'nursing', value: 4.554902514 },
      { item: 'caring', value: 4.345384515 },
      { item: 'formal-education', value: 32.75079252 },
      { item: 'informal-education', value: 15.08092071 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'medicine', value: 2.132542476 },
      { item: 'housework', value: 1.215004276 },
      { item: 'washing', value: 2.437149813 },
      { item: 'medical-care', value: 1.169394129 },
      { item: 'nursing', value: 1.209159482 },
      { item: 'caring', value: 1.283734545 },
      { item: 'formal-education', value: 1.074215614 },
      { item: 'informal-education', value: 1.21314144 }
    ])
  })

  test('footprint case 01', () => {
    expectFootprint({ expenses: '5k-less' }, [
      { item: 'medicine', value: 2.132542476 * 5.343035666 },
      { item: 'housework', value: 1.215004276 * 0.194589204 },
      { item: 'washing', value: 2.437149813 * 0.762378308 },
      { item: 'medical-care', value: 1.169394129 * 20.7986888 },
      { item: 'nursing', value: 1.209159482 * 1.196397185 },
      { item: 'caring', value: 1.283734545 * 1.141364888 },
      { item: 'formal-education', value: 1.074215614 * 8.60236983 },
      { item: 'informal-education', value: 1.21314144 * 3.961176123 }
    ])
  })
})
