import {
  type ApplianceFurnitureExpenses,
  type ApplianceFurnitureItem,
  type ClothesBeautyExpenses,
  type ClothesBeautyItem,
  type DailyGoodsExpenses,
  type DailyGoodsItem,
  type HobbyGoodsExpenses,
  type HobbyGoodsItem,
  type ServiceExpenses,
  type ServiceItem
} from '../common/types'
import { getBaselineAmount, getBaselineIntensity } from '../data/database'
import { estimateApplianceFurnitureAnnualAmount } from './appliance-furniture'
import { estimateClothesBeautyAnnualAmount } from './clothes-beauty'
import { estimateDailyGoodsAnnualAmount } from './daily-goods'
import { estimateHobbyGoodsAnnualAmount } from './hobby-goods'
import { estimateServiceAnnualAmount } from './service'

/** 廃棄の活動量を計算するための引数 */
interface WasteAmountParam {
  /** 家電・家具の支出 */
  applianceFurnitureExpenses: ApplianceFurnitureExpenses
  /** 衣服・美容の支出 */
  clothesBeautyExpenses: ClothesBeautyExpenses
  /** 趣味・日用品の支出 */
  hobbyGoodsExpenses: HobbyGoodsExpenses
  /** サービスの支出 */
  serviceExpenses: ServiceExpenses
  /** 日用品の支出 */
  dailyGoodsExpenses: DailyGoodsExpenses
  /** 居住者数 */
  residentCount: number
}

/**
 * 廃棄の活動量を計算する
 * @remarks
 * wasteは以下のitemのestimation合計/baseline合計とwasteのbaseline値を掛け合わせて求める。
 * - appliance-furniture-amount
 *   - cooking-appliances
 *   - heating-cooling-appliances
 *   - other-appliances
 *   - electronics
 *   - furniture
 *   - covering
 * - clothes-beauty-factor
 *   - clothes-goods
 * - bags-jewelries-goods
 *   - cosmetics
 * - hobby-goods-factor
 *   - culture-goods
 *   - entertainment-goods
 *   - sports-goods
 *   - gardening-flower
 *   - pet
 *   - tobacco
  'books-magazines'
'service-factor'  
  'medicine'
'daily-goods-amount'  
  'sanitation'
  'kitchen-goods'
  'paper-stationery'
 * @param param 廃棄の活動量を計算するための引数
 * @returns 廃棄の活動量[000JPY]
 */
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
      estimateApplianceFurnitureAnnualAmount(item, {
        expenses: applianceFurnitureExpenses,
        residentCount
      }),
    0
  )

  const clothesBeautySum = clothesBeautyItems.reduce(
    (sum, item) =>
      sum +
      estimateClothesBeautyAnnualAmount(item, {
        expenses: clothesBeautyExpenses
      }),
    0
  )

  const hobbyGoodsSum = hobbyGoodsItems.reduce(
    (sum, item) =>
      sum +
      estimateHobbyGoodsAnnualAmount(item, {
        expenses: hobbyGoodsExpenses
      }),
    0
  )

  const serviceSum = serviceItems.reduce(
    (sum, item) =>
      sum +
      estimateServiceAnnualAmount(item, {
        expenses: serviceExpenses
      }),
    0
  )

  const dailyGoodsSum = dailyGoodsItems.reduce(
    (sum, item) =>
      sum +
      estimateDailyGoodsAnnualAmount(item, {
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

/**
 * 廃棄のGHG原単位を計算する
 * @returns 廃棄のGHG原単位[kgCO2e/000JPY]
 */
export const estimateWasteIntensity = (): number =>
  getBaselineIntensity('other', 'waste').value
