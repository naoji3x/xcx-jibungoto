import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type CommunicationExpenses } from './types'

interface CommunicationParam {
  expenses: CommunicationExpenses
  residentCount: number
}

export const estimateCommunicationAnnualFootprint = ({
  expenses,
  residentCount
}: CommunicationParam): number =>
  estimateCommunicationAnnualAmount({ expenses, residentCount }) *
  estimateCommunicationIntensity()

export const estimateCommunicationAnnualAmount = ({
  expenses,
  residentCount
}: CommunicationParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'communication',
    'communication-amount',
    expenses,
    residentCount
  )

export const estimateCommunicationIntensity = (): number =>
  getBaselineIntensity('other', 'communication').value
