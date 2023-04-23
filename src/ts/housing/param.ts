/** 帰属家賃の活動量を計算するための引数 */

import { type HousingSize } from 'ts/common/types'

/** 家に関わる活動量を計算するための引数 */
export interface HousingParam {
  /** 住居の広さ */
  housingSize: HousingSize
  /** 住居者数 */
  residentCount: number
}
