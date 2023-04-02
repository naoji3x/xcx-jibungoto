import {
  estimateClothesBeautyAnnualAmount,
  estimateClothesBeautyAnnualFootprint,
  estimateClothesBeautyIntensity
} from '../../ts/other/clothes-beauty'
import {
  type ClothesBeautyItem,
  type ClothesBeautyExpenses
} from '../../ts/common/types'

const expectAmount = (
  param: { expenses: ClothesBeautyExpenses },
  itemAndValues: Array<{ item: ClothesBeautyItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateClothesBeautyAnnualAmount({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectFootprint = (
  param: { expenses: ClothesBeautyExpenses },
  itemAndValues: Array<{ item: ClothesBeautyItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(
      estimateClothesBeautyAnnualFootprint({ ...param, item: inv.item })
    ).toBeCloseTo(inv.value)
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: ClothesBeautyItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateClothesBeautyIntensity({ item: inv.item })).toBeCloseTo(
      inv.value
    )
  }
}

describe('clothes-beauty', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less' }, [
      { item: 'haircare', value: 2.25947579 },
      { item: 'cosmetics', value: 3.638798193 },
      { item: 'clothes-goods', value: 24.64267084 },
      { item: 'bags-jewelries-goods', value: 4.240625735 },
      { item: 'clothes-repair-rental', value: 0.354123427 },
      { item: 'bags-jewelries-repair-rental', value: 0.112857589 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k' }, [
      { item: 'haircare', value: 5.648689476 },
      { item: 'cosmetics', value: 9.096995483 },
      { item: 'clothes-goods', value: 61.60667711 },
      { item: 'bags-jewelries-goods', value: 10.60156434 },
      { item: 'clothes-repair-rental', value: 0.885308568 },
      { item: 'bags-jewelries-repair-rental', value: 0.282143973 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k' }, [
      { item: 'haircare', value: 11.29737895 },
      { item: 'cosmetics', value: 18.19399097 },
      { item: 'clothes-goods', value: 123.2133542 },
      { item: 'bags-jewelries-goods', value: 21.20312868 },
      { item: 'clothes-repair-rental', value: 1.770617135 },
      { item: 'bags-jewelries-repair-rental', value: 0.564287947 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-50k' }, [
      { item: 'haircare', value: 26.36055089 },
      { item: 'cosmetics', value: 42.45264559 },
      { item: 'clothes-goods', value: 287.4978265 },
      { item: 'bags-jewelries-goods', value: 49.47396691 },
      { item: 'clothes-repair-rental', value: 4.131439982 },
      { item: 'bags-jewelries-repair-rental', value: 1.316671876 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '50k-more' }, [
      { item: 'haircare', value: 45.18951581 },
      { item: 'cosmetics', value: 72.77596386 },
      { item: 'clothes-goods', value: 492.8534169 },
      { item: 'bags-jewelries-goods', value: 84.8125147 },
      { item: 'clothes-repair-rental', value: 7.082468541 },
      { item: 'bags-jewelries-repair-rental', value: 2.257151788 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown' }, [
      { item: 'haircare', value: 8.727357202 },
      { item: 'cosmetics', value: 14.05507054 },
      { item: 'clothes-goods', value: 95.18375535 },
      { item: 'bags-jewelries-goods', value: 16.37966457 },
      { item: 'clothes-repair-rental', value: 1.367822419 },
      { item: 'bags-jewelries-repair-rental', value: 0.43591903 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'haircare', value: 1.712161189 },
      { item: 'cosmetics', value: 2.276312315 },
      { item: 'clothes-goods', value: 2.670916765 },
      { item: 'bags-jewelries-goods', value: 2.558629508 },
      { item: 'clothes-repair-rental', value: 1.021369922 },
      { item: 'bags-jewelries-repair-rental', value: 1.106075818 }
    ])
  })

  test('footprint case 01', () => {
    expectFootprint({ expenses: '5k-less' }, [
      { item: 'haircare', value: 1.712161189 * 2.25947579 },
      { item: 'cosmetics', value: 2.276312315 * 3.638798193 },
      { item: 'clothes-goods', value: 2.670916765 * 24.64267084 },
      { item: 'bags-jewelries-goods', value: 2.558629508 * 4.240625735 },
      { item: 'clothes-repair-rental', value: 1.021369922 * 0.354123427 },
      { item: 'bags-jewelries-repair-rental', value: 1.106075818 * 0.112857589 }
    ])
  })
})
