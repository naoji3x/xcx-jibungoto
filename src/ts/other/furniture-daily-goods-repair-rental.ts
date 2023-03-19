import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type ApplianceFurnitureExpenses } from './types'

interface FurnitureDailyGoodsRepairRentalParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateFurnitureDailyGoodsRepairRentalAnnualFootprint = ({
  expenses,
  residentCount
}: FurnitureDailyGoodsRepairRentalParam): number =>
  estimateFurnitureDailyGoodsRepairRentalAnnualAmount({
    expenses,
    residentCount
  }) * estimateFurnitureDailyGoodsRepairRentalIntensity()

export const estimateFurnitureDailyGoodsRepairRentalAnnualAmount = ({
  expenses,
  residentCount
}: FurnitureDailyGoodsRepairRentalParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'furniture-daily-goods-repair-rental',
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateFurnitureDailyGoodsRepairRentalIntensity = (): number =>
  getBaselineIntensity('other', 'furniture-daily-goods-repair-rental').value
