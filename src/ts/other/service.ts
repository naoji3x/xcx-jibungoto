import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'
import { type ServiceItem, type ServiceExpenses } from '../common/types'

interface ServiceIntensityParam {
  item: ServiceItem
}

interface ServiceAmountParam extends ServiceIntensityParam {
  expenses: ServiceExpenses
}

export const estimateServiceAnnualFootprint = ({
  item,
  expenses
}: ServiceAmountParam): number =>
  estimateServiceAnnualAmount({ item, expenses }) *
  estimateServiceIntensity({ item })

export const estimateServiceAnnualAmount = ({
  item,
  expenses
}: ServiceAmountParam): number =>
  estimateAnnualAmount(item, 'service-factor', expenses)

export const estimateServiceIntensity = ({
  item
}: ServiceIntensityParam): number => getBaselineIntensity('other', item).value
