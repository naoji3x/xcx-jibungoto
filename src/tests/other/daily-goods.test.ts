import {
  estimateSanitationAnnualAmount,
  estimateSanitationAnnualFootprint,
  estimateSanitationIntensity
} from '../../ts/other/sanitation'
import {
  estimateKitchenGoodsAnnualAmount,
  estimateKitchenGoodsAnnualFootprint,
  estimateKitchenGoodsIntensity
} from '../../ts/other/kitchen-goods'
import {
  estimatePaperStationeryAnnualAmount,
  estimatePaperStationeryAnnualFootprint,
  estimatePaperStationeryIntensity
} from '../../ts/other/paper-stationery'
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
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(26.60361457)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(7.208680982)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(2.187704451)
  })

  test('amount case 02', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-10k',
      residentCount: 1
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(66.50903642)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(18.02170245)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(5.469261126)
  })

  test('amount case 03', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '10k-20k',
      residentCount: 1
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(133.0180728)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(36.04340491)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(10.93852225)
  })

  test('amount case 04', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '20k-30k',
      residentCount: 1
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(221.6967881)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(60.07234151)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(18.23087042)
  })

  test('amount case 05', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '30k-more',
      residentCount: 1
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(354.7148609)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(96.11574642)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(29.16939267)
  })

  test('amount case 06', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(31.8821673)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(8.638990484)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(2.621777546)
  })

  test('amount case 08', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(31.8821673)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(8.638990484)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(2.621777546)
  })

  test('amount case 09', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 3
    }
    expect(estimateSanitationAnnualAmount(param)).toBeCloseTo(8.867871523)
    expect(estimateKitchenGoodsAnnualAmount(param)).toBeCloseTo(2.402893661)
    expect(estimatePaperStationeryAnnualAmount(param)).toBeCloseTo(0.729234817)
  })

  test('intensity case 01', () => {
    expect(estimateSanitationIntensity()).toBeCloseTo(3.129136419)
    expect(estimateKitchenGoodsIntensity()).toBeCloseTo(3.23125458)
    expect(estimatePaperStationeryIntensity()).toBeCloseTo(3.056810847)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: DailyGoodsExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(estimateSanitationAnnualFootprint(param)).toBeCloseTo(
      26.60361457 * 3.129136419
    )
    expect(estimateKitchenGoodsAnnualFootprint(param)).toBeCloseTo(
      7.208680982 * 3.23125458
    )
    expect(estimatePaperStationeryAnnualFootprint(param)).toBeCloseTo(
      2.187704451 * 3.056810847
    )
  })
})
