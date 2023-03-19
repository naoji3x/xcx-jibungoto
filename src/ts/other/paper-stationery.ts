import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'
import { type DailyGoodsExpenses } from './types'

interface PaperStationeryParam {
  expenses: DailyGoodsExpenses
  residentCount: number
}

export const estimatePaperStationeryAnnualFootprint = ({
  expenses,
  residentCount
}: PaperStationeryParam): number =>
  estimatePaperStationeryAnnualAmount({ expenses, residentCount }) *
  estimatePaperStationeryIntensity()

export const estimatePaperStationeryAnnualAmount = ({
  expenses,
  residentCount
}: PaperStationeryParam): number =>
  estimateAnnualAmountConsideringResidentCount(
    'paper-stationery',
    'daily-goods-amount',
    expenses,
    residentCount
  )

export const estimatePaperStationeryIntensity = (): number =>
  getBaselineIntensity('other', 'paper-stationery').value
