// 家の部屋数
export type HousingSize =
  | '1-room'
  | '2-room'
  | '3-room'
  | '4-room'
  | '5-6-room'
  | '7-more-room'
  | 'unknown'

// 家の断熱
export type HousingInsulation =
  | 'no-insulation'
  | '2-level'
  | '3-level'
  | '4-level'
  | 'unknown'

// 自宅の電力の種類
export type Electricity =
  | 'conventional'
  | '30-renewable'
  | '50-renewable'
  | '100-renewable'
  | 'solar-panel'
  | 'unknown'

export type Month =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

// 使用しているガスの種類
export type GasType = 'urban-gas' | 'lpg' | 'unknown'

// お住まいの地域（地方）
export type LivingRegion = 'northeast' | 'middle' | 'southwest' | 'unknown'
