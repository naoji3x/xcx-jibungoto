import {
  type ApplianceFurnitureExpenses,
  type ClothesBeautyExpenses,
  type DailyGoodsExpenses,
  type HobbyGoodsExpenses,
  type ServiceExpenses
} from '../../ts/common/types'
import {
  estimateWasteAnnualAmount,
  estimateWasteAnnualFootprint,
  estimateWasteIntensity
} from '../../ts/other/waste'

const expectAmount = (
  param: {
    applianceFurnitureExpenses: ApplianceFurnitureExpenses
    clothesBeautyExpenses: ClothesBeautyExpenses
    hobbyGoodsExpenses: HobbyGoodsExpenses
    serviceExpenses: ServiceExpenses
    dailyGoodsExpenses: DailyGoodsExpenses
    residentCount: number
  },
  value: number
): void => {
  expect(estimateWasteAnnualAmount(param)).toBeCloseTo(value)
}

const expectFootprint = (
  param: {
    applianceFurnitureExpenses: ApplianceFurnitureExpenses
    clothesBeautyExpenses: ClothesBeautyExpenses
    hobbyGoodsExpenses: HobbyGoodsExpenses
    serviceExpenses: ServiceExpenses
    dailyGoodsExpenses: DailyGoodsExpenses
    residentCount: number
  },
  value: number
): void => {
  expect(estimateWasteAnnualFootprint(param)).toBeCloseTo(value)
}

const expectIntensity = (value: number): void => {
  expect(estimateWasteIntensity()).toBeCloseTo(value)
}

describe('waste', () => {
  test('amount case 01', () => {
    expectAmount(
      {
        applianceFurnitureExpenses: '50k-less',
        clothesBeautyExpenses: '5k-less',
        hobbyGoodsExpenses: '5k-less',
        serviceExpenses: '5k-less',
        dailyGoodsExpenses: '5k-less',
        residentCount: 1
      },
      1.216296495
    )
  })

  test('amount case 06', () => {
    expectAmount(
      {
        applianceFurnitureExpenses: '400k-more',
        clothesBeautyExpenses: 'unknown',
        hobbyGoodsExpenses: 'unknown',
        serviceExpenses: 'unknown',
        dailyGoodsExpenses: 'unknown',
        residentCount: 1
      },
      6.781335568
    )
  })

  test('amount case 08', () => {
    expectAmount(
      {
        applianceFurnitureExpenses: 'unknown',
        clothesBeautyExpenses: 'unknown',
        hobbyGoodsExpenses: 'unknown',
        serviceExpenses: 'unknown',
        dailyGoodsExpenses: 'unknown',
        residentCount: 3
      },
      3.123482434
    )
  })

  test('intensity case 01', () => {
    expectIntensity(8.586030351)
  })

  test('footprint case 01', () => {
    expectFootprint(
      {
        applianceFurnitureExpenses: '50k-less',
        clothesBeautyExpenses: '5k-less',
        hobbyGoodsExpenses: '5k-less',
        serviceExpenses: '5k-less',
        dailyGoodsExpenses: '5k-less',
        residentCount: 1
      },
      1.216296495 * 8.586030351
    )
  })
})
