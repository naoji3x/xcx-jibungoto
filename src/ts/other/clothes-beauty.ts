import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'
import { type ClothesBeautyItem, type ClothesBeautyExpenses } from './types'

// clothes-beauty

interface ClothesBeautyIntensityParam {
  item: ClothesBeautyItem
}

interface ClothesBeautyAmountParam extends ClothesBeautyIntensityParam {
  expenses: ClothesBeautyExpenses
}

export const estimateClothesBeautyAnnualFootprint = ({
  item,
  expenses
}: ClothesBeautyAmountParam): number =>
  estimateClothesBeautyAnnualAmount({ item, expenses }) *
  estimateClothesBeautyIntensity({ item })

export const estimateClothesBeautyAnnualAmount = ({
  item,
  expenses
}: ClothesBeautyAmountParam): number =>
  estimateAnnualAmount(item, 'clothes-beauty-factor', expenses)

export const estimateClothesBeautyIntensity = ({
  item
}: ClothesBeautyIntensityParam): number =>
  getBaselineIntensity('other', item).value
