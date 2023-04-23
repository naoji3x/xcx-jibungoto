import {
  type ApplianceFurnitureExpenses,
  type ApplianceFurnitureItem
} from '../../ts/common/types'
import {
  estimateApplianceFurnitureAnnualAmount,
  estimateApplianceFurnitureAnnualFootprint,
  estimateApplianceFurnitureIntensity
} from '../../ts/other/appliance-furniture'

const expectAmount = (
  param: { expenses: ApplianceFurnitureExpenses; residentCount: number },
  itemAndValues: Array<{ item: ApplianceFurnitureItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateApplianceFurnitureAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectFootprint = (
  param: { expenses: ApplianceFurnitureExpenses; residentCount: number },
  itemAndValues: Array<{ item: ApplianceFurnitureItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateApplianceFurnitureAnnualFootprint(inv.item, param)
    ).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: ApplianceFurnitureItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateApplianceFurnitureIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('appliance-furniture', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '50k-less', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 0.273075511 },
      { item: 'furniture-daily-goods-repair-rental', value: 0.879636251 },
      { item: 'cooking-appliances', value: 3.378927229 },
      { item: 'heating-cooling-appliances', value: 3.873104143 },
      { item: 'other-appliances', value: 3.644563112 },
      { item: 'electronics', value: 8.140149492 },
      { item: 'furniture', value: 2.033537824 },
      { item: 'covering', value: 2.777006438 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '50k-100k', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 0.819226533 },
      { item: 'furniture-daily-goods-repair-rental', value: 2.638908754 },
      { item: 'cooking-appliances', value: 10.13678169 },
      { item: 'heating-cooling-appliances', value: 11.61931243 },
      { item: 'other-appliances', value: 10.93368934 },
      { item: 'electronics', value: 24.42044847 },
      { item: 'furniture', value: 6.100613473 },
      { item: 'covering', value: 8.331019313 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '100k-200k', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 1.638453066 },
      { item: 'furniture-daily-goods-repair-rental', value: 5.277817508 },
      { item: 'cooking-appliances', value: 20.27356337 },
      { item: 'heating-cooling-appliances', value: 23.23862486 },
      { item: 'other-appliances', value: 21.86737867 },
      { item: 'electronics', value: 48.84089695 },
      { item: 'furniture', value: 12.20122695 },
      { item: 'covering', value: 16.66203863 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '200k-300k', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 2.730755111 },
      { item: 'furniture-daily-goods-repair-rental', value: 8.796362514 },
      { item: 'cooking-appliances', value: 33.78927229 },
      { item: 'heating-cooling-appliances', value: 38.73104143 },
      { item: 'other-appliances', value: 36.44563112 },
      { item: 'electronics', value: 81.40149492 },
      { item: 'furniture', value: 20.33537824 },
      { item: 'covering', value: 27.77006438 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '300k-400k', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 3.823057155 },
      { item: 'furniture-daily-goods-repair-rental', value: 12.31490752 },
      { item: 'cooking-appliances', value: 47.3049812 },
      { item: 'heating-cooling-appliances', value: 54.223458 },
      { item: 'other-appliances', value: 51.02388357 },
      { item: 'electronics', value: 113.9620929 },
      { item: 'furniture', value: 28.46952954 },
      { item: 'covering', value: 38.87809013 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: '400k-more', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 5.461510221 },
      { item: 'furniture-daily-goods-repair-rental', value: 17.59272503 },
      { item: 'cooking-appliances', value: 67.57854458 },
      { item: 'heating-cooling-appliances', value: 77.46208286 },
      { item: 'other-appliances', value: 72.89126224 },
      { item: 'electronics', value: 162.8029898 },
      { item: 'furniture', value: 40.67075648 },
      { item: 'covering', value: 55.54012875 }
    ])
  })

  test('amount case 07', () => {
    expectAmount({ expenses: 'unknown', residentCount: 1 }, [
      { item: 'electrical-appliances-repair-rental', value: 0.873530497 },
      { item: 'furniture-daily-goods-repair-rental', value: 2.813833758 },
      { item: 'cooking-appliances', value: 10.80871722 },
      { item: 'heating-cooling-appliances', value: 12.38952029 },
      { item: 'other-appliances', value: 11.65844939 },
      { item: 'electronics', value: 26.03920359 },
      { item: 'furniture', value: 6.50500405 },
      { item: 'covering', value: 8.883256514 }
    ])
  })

  test('amount case 08', () => {
    expectAmount({ expenses: 'unknown', residentCount: 3 }, [
      { item: 'electrical-appliances-repair-rental', value: 0.873530497 },
      { item: 'furniture-daily-goods-repair-rental', value: 2.813833758 },
      { item: 'cooking-appliances', value: 10.80871722 },
      { item: 'heating-cooling-appliances', value: 12.38952029 },
      { item: 'other-appliances', value: 11.65844939 },
      { item: 'electronics', value: 26.03920359 },
      { item: 'furniture', value: 6.50500405 },
      { item: 'covering', value: 8.883256514 }
    ])
  })

  test('amount case 09', () => {
    expectAmount({ expenses: '50k-less', residentCount: 3 }, [
      { item: 'electrical-appliances-repair-rental', value: 0.09102517 },
      { item: 'furniture-daily-goods-repair-rental', value: 0.293212084 },
      { item: 'cooking-appliances', value: 1.126309076 },
      { item: 'heating-cooling-appliances', value: 1.291034714 },
      { item: 'other-appliances', value: 1.214854371 },
      { item: 'electronics', value: 2.713383164 },
      { item: 'furniture', value: 0.677845941 },
      { item: 'covering', value: 0.925668813 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'electrical-appliances-repair-rental', value: 1.953281338 },
      { item: 'furniture-daily-goods-repair-rental', value: 1.799958663 },
      { item: 'cooking-appliances', value: 2.852827088 },
      { item: 'heating-cooling-appliances', value: 7.449174796 },
      { item: 'other-appliances', value: 2.750735655 },
      { item: 'electronics', value: 2.274573158 },
      { item: 'furniture', value: 2.207048567 },
      { item: 'covering', value: 2.512668069 }
    ])
  })

  test('footprint case 01', () => {
    expectFootprint({ expenses: '50k-less', residentCount: 1 }, [
      {
        item: 'electrical-appliances-repair-rental',
        value: 0.273075511 * 1.953281338
      },
      {
        item: 'furniture-daily-goods-repair-rental',
        value: 0.879636251 * 1.799958663
      },
      { item: 'cooking-appliances', value: 3.378927229 * 2.852827088 },
      { item: 'heating-cooling-appliances', value: 3.873104143 * 7.449174796 },
      { item: 'other-appliances', value: 3.644563112 * 2.750735655 },
      { item: 'electronics', value: 8.140149492 * 2.274573158 },
      { item: 'furniture', value: 2.033537824 * 2.207048567 },
      { item: 'covering', value: 2.777006438 * 2.512668069 }
    ])
  })
})
