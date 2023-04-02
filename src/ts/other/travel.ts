import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'
import { type TravelItem, type TravelExpenses } from '../common/types'

// clothes-beauty

interface TravelIntensityParam {
  item: TravelItem
}

interface TravelAmountParam extends TravelIntensityParam {
  expenses: TravelExpenses
}

export const estimateTravelAnnualFootprint = ({
  item,
  expenses
}: TravelAmountParam): number =>
  estimateTravelAnnualAmount({ item, expenses }) *
  estimateTravelIntensity({ item })

export const estimateTravelAnnualAmount = ({
  item,
  expenses
}: TravelAmountParam): number =>
  estimateAnnualAmount(item, 'travel-factor', expenses)

export const estimateTravelIntensity = ({
  item
}: TravelIntensityParam): number => getBaselineIntensity('other', item).value
