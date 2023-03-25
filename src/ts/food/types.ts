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
