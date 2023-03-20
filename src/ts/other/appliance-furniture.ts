import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import {
  type ApplianceFurnitureItem,
  type ApplianceFurnitureExpenses
} from './types'

interface ApplianceFurnitureIntensityParam {
  item: ApplianceFurnitureItem
}

interface ApplianceFurnitureAmountParam
  extends ApplianceFurnitureIntensityParam {
  expenses: ApplianceFurnitureExpenses
  residentCount: number
}

export const estimateApplianceFurnitureAnnualFootprint = ({
  item,
  expenses,
  residentCount
}: ApplianceFurnitureAmountParam): number =>
  estimateApplianceFurnitureAnnualAmount({ item, expenses, residentCount }) *
  estimateApplianceFurnitureIntensity({ item })

export const estimateApplianceFurnitureAnnualAmount = ({
  item,
  expenses,
  residentCount
}: ApplianceFurnitureAmountParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'appliance-furniture-amount',
    expenses,
    residentCount
  )

export const estimateApplianceFurnitureIntensity = ({
  item
}: ApplianceFurnitureIntensityParam): number =>
  getBaselineIntensity('other', item).value
