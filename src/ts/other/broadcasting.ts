import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type CommunicationExpenses } from './types'

interface BroadcastingParam {
  expenses: CommunicationExpenses
  residentCount: number
}

export const estimateBroadcastingAnnualFootprint = ({
  expenses,
  residentCount
}: BroadcastingParam): number =>
  estimateBroadcastingAnnualAmount({ expenses, residentCount }) *
  estimateBroadcastingIntensity()

export const estimateBroadcastingAnnualAmount = ({
  expenses,
  residentCount
}: BroadcastingParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'broadcasting',
    'communication-amount',
    expenses,
    residentCount
  )

export const estimateBroadcastingIntensity = (): number =>
  getBaselineIntensity('other', 'broadcasting').value
