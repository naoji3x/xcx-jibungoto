import {
  type HobbyGoodsExpenses,
  type HobbyGoodsItem
} from '../../ts/common/types'
import {
  estimateHobbyGoodsAnnualAmount,
  estimateHobbyGoodsIntensity
} from '../../ts/other/hobby-goods'

const expectAmount = (
  param: { expenses: HobbyGoodsExpenses },
  itemAndValues: Array<{ item: HobbyGoodsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateHobbyGoodsAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: HobbyGoodsItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateHobbyGoodsIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('hobby-goods', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less' }, [
      { item: 'culture-goods', value: 5.212397128 },
      { item: 'entertainment-goods', value: 0.706433648 },
      { item: 'sports-goods', value: 4.412044588 },
      { item: 'gardening-flower', value: 5.720752408 },
      { item: 'pet', value: 5.620057096 },
      { item: 'tobacco', value: 5.326343701 },
      { item: 'books-magazines', value: 8.516147287 },
      { item: 'sports-culture-repair-rental', value: 0.047052533 },
      { item: 'sports-entertainment-repair-rental', value: 0.43877161 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k' }, [
      { item: 'culture-goods', value: 13.03099282 },
      { item: 'entertainment-goods', value: 1.766084121 },
      { item: 'sports-goods', value: 11.03011147 },
      { item: 'gardening-flower', value: 14.30188102 },
      { item: 'pet', value: 14.05014274 },
      { item: 'tobacco', value: 13.31585925 },
      { item: 'books-magazines', value: 21.29036822 },
      { item: 'sports-culture-repair-rental', value: 0.117631333 },
      { item: 'sports-entertainment-repair-rental', value: 1.096929026 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k' }, [
      { item: 'culture-goods', value: 26.06198564 },
      { item: 'entertainment-goods', value: 3.532168242 },
      { item: 'sports-goods', value: 22.06022294 },
      { item: 'gardening-flower', value: 28.60376204 },
      { item: 'pet', value: 28.10028548 },
      { item: 'tobacco', value: 26.6317185 },
      { item: 'books-magazines', value: 42.58073643 },
      { item: 'sports-culture-repair-rental', value: 0.235262666 },
      { item: 'sports-entertainment-repair-rental', value: 2.193858052 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-50k' }, [
      { item: 'culture-goods', value: 60.81129982 },
      { item: 'entertainment-goods', value: 8.241725898 },
      { item: 'sports-goods', value: 51.47385353 },
      { item: 'gardening-flower', value: 66.74211143 },
      { item: 'pet', value: 65.56733279 },
      { item: 'tobacco', value: 62.14067651 },
      { item: 'books-magazines', value: 99.35505168 },
      { item: 'sports-culture-repair-rental', value: 0.548946222 },
      { item: 'sports-entertainment-repair-rental', value: 5.119002122 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '50k-more' }, [
      { item: 'culture-goods', value: 104.2479426 },
      { item: 'entertainment-goods', value: 14.12867297 },
      { item: 'sports-goods', value: 88.24089176 },
      { item: 'gardening-flower', value: 114.4150482 },
      { item: 'pet', value: 112.4011419 },
      { item: 'tobacco', value: 106.526874 },
      { item: 'books-magazines', value: 170.3229457 },
      { item: 'sports-culture-repair-rental', value: 0.941050666 },
      { item: 'sports-entertainment-repair-rental', value: 8.775432209 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown' }, [
      { item: 'culture-goods', value: 11.26338699 },
      { item: 'entertainment-goods', value: 1.526521363 },
      { item: 'sports-goods', value: 9.533917775 },
      { item: 'gardening-flower', value: 12.36188393 },
      { item: 'pet', value: 12.14429301 },
      { item: 'tobacco', value: 11.50961235 },
      { item: 'books-magazines', value: 18.40240876 },
      { item: 'sports-culture-repair-rental', value: 0.101675079 },
      { item: 'sports-entertainment-repair-rental', value: 0.948134674 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'culture-goods', value: 2.39985402 },
      { item: 'entertainment-goods', value: 1.570433632 },
      { item: 'sports-goods', value: 2.497630942 },
      { item: 'gardening-flower', value: 4.85232258 },
      { item: 'pet', value: 2.103916343 },
      { item: 'tobacco', value: 0.996872147 },
      { item: 'books-magazines', value: 2.52738082 },
      { item: 'sports-culture-repair-rental', value: 1.953281338 },
      { item: 'sports-entertainment-repair-rental', value: 0.82229875 }
    ])
  })
})
