import {
  absoluteTarget,
  addAmount,
  drivingIntensityToEvPhv,
  drivingIntensityToPrivateCarRideshare,
  drivingIntensityToTaxiRideshare,
  foodAmountToAverageWithoutFoodLoss,
  housingInsulationClothing,
  housingInsulationRenovation,
  increaseRate,
  manufacturingIntensityToEvPhv,
  proportionalToOtherItems,
  shiftFromOtherItems,
  shiftFromOtherItemsThenReductionRate,
  type Diagnoses
} from '../../ts/action/action'
import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType,
  type FoodDirectWaste,
  type FoodIntake,
  type FoodLeftover,
  type GasItem,
  type HousingInsulation,
  type HousingSize,
  type Month
} from '../../ts/common/types'
import { estimateFoodIntakeAnnualAmount } from '../../ts/food/food-intake'
import { estimateElectricityAnnualAmount } from '../../ts/housing/electricity'
import { estimateGasAnnualAmount } from '../../ts/housing/gas'
import { estimateHousingMaintenanceAnnualAmount } from '../../ts/housing/housing-maintenance'
import { estimateKeroseneAnnualAmount } from '../../ts/housing/kerosene'
import { estimateOtherEnergyAnnualAmount } from '../../ts/housing/other-energy'
import { estimateBicycleDrivingAnnualAmount } from '../../ts/mobility/bicycle-driving'
import { estimateBicycleMaintenanceAnnualAmount } from '../../ts/mobility/bicycle-maintenance'
import { estimateBusAnnualAmount } from '../../ts/mobility/bus'
import {
  estimateCarSharingDrivingAnnualAmount,
  estimateCarSharingDrivingIntensity
} from '../../ts/mobility/car-sharing-driving'
import { estimateCarSharingRentalAnnualAmount } from '../../ts/mobility/car-sharing-rental'
import {
  estimatePrivateCarDrivingAmount,
  estimatePrivateCarDrivingIntensity
} from '../../ts/mobility/private-car-driving'
import { estimatePrivateCarMaintenanceAmount } from '../../ts/mobility/private-car-maintenance'
import {
  estimatePrivateCarPurchaseAmount,
  estimatePrivateCarPurchaseIntensity
} from '../../ts/mobility/private-car-purchase'
import {
  estimateTaxiAnnualAmount,
  estimateTaxiIntensity
} from '../../ts/mobility/taxi'
import { estimateTrainAnnualAmount } from '../../ts/mobility/train'

describe('absoluteTarget', () => {
  test('returns the target', () => {
    expect(absoluteTarget(50)).toBeCloseTo(50)
  })
})

// test the addAmount function
describe('addAmount', () => {
  test('returns base + addition', () => {
    expect(addAmount(50, 50)).toBeCloseTo(100)
  })
})

// test the increaseRate function
describe('increaseRate', () => {
  test('returns base * (1 + rate)', () => {
    expect(increaseRate(50, 0.5)).toBeCloseTo(75)
  })
})

// test the drivingIntensityToEvPhv function
describe('drivingIntensityToEvPhv', () => {
  const carType: CarType = 'ev'
  const carPassengers: CarPassengers = '3'
  const carCharging: CarCharging = 'unknown'
  const electricityType: ElectricityType = '30-renewable'
  const privateCarDriving = estimatePrivateCarDrivingIntensity({
    carType,
    carPassengers,
    carCharging,
    electricityType
  })

  test('car-ev-phv02', () => {
    expect(
      drivingIntensityToEvPhv(
        privateCarDriving,
        0.083547694,
        carType,
        carCharging,
        electricityType
      )
    ).toBeCloseTo(0.046426677182307)
  })
})

// test the manufacturingIntensityToEvPhv function
describe('manufacturingIntensityToEvPhv', () => {
  const carType: CarType = 'ev'
  const privateCarPurchase = estimatePrivateCarPurchaseIntensity({
    carType
  })

  test('car-ev-phv02', () => {
    expect(
      manufacturingIntensityToEvPhv(privateCarPurchase, 8027.5, carType)
    ).toBeCloseTo(9878.35177539868)
  })
})

// test the foodAmountToAverageWithoutFoodLoss function
describe('foodAmountToAverageWithoutFoodLoss', () => {
  const foodDirectWaste: FoodDirectWaste = '8-more-per-week'
  const foodLeftover: FoodLeftover = '8-more-per-week'
  const foodIntake: FoodIntake = 'very-much'
  const base = estimateFoodIntakeAnnualAmount('rice', {
    foodDirectWaste,
    foodLeftover,
    foodIntake
  })

  test('loss01', () => {
    expect(
      foodAmountToAverageWithoutFoodLoss(
        base,
        0.964320154,
        foodDirectWaste,
        foodLeftover
      )
    ).toBeCloseTo(55.6236040551718)
  })
})

// test the drivingIntensityToTaxiRideshare function
describe('drivingIntensityToTaxiRideshare', () => {
  const carType: CarType = 'gasoline'
  const carPassengers: CarPassengers = '1'
  const carCharging: CarCharging = 'unknown'
  const taxiIntensity = estimateTaxiIntensity({
    carPassengers
  })
  const privateCarDrivingIntensity = estimatePrivateCarDrivingIntensity({
    carType,
    carPassengers,
    carCharging
  })
  const carSharingDrivingIntensity = estimateCarSharingDrivingIntensity({
    carType,
    carPassengers,
    carCharging
  })

  test('rideshare01', () => {
    expect(
      drivingIntensityToTaxiRideshare(taxiIntensity, 4, carPassengers)
    ).toBeCloseTo(0.177172888572961)
    expect(
      drivingIntensityToPrivateCarRideshare(
        privateCarDrivingIntensity,
        4,
        carPassengers
      )
    ).toBeCloseTo(0.0629255735353304)
    expect(
      drivingIntensityToPrivateCarRideshare(
        carSharingDrivingIntensity,
        4,
        carPassengers
      )
    ).toBeCloseTo(0.0630467260348775)
  })
})

// test the housingInsulationRenovation function
describe('housingInsulationRenovation', () => {
  const residentCount = 2
  const insulation: HousingInsulation = '4-level'

  const electricityAmount = estimateElectricityAnnualAmount({
    residentCount,
    month: 'january',
    monthlyConsumption: 750
  })

  const urbanGasAmount = estimateGasAnnualAmount('urban-gas', {
    residentCount,
    month: 'january',
    monthlyConsumption: 15
  })

  const keroseneAmount = estimateKeroseneAnnualAmount({
    residentCount,
    monthCount: 2,
    monthlyConsumption: 200
  })

  test('insrenov05', () => {
    expect(
      housingInsulationRenovation(electricityAmount, 0.127762934, insulation)
    ).toBeCloseTo(3433.26189262778)

    expect(
      housingInsulationRenovation(urbanGasAmount, 0.234432234, insulation)
    ).toBeCloseTo(572.696135239875)

    expect(
      housingInsulationRenovation(keroseneAmount, 0.771779141, insulation)
    ).toBeCloseTo(2038.89052)
  })
})

// test the housingInsulationClothing function
describe('housingInsulationClothing', () => {
  const residentCount = 2
  const insulation: HousingInsulation = '4-level'

  const electricityAmount = estimateElectricityAnnualAmount({
    residentCount,
    month: 'january',
    monthlyConsumption: 750
  })

  const urbanGasAmount = estimateGasAnnualAmount('urban-gas', {
    residentCount,
    month: 'january',
    monthlyConsumption: 15
  })

  const keroseneAmount = estimateKeroseneAnnualAmount({
    residentCount,
    monthCount: 2,
    monthlyConsumption: 200
  })

  test('clothes-home05', () => {
    expect(
      housingInsulationClothing(electricityAmount, 0.127762934, insulation)
    ).toBeCloseTo(3389.39753130832)

    expect(
      housingInsulationClothing(urbanGasAmount, 0.234432234, insulation)
    ).toBeCloseTo(559.270291776376)

    expect(
      housingInsulationClothing(keroseneAmount, 0.771779141, insulation)
    ).toBeCloseTo(1881.53320256687)
  })
})

// test the dailyshift01 case
describe('dailyshift01', () => {
  const privateCarAnnualMileage = 5000
  const trainWeeklyTravelingTime = 5
  const busWeeklyTravelingTime = 1
  const otherCarWeeklyTravelingTime = 1
  const otherCarAnnualTravelingTime = 20
  const trainAnnualTravelingTime = 20
  const busAnnualTravelingTime = 20

  class DiagnosesImpl implements Diagnoses {
    private readonly amounts: Record<string, number> = {}
    private readonly actions: Record<string, number> = {}

    constructor() {
      this.amounts.mobility_train_amount = estimateTrainAnnualAmount({
        weeklyTravelingTime: trainWeeklyTravelingTime,
        annualTravelingTime: trainAnnualTravelingTime
      })
      this.amounts.mobility_bus_amount = estimateBusAnnualAmount({
        weeklyTravelingTime: busWeeklyTravelingTime,
        annualTravelingTime: busAnnualTravelingTime
      })
      this.amounts.mobility_taxi_amount = estimateTaxiAnnualAmount({
        weeklyTravelingTime: otherCarWeeklyTravelingTime,
        annualTravelingTime: otherCarAnnualTravelingTime
      })
      this.amounts['mobility_private-car-driving_amount'] =
        estimatePrivateCarDrivingAmount({ mileage: privateCarAnnualMileage })
      this.amounts['mobility_bicycle-driving_amount'] =
        estimateBicycleDrivingAnnualAmount()
      this.amounts['mobility_private-car-purchase_amount'] =
        estimatePrivateCarPurchaseAmount({
          annualMileage: privateCarAnnualMileage
        })
      this.amounts['mobility_car-sharing-driving_amount'] =
        estimateCarSharingDrivingAnnualAmount({
          weeklyTravelingTime: otherCarWeeklyTravelingTime,
          annualTravelingTime: otherCarAnnualTravelingTime
        })
      this.amounts['mobility_car-sharing-rental_amount'] =
        estimateCarSharingRentalAnnualAmount({
          weeklyTravelingTime: otherCarWeeklyTravelingTime,
          annualTravelingTime: otherCarAnnualTravelingTime
        })

      this.amounts['mobility_private-car-maintenance_amount'] =
        estimatePrivateCarMaintenanceAmount({
          annualMileage: privateCarAnnualMileage
        })

      this.amounts['mobility_bicycle-maintenance_amount'] =
        estimateBicycleMaintenanceAnnualAmount()
    }

    addAction = (
      domainItemType: string,
      option: string,
      value: number
    ): void => {
      this.actions[domainItemType + '_' + option] = value
    }

    findEstimation(domainItemType: string): number {
      return this.amounts[domainItemType]
    }

    findAction(domainItemType: string, option: string): number {
      const value = this.actions[domainItemType + '_' + option]
      return isNaN(value) ? this.findEstimation(domainItemType) : value
    }
  }

  const diagnoses = new DiagnosesImpl()
  const taxiAmount = increaseRate(
    diagnoses.findEstimation('mobility_taxi_amount'),
    -1
  )
  test('taxi_amount', () => {
    expect(taxiAmount).toBeCloseTo(0)
  })

  const privateCarDrivingAmount = increaseRate(
    diagnoses.findEstimation('mobility_private-car-driving_amount'),
    -0.704901961
  )
  test('private-car-driving_amount', () => {
    expect(privateCarDrivingAmount).toBeCloseTo(1475.49019607844)
  })

  diagnoses.addAction('mobility_taxi_amount', 'dailyshift', taxiAmount)
  diagnoses.addAction(
    'mobility_private-car-driving_amount',
    'dailyshift',
    privateCarDrivingAmount
  )

  test('mobility_train_amount', () => {
    expect(
      shiftFromOtherItems(
        diagnoses.findEstimation('mobility_train_amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
        0.333333333,
        diagnoses
      )
    ).toBeCloseTo(18232.1992366984)
  })

  test('mobility_bus_amount', () => {
    expect(
      shiftFromOtherItems(
        diagnoses.findEstimation('mobility_bus_amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
        0.333333333,
        diagnoses
      )
    ).toBeCloseTo(3022.19923669836)
  })

  test('mobility_bicycle-driving_amount', () => {
    const bicycleDrivingAmount = shiftFromOtherItems(
      diagnoses.findEstimation('mobility_bicycle-driving_amount'),
      'dailyshift',
      ['mobility_private-car-driving_amount', 'mobility_taxi_amount'],
      0.333333333,
      diagnoses
    )
    expect(bicycleDrivingAmount).toBeCloseTo(1796.21257212208)
    diagnoses.addAction(
      'mobility_bicycle-driving_amount',
      'dailyshift',
      bicycleDrivingAmount
    )
  })

  // test mobility_private-car-purchase_amount
  test('mobility_private-car-purchase_amount', () => {
    expect(
      proportionalToOtherItems(
        diagnoses.findEstimation('mobility_private-car-purchase_amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount'],
        1,
        diagnoses
      )
    ).toBeCloseTo(0.014786433479391)
  })

  // test mobility_car-sharing-rental_amount
  test('mobility_car-sharing-rental_amount', () => {
    expect(
      proportionalToOtherItems(
        diagnoses.findEstimation('mobility_car-sharing-rental_amount'),
        'dailyshift',
        ['mobility_car-sharing-driving_amount'],
        1,
        diagnoses
      )
    ).toBeCloseTo(3.5897022020565)
  })

  // test mobility_private-car-maintenance_amount
  test('mobility_private-car-maintenance_amount', () => {
    expect(
      proportionalToOtherItems(
        diagnoses.findEstimation('mobility_private-car-maintenance_amount'),
        'dailyshift',
        ['mobility_private-car-driving_amount'],
        1,
        diagnoses
      )
    ).toBeCloseTo(18.9384233919727)
  })

  // test mobility_bicycle-maintenance_amount
  test('mobility_bicycle-maintenance_amount', () => {
    expect(
      proportionalToOtherItems(
        diagnoses.findEstimation('mobility_bicycle-maintenance_amount'),
        'dailyshift',
        ['mobility_bicycle-driving_amount'],
        1,
        diagnoses
      )
    ).toBeCloseTo(2.76676070917255)
  })
})

// test zeh case
describe('zeh', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'
  const gasItem: GasItem = 'urban-gas'
  const gasMonth: Month = 'january'
  const gasMonthlyConsumption = 15
  const keroseneMonthlyConsumption = 200
  const keroseneMonthCount = 2

  class DiagnosesImpl implements Diagnoses {
    private readonly amounts: Record<string, number> = {}
    private readonly actions: Record<string, number> = {}

    constructor() {
      this.amounts['housing_housing-maintenance_amount'] =
        estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
      this.amounts.electricity = estimateElectricityAnnualAmount({
        monthlyConsumption: electricityMonthlyConsumption,
        month: electricityMonth,
        residentCount
      })

      this.amounts.housing_electricity_amount = estimateElectricityAnnualAmount(
        {
          monthlyConsumption: electricityMonthlyConsumption,
          month: electricityMonth,
          residentCount
        }
      )

      this.amounts['housing_urban-gas_amount'] = estimateGasAnnualAmount(
        gasItem,
        {
          monthlyConsumption: gasMonthlyConsumption,
          month: gasMonth,
          residentCount
        }
      )

      this.amounts.housing_lpg_amount = 0
      this.amounts.housing_kerosene_amount = estimateKeroseneAnnualAmount({
        monthlyConsumption: keroseneMonthlyConsumption,
        monthCount: keroseneMonthCount,
        residentCount
      })
      this.amounts['housing_other-energy_amount'] =
        estimateOtherEnergyAnnualAmount()
    }

    addAction = (
      domainItemType: string,
      option: string,
      value: number
    ): void => {
      this.actions[domainItemType + '_' + option] = value
    }

    findEstimation(domainItemType: string): number {
      return this.amounts[domainItemType]
    }

    findAction(domainItemType: string, option: string): number {
      const value = this.actions[domainItemType + '_' + option]
      return isNaN(value) ? this.findEstimation(domainItemType) : value
    }
  }

  const diagnoses = new DiagnosesImpl()

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    const housingMaintenanceAmount = increaseRate(
      diagnoses.findEstimation('housing_housing-maintenance_amount'),
      0.7449956
    )
    expect(housingMaintenanceAmount).toBeCloseTo(29.6565001221022)
    diagnoses.addAction(
      'housing_housing-maintenance_amount',
      'zeh',
      housingMaintenanceAmount
    )
  })

  // test housing_urban-gas_amount
  test('housing_urban-gas_amount', () => {
    const urbanGasAmount = absoluteTarget(0)
    expect(urbanGasAmount).toBeCloseTo(0.0)
    diagnoses.addAction('housing_urban-gas_amount', 'zeh', urbanGasAmount)
  })

  // test housing_lpg_amount
  test('housing_lpg_amount', () => {
    const lpgAmount = absoluteTarget(0)
    expect(lpgAmount).toBeCloseTo(0.0)
    diagnoses.addAction('housing_lpg_amount', 'zeh', lpgAmount)
  })

  // test housing_kerosene_amount
  test('housing_kerosene_amount', () => {
    const keroseneAmount = absoluteTarget(0)
    expect(keroseneAmount).toBeCloseTo(0.0)
    diagnoses.addAction('housing_kerosene_amount', 'zeh', keroseneAmount)
  })

  // test housing_other-energy_amount
  test('housing_other-energy_amount', () => {
    const otherEnergyAmount = absoluteTarget(0)
    expect(otherEnergyAmount).toBeCloseTo(0.0)
    diagnoses.addAction('housing_other-energy_amount', 'zeh', otherEnergyAmount)
  })

  // test housing_electricity_intensity
  test('housing_electricity_intensity', () => {
    const electricityIntensity = absoluteTarget(0.042861845)
    expect(electricityIntensity).toBeCloseTo(0.042861845)
    diagnoses.addAction(
      'housing_electricity_intensity',
      'zeh',
      electricityIntensity
    )
  })

  // test housing_electricity_amount
  test('housing_electricity_amount', () => {
    expect(
      shiftFromOtherItemsThenReductionRate(
        diagnoses.findEstimation('housing_electricity_amount'),
        'zeh',
        [
          'housing_urban-gas_amount',
          'housing_lpg_amount',
          'housing_kerosene_amount',
          'housing_other-energy_amount'
        ],
        0.369,
        -0.2,
        diagnoses
      )
    ).toBeCloseTo(3533.7319988604)
  })
})
