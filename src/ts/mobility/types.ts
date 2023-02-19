// 自動車の種類
export type CarIntensityFactorFirstKey =
  | 'gasoline'
  | 'light'
  | 'hv'
  | 'phv'
  | 'ev'
  | 'unknown'

// 自宅充電の割合
export type CarChargingKey =
  | 'charge-almost-at-home'
  | 'use-charging-spots-occasionally'
  | 'use-charging-spots-sometimes'
  | 'use-charging-spots-usually'
  | 'unknown'

// 平均乗車人数
export type CarPassengersFirstKey =
  | '1'
  | '1-2'
  | '2'
  | '2-3'
  | '3'
  | '3-4'
  | '4-more'
  | 'unknown'

// 家庭での電力の種類
export type ElectricityIntensityKey =
  | 'conventional'
  | '30-renewable'
  | '50-renewable'
  | '100-renewable'
  | 'solar-panel'
  | 'unknown'

// 住んでいる地域の規模
export type MileageByAreaFirstKey =
  | 'major-city-or-metropolitan-area'
  | 'city-150k-more'
  | 'city-50k-150k'
  | 'area-less-than-50k'
  | 'unknown'
