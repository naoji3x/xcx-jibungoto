import {
  type CommunicationExpenses,
  type CommunicationItem
} from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmountConsideringResidentCount } from './amount-calculation'

/** 通信の活動量を計算するための引数 */
interface CommunicationAmountParam {
  /** 通信に関わる支出 */
  expenses: CommunicationExpenses
  /** 居住者数 */
  residentCount: number
}

/**
 * 通信の年間の活動量を計算
 * @param item 通信のカーボンフットプリントアイテム名
 * @param param 通信の活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateCommunicationAnnualAmount = (
  item: CommunicationItem,
  { expenses, residentCount }: CommunicationAmountParam
): number =>
  estimateAnnualAmountConsideringResidentCount(
    item,
    'communication-amount',
    expenses,
    residentCount
  )

/**
 * 通信のGHG原単位を計算
 * @param item 通信のカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export const estimateCommunicationIntensity = (
  item: CommunicationItem
): number => getBaselineIntensity('other', item).value
