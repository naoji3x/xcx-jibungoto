import { type ResidentialAreaSize } from '../common/types'

/** 移動時間を指定する引数 */
export interface TravelingTimeParam {
  /** 週間の移動時間[hr] */
  weeklyTravelingTime: number
  /** 年間の移動時間[hr] */
  annualTravelingTime: number
}

/** 移動時間を指定する引数 */
export interface AnnualTravelingTimeParam {
  /** 年間の移動時間[hr] */
  annualTravelingTime: number
}

/** 住んでいる地域の規模を指定する引数 */
export interface ResidentialAreaSizeParam {
  /** 住んでいる地域の規模 */
  residentialAreaSize: ResidentialAreaSize
}
