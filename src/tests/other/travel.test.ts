import { type TravelExpenses, type TravelItem } from '../../ts/common/types'
import {
  estimateTravelAnnualAmount,
  estimateTravelIntensity
} from '../../ts/other/travel'

const expectAmount = (
  param: { expenses: TravelExpenses },
  itemAndValues: Array<{ item: TravelItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateTravelAnnualAmount(inv.item, param)).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: TravelItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateTravelIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('travel', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '10k-less' }, [
      { item: 'hotel', value: 4.206479354 },
      { item: 'travel', value: 0.793520646 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '10k-30k' }, [
      { item: 'hotel', value: 16.82591742 },
      { item: 'travel', value: 3.174082584 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '30k-50k' }, [
      { item: 'hotel', value: 33.65183483 },
      { item: 'travel', value: 6.348165168 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '50k-100k' }, [
      { item: 'hotel', value: 63.09719031 },
      { item: 'travel', value: 11.90280969 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '100k-200k' }, [
      { item: 'hotel', value: 126.1943806 },
      { item: 'travel', value: 23.80561938 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: '200k-more' }, [
      { item: 'hotel', value: 252.3887612 },
      { item: 'travel', value: 47.61123876 }
    ])
  })
  test('amount case 07', () => {
    expectAmount({ expenses: 'unknown' }, [
      { item: 'hotel', value: 23.67949431 },
      { item: 'travel', value: 4.466958243 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'hotel', value: 3.770333888 },
      { item: 'travel', value: 0.653433284 }
    ])
  })
})
