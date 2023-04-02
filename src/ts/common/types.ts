//
// mobility
//

// 自動車の種類(v1ではCarIntensityFactorFirstKey)
export type CarType = 'gasoline' | 'light' | 'hv' | 'phv' | 'ev' | 'unknown'

// 自宅充電の割合 ※v1ではCarChargingKey
export type CarCharging =
  | 'charge-almost-at-home'
  | 'use-charging-spots-occasionally'
  | 'use-charging-spots-sometimes'
  | 'use-charging-spots-usually'
  | 'unknown'

// 平均乗車人数(v1ではCarPassengersFirstKey)
export type CarPassengers =
  | '1'
  | '1-2'
  | '2'
  | '2-3'
  | '3'
  | '3-4'
  | '4-more'
  | 'unknown'

// 自宅での電力の種類(v1ではElectricityIntensityKey)
export type ElectricityType =
  | 'conventional'
  | '30-renewable'
  | '50-renewable'
  | '100-renewable'
  | 'solar-panel'
  | 'unknown'

// 住んでいる地域の規模(v1ではMileageByAreaFirstKey)
export type ResidentialAreaSize =
  | 'major-city-or-metropolitan-area'
  | 'city-150k-more'
  | 'city-50k-150k'
  | 'area-less-than-50k'
  | 'unknown'

//
// food
//

// 1日の活動量（摂取カロリー量）はどのくらいですか？
export type FoodIntake =
  | 'very-little'
  | 'somewhat-little'
  | 'moderate'
  | 'somewhat-much'
  | 'very-much'
  | 'unknown'

// 食材を捨てたり食べ残し（食品ロス）が生じる頻度はどのくらいですか？
export type FoodDirectWaste =
  | 'seldom'
  | '1-per-week'
  | '2-3-per-week'
  | '4-7-per-week'
  | '8-more-per-week'
  | 'unknown'

export type FoodLeftover =
  | 'seldom'
  | '1-per-week'
  | '2-3-per-week'
  | '4-7-per-week'
  | '8-more-per-week'
  | 'unknown'

// 普段の食生活を教えてください
export type DishFrequency =
  | 'everyday'
  | '4-5-per-week'
  | '2-3-per-week'
  | '1-per-week'
  | '2-3-per-month'
  | '1-less-per-month'
  | 'never'
  | 'unknown'

export type DairyFoodFrequency =
  | '3-more-per-day'
  | '2-per-day'
  | '1-per-day'
  | 'half-of-week'
  | '1-2-less-per-week'
  | 'never'
  | 'unknown'

// １週間にどのくらいの頻度でお酒を飲みますか？
export type AlcoholFrequency =
  | 'everyday'
  | '4-5-per-week'
  | '2-3-per-week'
  | '1-per-week'
  | '2-3-less-per-month'
  | 'never'
  | 'unknown'

// お酒以外の飲み物、お菓子類の1ヶ月の支出はどのくらいですか？
export type SoftDrinkSnackExpenses =
  | '3k-less'
  | '3k-5k'
  | '5k-10k'
  | '10k-15k'
  | '15k-more'
  | 'unknown'

// 1ヶ月の外食費はどのくらいですか？
export type EatOutExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

export type DishItem =
  | 'beef'
  | 'pork'
  | 'chicken'
  | 'other-meat'
  | 'fish'
  | 'processed-fish'

export type SoftDrinkSnackItem = 'sweets-snack' | 'coffee-tea' | 'cold-drink'

export type FoodIntakeItem =
  | 'rice'
  | 'bread-flour'
  | 'noodle'
  | 'potatoes'
  | 'vegetables'
  | 'processed-vegetables'
  | 'beans'
  | 'fruits'
  | 'oil'
  | 'seasoning'
//   | 'ready-meal'

export type DairyFoodItem = 'milk' | 'other-dairy' | 'eggs'
export type EatOutItem = 'restaurant' | 'bar-cafe'

//
// housing
//

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

/** 使用しているガスの種類 */
export type GasType = 'urban-gas' | 'lpg'

/** お住まいの地域（地方） */
export type LivingRegion = 'northeast' | 'middle' | 'southwest' | 'unknown'

//
// other
//
export type DailyGoodsItem = 'sanitation' | 'kitchen-goods' | 'paper-stationery'

export type CommunicationItem = 'communication' | 'broadcasting'

export type ApplianceFurnitureItem =
  | 'electrical-appliances-repair-rental'
  | 'furniture-daily-goods-repair-rental'
  | 'cooking-appliances'
  | 'heating-cooling-appliances'
  | 'other-appliances'
  | 'electronics'
  | 'furniture'
  | 'covering'

export type ServiceItem =
  | 'medicine'
  | 'housework'
  | 'washing'
  | 'medical-care'
  | 'nursing'
  | 'caring'
  | 'formal-education'
  | 'informal-education'

export type HobbyGoodsItem =
  | 'culture-goods'
  | 'entertainment-goods'
  | 'sports-goods'
  | 'gardening-flower'
  | 'pet'
  | 'tobacco'
  | 'books-magazines'
  | 'sports-culture-repair-rental'
  | 'sports-entertainment-repair-rental'

export type ClothesBeautyItem =
  | 'haircare'
  | 'cosmetics'
  | 'clothes-goods'
  | 'bags-jewelries-goods'
  | 'clothes-repair-rental'
  | 'bags-jewelries-repair-rental'

export type LeisureSportsItem =
  | 'culture-leisure'
  | 'entertainment-leisure'
  | 'sports-leisure'
  | 'bath-spa'

export type TravelItem = 'hotel' | 'travel'

export type OtherItem =
  | 'sanitation'
  | 'kitchen-goods'
  | 'paper-stationery'
  | 'communication'
  | 'broadcasting'
  | 'electrical-appliances-repair-rental'
  | 'furniture-daily-goods-repair-rental'
  | 'cooking-appliances'
  | 'heating-cooling-appliances'
  | 'other-appliances'
  | 'electronics'
  | 'furniture'
  | 'covering'
  | 'medicine'
  | 'housework'
  | 'washing'
  | 'medical-care'
  | 'nursing'
  | 'caring'
  | 'formal-education'
  | 'informal-education'
  | 'culture-goods'
  | 'entertainment-goods'
  | 'sports-goods'
  | 'gardening-flower'
  | 'pet'
  | 'tobacco'
  | 'books-magazines'
  | 'sports-culture-repair-rental'
  | 'sports-entertainment-repair-rental'
  | 'haircare'
  | 'cosmetics'
  | 'clothes-goods'
  | 'bags-jewelries-goods'
  | 'clothes-repair-rental'
  | 'bags-jewelries-repair-rental'
  | 'culture-leisure'
  | 'entertainment-leisure'
  | 'sports-leisure'
  | 'bath-spa'
  | 'hotel'
  | 'travel'
  | 'waste'

// その他のカテゴリ
export type OtherCategory =
  | 'daily-goods-amount'
  | 'communication-amount'
  | 'appliance-furniture-amount'
  | 'service-factor'
  | 'hobby-goods-factor'
  | 'clothes-beauty-factor'
  | 'leisure-sports-factor'
  | 'travel-factor'

export type DailyGoodsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-30k'
  | '30k-more'
  | 'unknown'
  | 'average-per-capita'

export type CommunicationExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-30k'
  | '30k-more'
  | 'unknown'
  | 'average-per-capita'

export type ApplianceFurnitureExpenses =
  | '50k-less'
  | '50k-100k'
  | '100k-200k'
  | '200k-300k'
  | '300k-400k'
  | '400k-more'
  | 'unknown'
  | 'average-per-capita'

export type ServiceExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

export type HobbyGoodsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

export type ClothesBeautyExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

export type LeisureSportsExpenses =
  | '5k-less'
  | '5k-10k'
  | '10k-20k'
  | '20k-50k'
  | '50k-more'
  | 'unknown'

export type TravelExpenses =
  | '10k-less'
  | '10k-30k'
  | '30k-50k'
  | '50k-100k'
  | '100k-200k'
  | '200k-more'
  | 'unknown'
