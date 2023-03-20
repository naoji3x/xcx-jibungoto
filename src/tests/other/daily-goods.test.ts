import {
  estimateDailyGoodsAnnualAmount,
  estimateDailyGoodsAnnualFootprint,
  estimateDailyGoodsIntensity
} from '../../ts/other/daily-goods'
import { type DailyGoodsExpenses } from '../../ts/other/types'

describe('daily-goods', () => {
  test('amount case 01', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(26.60361457)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(7.208680982)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(2.187704451)
  })

  test('amount case 02', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-10k',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(66.50903642)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(18.02170245)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(5.469261126)
  })

  test('amount case 03', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '10k-20k',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(133.0180728)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(36.04340491)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(10.93852225)
  })

  test('amount case 04', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '20k-30k',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(221.6967881)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(60.07234151)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(18.23087042)
  })

  test('amount case 05', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '30k-more',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(354.7148609)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(96.11574642)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(29.16939267)
  })

  test('amount case 06', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(31.8821673)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(8.638990484)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(2.621777546)
  })

  test('amount case 08', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(31.8821673)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(8.638990484)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(2.621777546)
  })

  test('amount case 09', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 3
    }
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'sanitation' })
    ).toBeCloseTo(8.867871523)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(2.402893661)
    expect(
      estimateDailyGoodsAnnualAmount({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(0.729234817)
  })

  test('intensity case 01', () => {
    expect(estimateDailyGoodsIntensity({ item: 'sanitation' })).toBeCloseTo(
      3.129136419
    )
    expect(estimateDailyGoodsIntensity({ item: 'kitchen-goods' })).toBeCloseTo(
      3.23125458
    )
    expect(
      estimateDailyGoodsIntensity({ item: 'paper-stationery' })
    ).toBeCloseTo(3.056810847)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(
      estimateDailyGoodsAnnualFootprint({ ...param, item: 'sanitation' })
    ).toBeCloseTo(26.60361457 * 3.129136419)
    expect(
      estimateDailyGoodsAnnualFootprint({ ...param, item: 'kitchen-goods' })
    ).toBeCloseTo(7.208680982 * 3.23125458)
    expect(
      estimateDailyGoodsAnnualFootprint({ ...param, item: 'paper-stationery' })
    ).toBeCloseTo(2.187704451 * 3.056810847)
  })
})
