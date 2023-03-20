import {
  estimateApplianceFurnitureAnnualAmount,
  estimateApplianceFurnitureAnnualFootprint,
  estimateApplianceFurnitureIntensity
} from '../../ts/other/appliance-furniture'
import { type ApplianceFurnitureExpenses } from '../../ts/other/types'

describe('appliance-furniture', () => {
  test('amount case 01', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.273075511)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(0.879636251)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(3.378927229)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(3.873104143)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(3.644563112)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(8.140149492)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(2.033537824)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(2.777006438)
  })

  test('amount case 02', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-100k',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.819226533)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(2.638908754)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(10.13678169)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(11.61931243)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(10.93368934)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(24.42044847)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(6.100613473)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(8.331019313)
  })

  test('amount case 03', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '100k-200k',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(1.638453066)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(5.277817508)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(20.27356337)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(23.23862486)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(21.86737867)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(48.84089695)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(12.20122695)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(16.66203863)
  })

  test('amount case 04', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '200k-300k',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(2.730755111)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(8.796362514)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(33.78927229)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(38.73104143)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(36.44563112)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(81.40149492)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(20.33537824)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(27.77006438)
  })

  test('amount case 05', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '300k-400k',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(3.823057155)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(12.31490752)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(47.3049812)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(54.223458)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(51.02388357)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(113.9620929)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(28.46952954)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(38.87809013)
  })

  test('amount case 06', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '400k-more',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(5.461510221)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(17.59272503)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(67.57854458)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(77.46208286)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(72.89126224)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(162.8029898)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(40.67075648)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(55.54012875)
  })

  test('amount case 07', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.873530497)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(2.813833758)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(10.80871722)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(12.38952029)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(11.65844939)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(26.03920359)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(6.50500405)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(8.883256514)
  })

  test('amount case 08', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.873530497)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(2.813833758)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(10.80871722)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(12.38952029)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(11.65844939)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(26.03920359)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(6.50500405)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(8.883256514)
  })

  test('amount case 09', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 3
    }
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.09102517)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(0.293212084)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(1.126309076)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(1.291034714)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(1.214854371)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(2.713383164)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(0.677845941)
    expect(
      estimateApplianceFurnitureAnnualAmount({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(0.925668813)
  })

  test('intensity case 01', () => {
    expect(
      estimateApplianceFurnitureIntensity({
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(1.953281338)
    expect(
      estimateApplianceFurnitureIntensity({
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(1.799958663)
    expect(
      estimateApplianceFurnitureIntensity({ item: 'cooking-appliances' })
    ).toBeCloseTo(2.852827088)
    expect(
      estimateApplianceFurnitureIntensity({
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(7.449174796)
    expect(
      estimateApplianceFurnitureIntensity({ item: 'other-appliances' })
    ).toBeCloseTo(2.750735655)
    expect(
      estimateApplianceFurnitureIntensity({ item: 'electronics' })
    ).toBeCloseTo(2.274573158)
    expect(
      estimateApplianceFurnitureIntensity({ item: 'furniture' })
    ).toBeCloseTo(2.207048567)
    expect(
      estimateApplianceFurnitureIntensity({ item: 'covering' })
    ).toBeCloseTo(2.512668069)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 1
    }
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'electrical-appliances-repair-rental'
      })
    ).toBeCloseTo(0.273075511 * 1.953281338)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'furniture-daily-goods-repair-rental'
      })
    ).toBeCloseTo(0.879636251 * 1.799958663)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'cooking-appliances'
      })
    ).toBeCloseTo(3.378927229 * 2.852827088)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'heating-cooling-appliances'
      })
    ).toBeCloseTo(3.873104143 * 7.449174796)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'other-appliances'
      })
    ).toBeCloseTo(3.644563112 * 2.750735655)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'electronics'
      })
    ).toBeCloseTo(8.140149492 * 2.274573158)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'furniture'
      })
    ).toBeCloseTo(2.033537824 * 2.207048567)
    expect(
      estimateApplianceFurnitureAnnualFootprint({
        ...param,
        item: 'covering'
      })
    ).toBeCloseTo(2.777006438 * 2.512668069)
  })
})
