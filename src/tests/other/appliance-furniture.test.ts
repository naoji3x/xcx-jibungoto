import {
  estimateElectricalAppliancesRepairRentalAnnualAmount,
  estimateElectricalAppliancesRepairRentalAnnualFootprint,
  estimateElectricalAppliancesRepairRentalIntensity
} from '../../ts/other/electrical-appliances-repair-rental'
import {
  estimateFurnitureDailyGoodsRepairRentalAnnualAmount,
  estimateFurnitureDailyGoodsRepairRentalAnnualFootprint,
  estimateFurnitureDailyGoodsRepairRentalIntensity
} from '../../ts/other/furniture-daily-goods-repair-rental'
import {
  estimateCookingAppliancesAnnualAmount,
  estimateCookingAppliancesAnnualFootprint,
  estimateCookingAppliancesIntensity
} from '../../ts/other/cooking-appliances'
import {
  estimateHeatingCoolingAppliancesAnnualAmount,
  estimateHeatingCoolingAppliancesAnnualFootprint,
  estimateHeatingCoolingAppliancesIntensity
} from '../../ts/other/heating-cooling-appliances'
import {
  estimateOtherAppliancesAnnualAmount,
  estimateOtherAppliancesAnnualFootprint,
  estimateOtherAppliancesIntensity
} from '../../ts/other/other-appliances'
import {
  estimateElectronicsAnnualAmount,
  estimateElectronicsAnnualFootprint,
  estimateElectronicsIntensity
} from '../../ts/other/electronics'
import {
  estimateFurnitureAnnualAmount,
  estimateFurnitureAnnualFootprint,
  estimateFurnitureIntensity
} from '../../ts/other/furniture'
import {
  estimateCoveringAnnualAmount,
  estimateCoveringAnnualFootprint,
  estimateCoveringIntensity
} from '../../ts/other/covering'
import { type ApplianceFurnitureExpenses } from '../../ts/other/types'

describe('appliance-furniture', () => {
  test('amount case 01', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.273075511)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.879636251)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      3.378927229
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      3.873104143
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(3.644563112)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(8.140149492)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(2.033537824)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(2.777006438)
  })

  test('amount case 02', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-100k',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.819226533)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(2.638908754)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      10.13678169
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      11.61931243
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(10.93368934)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(24.42044847)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(6.100613473)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(8.331019313)
  })

  test('amount case 03', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '100k-200k',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(1.638453066)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(5.277817508)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      20.27356337
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      23.23862486
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(21.86737867)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(48.84089695)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(12.20122695)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(16.66203863)
  })

  test('amount case 04', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '200k-300k',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(2.730755111)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(8.796362514)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      33.78927229
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      38.73104143
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(36.44563112)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(81.40149492)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(20.33537824)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(27.77006438)
  })

  test('amount case 05', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '300k-400k',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(3.823057155)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(12.31490752)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(47.3049812)
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      54.223458
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(51.02388357)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(113.9620929)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(28.46952954)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(38.87809013)
  })

  test('amount case 06', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '400k-more',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(5.461510221)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(17.59272503)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      67.57854458
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      77.46208286
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(72.89126224)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(162.8029898)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(40.67075648)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(55.54012875)
  })

  test('amount case 07', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.873530497)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(2.813833758)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      10.80871722
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      12.38952029
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(11.65844939)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(26.03920359)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(6.50500405)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(8.883256514)
  })

  test('amount case 08', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: 'unknown',
      residentCount: 3
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.873530497)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(2.813833758)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      10.80871722
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      12.38952029
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(11.65844939)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(26.03920359)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(6.50500405)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(8.883256514)
  })

  test('amount case 09', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 3
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.09102517)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualAmount(param)
    ).toBeCloseTo(0.293212084)
    expect(estimateCookingAppliancesAnnualAmount(param)).toBeCloseTo(
      1.126309076
    )
    expect(estimateHeatingCoolingAppliancesAnnualAmount(param)).toBeCloseTo(
      1.291034714
    )
    expect(estimateOtherAppliancesAnnualAmount(param)).toBeCloseTo(1.214854371)
    expect(estimateElectronicsAnnualAmount(param)).toBeCloseTo(2.713383164)
    expect(estimateFurnitureAnnualAmount(param)).toBeCloseTo(0.677845941)
    expect(estimateCoveringAnnualAmount(param)).toBeCloseTo(0.925668813)
  })

  test('intensity case 01', () => {
    expect(estimateElectricalAppliancesRepairRentalIntensity()).toBeCloseTo(
      1.953281338
    )
    expect(estimateFurnitureDailyGoodsRepairRentalIntensity()).toBeCloseTo(
      1.799958663
    )
    expect(estimateCookingAppliancesIntensity()).toBeCloseTo(2.852827088)
    expect(estimateHeatingCoolingAppliancesIntensity()).toBeCloseTo(7.449174796)
    expect(estimateOtherAppliancesIntensity()).toBeCloseTo(2.750735655)
    expect(estimateElectronicsIntensity()).toBeCloseTo(2.274573158)
    expect(estimateFurnitureIntensity()).toBeCloseTo(2.207048567)
    expect(estimateCoveringIntensity()).toBeCloseTo(2.512668069)
  })

  test('footprint case 01', () => {
    const param: {
      expenses: ApplianceFurnitureExpenses
      residentCount: number
    } = {
      expenses: '50k-less',
      residentCount: 1
    }
    expect(
      estimateElectricalAppliancesRepairRentalAnnualFootprint(param)
    ).toBeCloseTo(0.273075511 * 1.953281338)
    expect(
      estimateFurnitureDailyGoodsRepairRentalAnnualFootprint(param)
    ).toBeCloseTo(0.879636251 * 1.799958663)
    expect(estimateCookingAppliancesAnnualFootprint(param)).toBeCloseTo(
      3.378927229 * 2.852827088
    )
    expect(estimateHeatingCoolingAppliancesAnnualFootprint(param)).toBeCloseTo(
      3.873104143 * 7.449174796
    )
    expect(estimateOtherAppliancesAnnualFootprint(param)).toBeCloseTo(
      3.644563112 * 2.750735655
    )
    expect(estimateElectronicsAnnualFootprint(param)).toBeCloseTo(
      8.140149492 * 2.274573158
    )
    expect(estimateFurnitureAnnualFootprint(param)).toBeCloseTo(
      2.033537824 * 2.207048567
    )
    expect(estimateCoveringAnnualFootprint(param)).toBeCloseTo(
      2.777006438 * 2.512668069
    )
  })
})
