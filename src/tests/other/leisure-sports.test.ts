import {
  estimateLeisureSportsAnnualAmount,
  estimateLeisureSportsAnnualFootprint,
  estimateLeisureSportsIntensity
} from '../../ts/other/leisure-sports'
import {
  type LeisureSportsItem,
  type LeisureSportsExpenses
} from '../../ts/other/types'

const expectAmount = (
  param: { expenses: LeisureSportsExpenses },
  itemAndValues: Array<{ item: LeisureSportsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateLeisureSportsAnnualAmount({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectFootprint = (
  param: { expenses: LeisureSportsExpenses },
  itemAndValues: Array<{ item: LeisureSportsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateLeisureSportsAnnualFootprint({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: LeisureSportsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateLeisureSportsIntensity({ item: inv.item })).toBeCloseTo(
      inv.value
    )
  }
}

describe('leisure-sports', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less' }, [
      { item: 'culture-leisure', value: 7.476429256 },
      { item: 'entertainment-leisure', value: 6.598602984 },
      { item: 'sports-leisure', value: 12.39693054 },
      { item: 'bath-spa', value: 3.528037218 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k' }, [
      { item: 'culture-leisure', value: 22.42928777 },
      { item: 'entertainment-leisure', value: 19.79580895 },
      { item: 'sports-leisure', value: 37.19079163 },
      { item: 'bath-spa', value: 10.58411165 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k' }, [
      { item: 'culture-leisure', value: 44.85857553 },
      { item: 'entertainment-leisure', value: 39.5916179 },
      { item: 'sports-leisure', value: 74.38158326 },
      { item: 'bath-spa', value: 21.16822331 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-50k' }, [
      { item: 'culture-leisure', value: 104.6700096 },
      { item: 'entertainment-leisure', value: 92.38044177 },
      { item: 'sports-leisure', value: 173.5570276 },
      { item: 'bath-spa', value: 49.39252105 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '50k-more' }, [
      { item: 'culture-leisure', value: 224.2928777 },
      { item: 'entertainment-leisure', value: 197.9580895 },
      { item: 'sports-leisure', value: 371.9079163 },
      { item: 'bath-spa', value: 105.8411165 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown' }, [
      { item: 'culture-leisure', value: 26.18197893 },
      { item: 'entertainment-leisure', value: 23.10788725 },
      { item: 'sports-leisure', value: 43.41326095 },
      { item: 'bath-spa', value: 12.35496157 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'culture-leisure', value: 2.189658709 },
      { item: 'entertainment-leisure', value: 1.973982363 },
      { item: 'sports-leisure', value: 1.703889647 },
      { item: 'bath-spa', value: 5.754233873 }
    ])
  })

  test('footprint case 01', () => {
    expectFootprint({ expenses: '5k-less' }, [
      { item: 'culture-leisure', value: 2.189658709 * 7.476429256 },
      { item: 'entertainment-leisure', value: 1.973982363 * 6.598602984 },
      { item: 'sports-leisure', value: 1.703889647 * 12.39693054 },
      { item: 'bath-spa', value: 5.754233873 * 3.528037218 }
    ])
  })
})
