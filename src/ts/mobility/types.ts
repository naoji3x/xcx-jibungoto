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
