import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateApplianceFurnitureAnnualAmount } from './appliance-furniture'
import { estimateClothesBeautyAnnualAmount } from './clothes-beauty'
import { estimateDailyGoodsAnnualAmount } from './daily-goods'
import { estimateHobbyGoodsAnnualAmount } from './hobby-goods'
import { estimateServiceAnnualAmount } from './service'
import {
  type ApplianceFurnitureExpenses,
  type ClothesBeautyExpenses,
  type HobbyGoodsExpenses,
  type ServiceExpenses,
  type DailyGoodsExpenses,
  type ApplianceFurnitureItem,
  type ClothesBeautyItem,
  type HobbyGoodsItem,
  type ServiceItem,
  type DailyGoodsItem
} from '../common/types'

/*
wasteは以下のitemのestimation合計/baseline合計とwasteのbaseline値を掛け合わせて求める。

'appliance-furniture-amount'
  'cooking-appliances'
  'heating-cooling-appliances'
  'other-appliances'
  'electronics'
  'furniture'
  'covering'
'clothes-beauty-factor'
  'clothes-goods'
  'bags-jewelries-goods'
  'cosmetics'
'hobby-goods-factor'  
  'culture-goods'
  'entertainment-goods'
  'sports-goods'
  'gardening-flower'
  'pet'
  'tobacco'
  'books-magazines'
'service-factor'  
  'medicine'
'daily-goods-amount'  
  'sanitation'
  'kitchen-goods'
  'paper-stationery'
*/

interface WasteAmountParam {
  applianceFurnitureExpenses: ApplianceFurnitureExpenses
  clothesBeautyExpenses: ClothesBeautyExpenses
  hobbyGoodsExpenses: HobbyGoodsExpenses
  serviceExpenses: ServiceExpenses
  dailyGoodsExpenses: DailyGoodsExpenses
  residentCount: number
}

export const estimateWasteAnnualFootprint = ({
  applianceFurnitureExpenses,
  clothesBeautyExpenses,
  hobbyGoodsExpenses,
  serviceExpenses,
  dailyGoodsExpenses,
  residentCount
}: WasteAmountParam): number =>
  estimateWasteAnnualAmount({
    applianceFurnitureExpenses,
    clothesBeautyExpenses,
    hobbyGoodsExpenses,
    serviceExpenses,
    dailyGoodsExpenses,
    residentCount
  }) * estimateWasteIntensity()

export const estimateWasteAnnualAmount = ({
  applianceFurnitureExpenses,
  clothesBeautyExpenses,
  hobbyGoodsExpenses,
  serviceExpenses,
  dailyGoodsExpenses,
  residentCount
}: WasteAmountParam): number => {
  const applianceFurnitureItems: ApplianceFurnitureItem[] = [
    'cooking-appliances',
    'heating-cooling-appliances',
    'other-appliances',
    'electronics',
    'furniture',
    'covering'
  ]

  const clothesBeautyItems: ClothesBeautyItem[] = [
    'clothes-goods',
    'bags-jewelries-goods',
    'cosmetics'
  ]

  const hobbyGoodsItems: HobbyGoodsItem[] = [
    'culture-goods',
    'entertainment-goods',
    'sports-goods',
    'gardening-flower',
    'pet',
    'tobacco',
    'books-magazines'
  ]

  const serviceItems: ServiceItem[] = ['medicine']
  const dailyGoodsItems: DailyGoodsItem[] = [
    'sanitation',
    'kitchen-goods',
    'paper-stationery'
  ]

  const allItems = [
    ...applianceFurnitureItems,
    ...clothesBeautyItems,
    ...hobbyGoodsItems,
    ...serviceItems,
    ...dailyGoodsItems
  ]

  // 分子の計算
  const applianceFurnitureSum = applianceFurnitureItems.reduce(
    (sum, item) =>
      sum +
      estimateApplianceFurnitureAnnualAmount({
        item,
        expenses: applianceFurnitureExpenses,
        residentCount
      }),
    0
  )

  const clothesBeautySum = clothesBeautyItems.reduce(
    (sum, item) =>
      sum +
      estimateClothesBeautyAnnualAmount({
        item,
        expenses: clothesBeautyExpenses
      }),
    0
  )

  const hobbyGoodsSum = hobbyGoodsItems.reduce(
    (sum, item) =>
      sum +
      estimateHobbyGoodsAnnualAmount({
        item,
        expenses: hobbyGoodsExpenses
      }),
    0
  )

  const serviceSum = serviceItems.reduce(
    (sum, item) =>
      sum +
      estimateServiceAnnualAmount({
        item,
        expenses: serviceExpenses
      }),
    0
  )

  const dailyGoodsSum = dailyGoodsItems.reduce(
    (sum, item) =>
      sum +
      estimateDailyGoodsAnnualAmount({
        item,
        expenses: dailyGoodsExpenses,
        residentCount
      }),
    0
  )

  const numerator =
    applianceFurnitureSum +
    clothesBeautySum +
    hobbyGoodsSum +
    serviceSum +
    dailyGoodsSum

  // 分母の計算
  const denominator = allItems.reduce(
    (sum, item) => sum + getBaselineAmount('other', item).value,
    0
  )
  return (getBaselineAmount('other', 'waste').value * numerator) / denominator
}

export const estimateWasteIntensity = (): number =>
  getBaselineIntensity('other', 'waste').value
