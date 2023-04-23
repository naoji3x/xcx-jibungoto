import { type ServiceExpenses, type ServiceItem } from '../common/types'
import { getBaselineIntensity } from '../data/database'
import { estimateAnnualAmount } from './amount-calculation'

/** サービスの活動量を計算するための引数 */
interface ServiceAmountParam {
  /** サービスに関わる支出 */
  expenses: ServiceExpenses
}

/**
 * サービスの年間の活動量を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @param param サービスの活動量を計算するための引数
 * @returns 活動量[000JPY]
 */
export const estimateServiceAnnualAmount = (
  item: ServiceItem,
  { expenses }: ServiceAmountParam
): number => estimateAnnualAmount(item, 'service-factor', expenses)

/**
 * サービスのGHG原単位を計算
 * @param item サービスのカーボンフットプリントアイテム名
 * @returns GHG原単位[kgCO2e/000JPY]
 */
export const estimateServiceIntensity = (item: ServiceItem): number =>
  getBaselineIntensity('other', item).value
