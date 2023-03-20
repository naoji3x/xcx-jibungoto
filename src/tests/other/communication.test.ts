import {
  estimateCommunicationAnnualAmount,
  estimateCommunicationAnnualFootprint,
  estimateCommunicationIntensity
} from '../../ts/other/communication'
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
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(31.73762564)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(4.262374357)
  })

  test('amount case 02', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-10k',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(79.34406411)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(10.65593589)
  })

  test('amount case 03', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '10k-20k',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(158.6881282)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(21.31187179)
  })

  test('amount case 04', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '20k-30k',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(264.4802137)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(35.51978631)
  })

  test('amount case 05', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '30k-more',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(423.1683419)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(56.8316581)
  })

  test('amount case 06', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(130.4760614)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(17.52298123)
  })

  test('amount case 08', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(130.4760614)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(17.52298123)
  })

  test('amount case 09', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 3
    }
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'communication' })
    ).toBeCloseTo(10.57920855)
    expect(
      estimateCommunicationAnnualAmount({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(1.420791452)
  })

  test('intensity case 01', () => {
    expect(
      estimateCommunicationIntensity({ item: 'communication' })
    ).toBeCloseTo(1.02634832)
    expect(
      estimateCommunicationIntensity({ item: 'broadcasting' })
    ).toBeCloseTo(1.141584281)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: CommunicationExpenses
      residentCount: number
    } = {
      expenses: '5k-less',
      residentCount: 1
    }
    expect(
      estimateCommunicationAnnualFootprint({ ...param, item: 'communication' })
    ).toBeCloseTo(31.73762564 * 1.02634832)
    expect(
      estimateCommunicationAnnualFootprint({ ...param, item: 'broadcasting' })
    ).toBeCloseTo(4.262374357 * 1.141584281)
  })
})
