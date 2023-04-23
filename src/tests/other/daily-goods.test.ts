import {
  type DailyGoodsExpenses,
  type DailyGoodsItem
} from '../../ts/common/types'
import {
  estimateDailyGoodsAnnualAmount,
  estimateDailyGoodsIntensity
} from '../../ts/other/daily-goods'

const expectAmount = (
  param: { expenses: DailyGoodsExpenses; residentCount: number },
  itemAndValues: Array<{ item: DailyGoodsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDailyGoodsAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: DailyGoodsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateDailyGoodsIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('daily-goods', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less', residentCount: 1 }, [
      { item: 'sanitation', value: 26.60361457 },
      { item: 'kitchen-goods', value: 7.208680982 },
      { item: 'paper-stationery', value: 2.187704451 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k', residentCount: 1 }, [
      { item: 'sanitation', value: 66.50903642 },
      { item: 'kitchen-goods', value: 18.02170245 },
      { item: 'paper-stationery', value: 5.469261126 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k', residentCount: 1 }, [
      { item: 'sanitation', value: 133.0180728 },
      { item: 'kitchen-goods', value: 36.04340491 },
      { item: 'paper-stationery', value: 10.93852225 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-30k', residentCount: 1 }, [
      { item: 'sanitation', value: 221.6967881 },
      { item: 'kitchen-goods', value: 60.07234151 },
      { item: 'paper-stationery', value: 18.23087042 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '30k-more', residentCount: 1 }, [
      { item: 'sanitation', value: 354.7148609 },
      { item: 'kitchen-goods', value: 96.11574642 },
      { item: 'paper-stationery', value: 29.16939267 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown', residentCount: 1 }, [
      { item: 'sanitation', value: 31.8821673 },
      { item: 'kitchen-goods', value: 8.638990484 },
      { item: 'paper-stationery', value: 2.621777546 }
    ])
  })

  test('amount case 08', () => {
    expectAmount({ expenses: 'unknown', residentCount: 3 }, [
      { item: 'sanitation', value: 31.8821673 },
      { item: 'kitchen-goods', value: 8.638990484 },
      { item: 'paper-stationery', value: 2.621777546 }
    ])
  })

  test('amount case 09', () => {
    expectAmount({ expenses: '5k-less', residentCount: 3 }, [
      { item: 'sanitation', value: 8.867871523 },
      { item: 'kitchen-goods', value: 2.402893661 },
      { item: 'paper-stationery', value: 0.729234817 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'sanitation', value: 3.129136419 },
      { item: 'kitchen-goods', value: 3.23125458 },
      { item: 'paper-stationery', value: 3.056810847 }
    ])
  })
})
