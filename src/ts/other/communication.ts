import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type CommunicationItem, type CommunicationExpenses } from './types'

interface CommunicationIntensityParam {
  item: CommunicationItem
}

interface CommunicationAmountParam extends CommunicationIntensityParam {
  expenses: CommunicationExpenses
  residentCount: number
}

export const estimateCommunicationAnnualFootprint = ({
  item,
  expenses,
  residentCount
}: CommunicationAmountParam): number =>
  estimateCommunicationAnnualAmount({ item, expenses, residentCount }) *
  estimateCommunicationIntensity({ item })

export const estimateCommunicationAnnualAmount = ({
  item,
  expenses,
  residentCount
}: CommunicationAmountParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'communication-amount',
    expenses,
    residentCount
  )

export const estimateCommunicationIntensity = ({
  item
}: CommunicationIntensityParam): number =>
  getBaselineIntensity('other', item).value
