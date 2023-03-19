import {
  estimateCommunicationAnnualAmount,
  estimateCommunicationAnnualFootprint,
  estimateCommunicationIntensity
} from '../../ts/other/communication'
import {
  estimateBroadcastingAnnualAmount,
  estimateBroadcastingAnnualFootprint,
  estimateBroadcastingIntensity
} from '../../ts/other/broadcasting'
import { type CommunicationExpenses } from '../../ts/other/types'

describe('communication', () => {
  test('amount case 01', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(31.73762564)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(4.262374357)
  })

  test('amount case 02', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-10k',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(79.34406411)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(10.65593589)
  })

  test('amount case 03', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '10k-20k',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(158.6881282)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(21.31187179)
  })

  test('amount case 04', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '20k-30k',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(264.4802137)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(35.51978631)
  })

  test('amount case 05', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '30k-more',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(423.1683419)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(56.8316581)
  })

  test('amount case 06', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(130.4760614)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(17.52298123)
  })

  test('amount case 08', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(130.4760614)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(17.52298123)
  })

  test('amount case 09', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 3
    }
    expect(estimateCommunicationAnnualAmount(param)).toBeCloseTo(10.57920855)
    expect(estimateBroadcastingAnnualAmount(param)).toBeCloseTo(1.420791452)
  })

  test('intensity case 01', () => {
    expect(estimateCommunicationIntensity()).toBeCloseTo(1.02634832)
    expect(estimateBroadcastingIntensity()).toBeCloseTo(1.141584281)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(estimateCommunicationAnnualFootprint(param)).toBeCloseTo(
      31.73762564 * 1.02634832
    )
    expect(estimateBroadcastingAnnualFootprint(param)).toBeCloseTo(
      4.262374357 * 1.141584281
    )
  })
})
