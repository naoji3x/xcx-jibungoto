import { getParameter } from '../data/database'
import { type ResidentialAreaSize } from '../common/types'

/**
 * 年間の移動距離を取得
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param speedType スピードの種類
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmount = (
  annualTravelingTime: number,
  speedType: string
): number =>
  annualTravelingTime * getParameter('transportation-speed', speedType).value

/**
 * 年間の移動距離を取得（週間の移動も考慮）
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param weeklySpeedType 週間の移動のスピード種類
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param annualSpeedType 年間の移動のスピード種類
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmountAddingWeeklyTravel = (
  weeklyTravelingTime: number,
  weeklySpeedType: string,
  annualTravelingTime: number,
  annualSpeedType: string
): number => {
  const wpy = getParameter(
    'misc',
    'weeks-per-year-excluding-long-vacations'
  )?.value
  const weekCount = isNaN(wpy) ? 49 : wpy

  const milage =
    annualTravelingTime *
      getParameter('transportation-speed', annualSpeedType).value +
    weeklyTravelingTime *
      weekCount *
      getParameter('transportation-speed', weeklySpeedType).value
  return milage
}

/**
 * 年間の移動距離を取得（住んでいる地域の規模での平均値を取得）
 * @param item 移動手段
 * @param residentialAreaSize 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmountByArea = (
  item: string,
  residentialAreaSize: ResidentialAreaSize
): number =>
  getParameter('mileage-by-area', residentialAreaSize + '_' + item).value
