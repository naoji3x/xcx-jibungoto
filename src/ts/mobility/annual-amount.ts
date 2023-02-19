import { getParameter } from '../data/database'
import { type MileageByAreaFirstKey } from './types'

/**
 * 年間の移動距離を取得
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param speedKey スピードを取得するキー情報
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmount = (
  annualTravelingTime: number,
  speedKey: string
): number =>
  annualTravelingTime * getParameter('transportation-speed', speedKey).value

/**
 * 年間の移動距離を取得（週間の移動も考慮）
 * @param weeklyTravelingTime 週間の移動時間[hr]
 * @param weeklySpeedKey 週間の移動のスピードを取得するキー情報
 * @param annualTravelingTime 年間の移動時間[hr]
 * @param annualSpeedKey 年間の移動のスピードを取得するキー情報
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmountAddingWeeklyTravel = (
  weeklyTravelingTime: number,
  weeklySpeedKey: string,
  annualTravelingTime: number,
  annualSpeedKey: string
): number => {
  const wpy = getParameter(
    'misc',
    'weeks-per-year-excluding-long-vacations'
  )?.value
  const weekCount = isNaN(wpy) ? 49 : wpy

  const milage =
    annualTravelingTime *
      getParameter('transportation-speed', annualSpeedKey).value +
    weeklyTravelingTime *
      weekCount *
      getParameter('transportation-speed', weeklySpeedKey).value
  return milage
}

/**
 * 年間の移動距離を取得（住んでいる地域の規模での平均値を取得）
 * @param item 移動手段
 * @param mileageByAreaFirstKey 住んでいる地域の規模
 * @returns 年間の移動距離[km-passenger]
 */
export const estimateAnnualAmountByArea = (
  item: string,
  mileageByAreaFirstKey: MileageByAreaFirstKey
): number =>
  getParameter('mileage-by-area', mileageByAreaFirstKey + '_' + item).value
