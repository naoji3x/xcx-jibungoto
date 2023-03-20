// その他のitem
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

export type Item =
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
export type Category =
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

// service: String # 5k-less|5k-10k|10k-20k|20k-50k|50k-more|unknown

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
