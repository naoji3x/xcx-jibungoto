import {
  type CommunicationExpenses,
  type CommunicationItem
} from '../../ts/common/types'
import {
  estimateCommunicationAnnualAmount,
  estimateCommunicationIntensity
} from '../../ts/other/communication'

const expectAmount = (
  param: { expenses: CommunicationExpenses; residentCount: number },
  itemAndValues: Array<{ item: CommunicationItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateCommunicationAnnualAmount(inv.item, param)).toBeCloseTo(
      inv.value
    )
  }
}

const expectIntensity = (
  itemAndValues: Array<{ item: CommunicationItem; value: number }>
): void => {
  for (const inv of itemAndValues) {
    expect(estimateCommunicationIntensity(inv.item)).toBeCloseTo(inv.value)
  }
}

describe('communication', () => {
  test('amount case 01', () => {
    expectAmount({ expenses: '5k-less', residentCount: 1 }, [
      { item: 'communication', value: 31.73762564 },
      { item: 'broadcasting', value: 4.262374357 }
    ])
  })

  test('amount case 02', () => {
    expectAmount({ expenses: '5k-10k', residentCount: 1 }, [
      { item: 'communication', value: 79.34406411 },
      { item: 'broadcasting', value: 10.65593589 }
    ])
  })

  test('amount case 03', () => {
    expectAmount({ expenses: '10k-20k', residentCount: 1 }, [
      { item: 'communication', value: 158.6881282 },
      { item: 'broadcasting', value: 21.31187179 }
    ])
  })

  test('amount case 04', () => {
    expectAmount({ expenses: '20k-30k', residentCount: 1 }, [
      { item: 'communication', value: 264.4802137 },
      { item: 'broadcasting', value: 35.51978631 }
    ])
  })

  test('amount case 05', () => {
    expectAmount({ expenses: '30k-more', residentCount: 1 }, [
      { item: 'communication', value: 423.1683419 },
      { item: 'broadcasting', value: 56.8316581 }
    ])
  })

  test('amount case 06', () => {
    expectAmount({ expenses: 'unknown', residentCount: 1 }, [
      { item: 'communication', value: 130.4760614 },
      { item: 'broadcasting', value: 17.52298123 }
    ])
  })

  test('amount case 08', () => {
    expectAmount({ expenses: 'unknown', residentCount: 3 }, [
      { item: 'communication', value: 130.4760614 },
      { item: 'broadcasting', value: 17.52298123 }
    ])
  })

  test('amount case 09', () => {
    expectAmount({ expenses: '5k-less', residentCount: 3 }, [
      { item: 'communication', value: 10.57920855 },
      { item: 'broadcasting', value: 1.420791452 }
    ])
  })

  test('intensity case 01', () => {
    expectIntensity([
      { item: 'communication', value: 1.02634832 },
      { item: 'broadcasting', value: 1.141584281 }
    ])
  })
})
