import {
  absoluteTarget,
  addAmount,
  drivingIntensityToEvPhv,
  drivingIntensityToPrivateCarRideshare,
  drivingIntensityToTaxiRideshare,
  foodAmountToAverageWithoutFoodLoss,
  furtherReductionFromOtherFootprints,
  housingInsulationClothing,
  housingInsulationRenovation,
  increaseRate,
  manufacturingIntensityToEvPhv,
  proportionalToOtherFootprints,
  proportionalToOtherItems,
  reboundFromOtherFootprints,
  shiftFromOtherItems,
  shiftFromOtherItemsThenReductionRate,
  type Diagnoses
} from '../../ts/action/action'
import {
  type AlcoholFrequency,
  type CarCharging,
  type CarPassengers,
  type CarType,
  type DairyFoodFrequency,
  type DishFrequency,
  type ElectricityType,
  type FoodDirectWaste,
  type FoodIntake,
  type FoodIntakeItem,
  type FoodLeftover,
  type GasItem,
  type HousingInsulation,
  type HousingSize,
  type Month,
  type SoftDrinkSnackExpenses
} from '../../ts/common/types'
import {
  estimateDairyFoodAnnualAmounts,
  estimateDairyFoodIntensities
} from '../../ts/food/dairy-food'
import {
  estimateDishAnnualAmounts,
  estimateDishIntensities
} from '../../ts/food/dish'
import { estimateEatOutIntensity } from '../../ts/food/eat-out'
import {
  estimateFoodIntakeAnnualAmount,
  estimateFoodIntakeIntensity
} from '../../ts/food/food-intake'
import {
  estimateProcessedMeatAnnualAmount,
  estimateProcessedMeatIntensity
} from '../../ts/food/processed-meat'
import { estimateReadyMealIntensity } from '../../ts/food/ready-meal'
import {
  estimateElectricityAnnualAmount,
  estimateElectricityIntensity
} from '../../ts/housing/electricity'
import {
  estimateGasAnnualAmount,
  estimateGasIntensity
} from '../../ts/housing/gas'
import {
  estimateHousingMaintenanceAnnualAmount,
  estimateHousingMaintenanceIntensity
} from '../../ts/housing/housing-maintenance'
import {
  estimateKeroseneAnnualAmount,
  estimateKeroseneIntensity
} from '../../ts/housing/kerosene'
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

class DiagnosesImpl implements Diagnoses {
  private readonly items: Record<string, number> = {}
  private readonly actions: Record<string, number> = {}

  addItem = (domainItemType: string, value: number): void => {
    this.items[domainItemType] = value
  }

  addAction = (domainItemType: string, option: string, value: number): void => {
    this.actions[domainItemType + '_' + option] = value
  }

  findEstimation(domainItemType: string): number {
    return this.items[domainItemType]
  }

  findAction(domainItemType: string, option: string): number {
    const value = this.actions[domainItemType + '_' + option]
    return isNaN(value) ? this.findEstimation(domainItemType) : value
  }
}

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

  const diagnoses = new DiagnosesImpl()
  diagnoses.addItem(
    'mobility_train_amount',
    estimateTrainAnnualAmount({
      weeklyTravelingTime: trainWeeklyTravelingTime,
      annualTravelingTime: trainAnnualTravelingTime
    })
  )
  diagnoses.addItem(
    'mobility_bus_amount',
    estimateBusAnnualAmount({
      weeklyTravelingTime: busWeeklyTravelingTime,
      annualTravelingTime: busAnnualTravelingTime
    })
  )
  diagnoses.addItem(
    'mobility_taxi_amount',
    estimateTaxiAnnualAmount({
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  diagnoses.addItem(
    'mobility_private-car-driving_amount',
    estimatePrivateCarDrivingAmount({ mileage: privateCarAnnualMileage })
  )
  diagnoses.addItem(
    'mobility_bicycle-driving_amount',
    estimateBicycleDrivingAnnualAmount()
  )
  diagnoses.addItem(
    'mobility_private-car-purchase_amount',
    estimatePrivateCarPurchaseAmount({
      annualMileage: privateCarAnnualMileage
    })
  )
  diagnoses.addItem(
    'mobility_car-sharing-driving_amount',
    estimateCarSharingDrivingAnnualAmount({
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  diagnoses.addItem(
    'mobility_car-sharing-rental_amount',
    estimateCarSharingRentalAnnualAmount({
      weeklyTravelingTime: otherCarWeeklyTravelingTime,
      annualTravelingTime: otherCarAnnualTravelingTime
    })
  )
  diagnoses.addItem(
    'mobility_private-car-maintenance_amount',
    estimatePrivateCarMaintenanceAmount({
      annualMileage: privateCarAnnualMileage
    })
  )
  diagnoses.addItem(
    'mobility_bicycle-maintenance_amount',
    estimateBicycleMaintenanceAnnualAmount()
  )

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

// test zeh01 case
describe('zeh01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'
  const gasItem: GasItem = 'urban-gas'
  const gasMonth: Month = 'january'
  const gasMonthlyConsumption = 15
  const keroseneMonthlyConsumption = 200
  const keroseneMonthCount = 2

  const diagnoses = new DiagnosesImpl()
  diagnoses.addItem(
    'housing_housing-maintenance_amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  diagnoses.addItem(
    'housing_electricity_amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  diagnoses.addItem(
    'housing_urban-gas_amount',
    estimateGasAnnualAmount(gasItem, {
      monthlyConsumption: gasMonthlyConsumption,
      month: gasMonth,
      residentCount
    })
  )
  diagnoses.addItem('housing_lpg_amount', 0)
  diagnoses.addItem(
    'housing_kerosene_amount',
    estimateKeroseneAnnualAmount({
      monthlyConsumption: keroseneMonthlyConsumption,
      monthCount: keroseneMonthCount,
      residentCount
    })
  )
  diagnoses.addItem(
    'housing_other-energy_amount',
    estimateOtherEnergyAnnualAmount()
  )

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

// test led01 case
describe('led01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricity: ElectricityType = 'conventional'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'

  const diagnoses = new DiagnosesImpl()
  diagnoses.addItem(
    'housing_electricity_amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  diagnoses.addItem(
    'housing_electricity_intensity',
    estimateElectricityIntensity({ electricity })
  )
  diagnoses.addItem(
    'housing_housing-maintenance_amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  diagnoses.addItem(
    'housing_housing-maintenance_intensity',
    estimateHousingMaintenanceIntensity()
  )

  // test housing_electricity_amount
  test('housing_electricity_amount', () => {
    const electricityAmount = increaseRate(
      diagnoses.findEstimation('housing_electricity_amount'),
      -0.0660406
    )
    expect(electricityAmount).toBeCloseTo(3206.52721639271)
    diagnoses.addAction('housing_electricity_amount', 'led', electricityAmount)
  })

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    expect(
      furtherReductionFromOtherFootprints(
        diagnoses.findEstimation('housing_housing-maintenance_amount'),
        diagnoses.findEstimation('housing_housing-maintenance_intensity'),
        'amount',
        'led',
        ['housing_electricity'],
        0.020622194,
        diagnoses
      )
    ).toBeCloseTo(19.1471336056997)
  })
})

// test vegan01 case
describe('vegan01', () => {
  const foodIntake: FoodIntake = 'very-much'
  const foodDirectWaste: FoodDirectWaste = '8-more-per-week'
  const foodLeftover: FoodLeftover = '8-more-per-week'
  const beefDishFrequency: DishFrequency = '2-3-per-month'
  const porkDishFrequency: DishFrequency = '2-3-per-month'
  const chickenDishFrequency: DishFrequency = '2-3-per-month'
  const seafoodDishFrequency: DishFrequency = '2-3-per-month'
  const dairyFoodFrequency: DairyFoodFrequency = '1-2-less-per-week'
  const alcoholFrequency: AlcoholFrequency = '2-3-less-per-month'
  const softDrinkSnackExpenses: SoftDrinkSnackExpenses = '15k-more'

  const diagnoses = new DiagnosesImpl()

  const foodIntakeItems: FoodIntakeItem[] = [
    'rice',
    'bread-flour',
    'noodle',
    'potatoes',
    'vegetables',
    'processed-vegetables',
    'beans',
    'fruits',
    'oil',
    'seasoning'
  ]

  // add items
  for (const item of foodIntakeItems) {
    diagnoses.addItem(
      'food_' + item + '_amount',
      estimateFoodIntakeAnnualAmount(item, {
        foodIntake,
        foodDirectWaste,
        foodLeftover
      })
    )
    diagnoses.addItem(
      'food_' + item + '_intensity',
      estimateFoodIntakeIntensity(item)
    )
  }

  // beef, pork, chicken, other-meat, fish, processed-fish
  const dishAmounts = estimateDishAnnualAmounts({
    foodDirectWaste,
    foodLeftover,
    beefDishFrequency,
    porkDishFrequency,
    chickenDishFrequency,
    seafoodDishFrequency
  })
  for (const item in dishAmounts) {
    diagnoses.addItem('food_' + item + '_amount', dishAmounts[item])
  }

  const dishIntensities = estimateDishIntensities()
  for (const item in dishIntensities) {
    diagnoses.addItem('food_' + item + '_intensity', dishIntensities[item])
  }

  // milk, other-dairy, eggs
  const dairyFoodAmounts = estimateDairyFoodAnnualAmounts({
    foodDirectWaste,
    foodLeftover,
    frequency: dairyFoodFrequency
  })
  for (const item in dairyFoodAmounts) {
    diagnoses.addItem('food_' + item + '_amount', dairyFoodAmounts[item])
  }

  const dairyFoodIntensities = estimateDairyFoodIntensities()
  for (const item in dairyFoodIntensities) {
    diagnoses.addItem('food_' + item + '_intensity', dairyFoodIntensities[item])
  }

  // processed-meat
  diagnoses.addItem(
    'food_processed-meat_amount',
    estimateProcessedMeatAnnualAmount({
      foodDirectWaste,
      foodLeftover,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency
    })
  )
  diagnoses.addItem(
    'food_processed-meat_intensity',
    estimateProcessedMeatIntensity()
  )

  // ready-meal
  diagnoses.addItem(
    'food_ready-meal_intensity',
    estimateReadyMealIntensity({
      foodDirectWaste,
      foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      softDrinkSnackExpenses
    })
  )

  // restaurant
  diagnoses.addItem(
    'food_restaurant_intensity',
    estimateEatOutIntensity('restaurant', {
      foodDirectWaste,
      foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      alcoholFrequency,
      softDrinkSnackExpenses
    })
  )

  // bar-cafe
  diagnoses.addItem(
    'food_bar-cafe_intensity',
    estimateEatOutIntensity('bar-cafe', {
      foodDirectWaste,
      foodLeftover,
      foodIntake,
      beefDishFrequency,
      porkDishFrequency,
      chickenDishFrequency,
      seafoodDishFrequency,
      dairyFoodFrequency,
      alcoholFrequency,
      softDrinkSnackExpenses
    })
  )

  const addIncreaseRateAction = (
    domainItemType: string,
    rate: number
  ): void => {
    diagnoses.addAction(
      domainItemType,
      'vegan',
      increaseRate(diagnoses.findEstimation(domainItemType), rate)
    )
  }

  const addAbsoluteTargetAction = (
    domainItemType: string,
    target: number
  ): void => {
    diagnoses.addAction(domainItemType, 'vegan', absoluteTarget(target))
  }

  addIncreaseRateAction('food_rice_amount', -0.181818182)
  addIncreaseRateAction('food_bread-flour_amount', -0.181818182)
  addIncreaseRateAction('food_noodle_amount', -0.181818182)
  addIncreaseRateAction('food_potatoes_amount', 0.363636364)
  addIncreaseRateAction('food_vegetables_amount', 0.363636364)
  addIncreaseRateAction('food_processed-vegetables_amount', 0.363636364)

  addAbsoluteTargetAction('food_milk_amount', 0)
  addAbsoluteTargetAction('food_other-dairy_amount', 0)
  addAbsoluteTargetAction('food_eggs_amount', 0)
  addAbsoluteTargetAction('food_beef_amount', 0)
  addAbsoluteTargetAction('food_pork_amount', 0)
  addAbsoluteTargetAction('food_chicken_amount', 0)
  addAbsoluteTargetAction('food_other-meat_amount', 0)
  addAbsoluteTargetAction('food_processed-meat_amount', 0)
  addAbsoluteTargetAction('food_fish_amount', 0)
  addAbsoluteTargetAction('food_processed-fish_amount', 0)

  diagnoses.addAction(
    'food_beans_amount',
    'vegan',
    shiftFromOtherItems(
      diagnoses.findEstimation('food_beans_amount'),
      'vegan',
      [
        'food_milk_amount',
        'food_other-dairy_amount',
        'food_eggs_amount',
        'food_beef_amount',
        'food_pork_amount',
        'food_chicken_amount',
        'food_other-meat_amount',
        'food_processed-meat_amount',
        'food_fish_amount',
        'food_processed-fish_amount'
      ],
      1,
      diagnoses
    )
  )

  test('food_beans_amount', () => {
    expect(diagnoses.findAction('food_beans_amount', 'vegan')).toBeCloseTo(
      64.9510941476434
    )
  })

  const domainItems = [
    'food_rice',
    'food_bread-flour',
    'food_noodle',
    'food_potatoes',
    'food_vegetables',
    'food_processed-vegetables',
    'food_beans',
    'food_milk',
    'food_other-dairy',
    'food_eggs',
    'food_beef',
    'food_pork',
    'food_chicken',
    'food_other-meat',
    'food_processed-meat',
    'food_fish',
    'food_processed-fish',
    'food_fruits',
    'food_oil',
    'food_seasoning'
  ]

  // test food_ready-meal_intensity
  test('food_ready-meal_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        diagnoses.findEstimation('food_ready-meal_intensity'),
        'vegan',
        domainItems,
        1,
        diagnoses
      )
    ).toBeCloseTo(3.58274908840034)
  })

  // test food_restaurant_intensity
  test('food_restaurant_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        diagnoses.findEstimation('food_restaurant_intensity'),
        'vegan',
        domainItems,
        0.7157,
        diagnoses
      )
    ).toBeCloseTo(2.24004125926062)
  })

  // test food_bar-cafe_intensity
  test('food_bar-cafe_intensity', () => {
    expect(
      proportionalToOtherFootprints(
        diagnoses.findEstimation('food_bar-cafe_intensity'),
        'vegan',
        domainItems,
        0.7157,
        diagnoses
      )
    ).toBeCloseTo(2.25462895912396)
  })
})

// test ac01 case
describe('ac01', () => {
  const residentCount = 2
  const housingSize: HousingSize = '2-room'
  const electricity: ElectricityType = 'conventional'
  const electricityMonthlyConsumption = 750
  const electricityMonth: Month = 'january'
  const gasItem: GasItem = 'urban-gas'
  const gasMonth: Month = 'january'
  const gasMonthlyConsumption = 15
  const keroseneMonthlyConsumption = 200
  const keroseneMonthCount = 2

  const diagnoses = new DiagnosesImpl()

  diagnoses.addItem(
    'housing_housing-maintenance_amount',
    estimateHousingMaintenanceAnnualAmount({ residentCount, housingSize })
  )
  diagnoses.addItem(
    'housing_housing-maintenance_intensity',
    estimateHousingMaintenanceIntensity()
  )

  diagnoses.addItem(
    'housing_electricity_amount',
    estimateElectricityAnnualAmount({
      monthlyConsumption: electricityMonthlyConsumption,
      month: electricityMonth,
      residentCount
    })
  )
  diagnoses.addItem(
    'housing_electricity_intensity',
    estimateElectricityIntensity({
      electricity
    })
  )

  diagnoses.addItem(
    'housing_urban-gas_amount',
    estimateGasAnnualAmount(gasItem, {
      monthlyConsumption: gasMonthlyConsumption,
      month: gasMonth,
      residentCount
    })
  )
  diagnoses.addItem(
    'housing_urban-gas_intensity',
    estimateGasIntensity(gasItem)
  )

  diagnoses.addItem('housing_lpg_amount', 0)
  diagnoses.addItem('housing_lpg_intensity', estimateGasIntensity('lpg'))

  diagnoses.addItem(
    'housing_kerosene_amount',
    estimateKeroseneAnnualAmount({
      monthlyConsumption: keroseneMonthlyConsumption,
      monthCount: keroseneMonthCount,
      residentCount
    })
  )
  diagnoses.addItem('housing_kerosene_intensity', estimateKeroseneIntensity())

  const addIncreaseRateAction = (
    domainItemType: string,
    rate: number
  ): void => {
    diagnoses.addAction(
      domainItemType,
      'ac',
      increaseRate(diagnoses.findEstimation(domainItemType), rate)
    )
  }

  addIncreaseRateAction('housing_urban-gas_amount', -0.234432234)
  addIncreaseRateAction('housing_lpg_amount', -0.082599119)
  addIncreaseRateAction('housing_kerosene_amount', -0.771779141)

  const electricityAmount = shiftFromOtherItems(
    diagnoses.findEstimation('housing_electricity_amount'),
    'ac',
    [
      'housing_urban-gas_amount',
      'housing_lpg_amount',
      'housing_kerosene_amount'
    ],
    0.2125,
    diagnoses
  )

  // test electricity amount
  test('housing_electricity_amount', () => {
    expect(electricityAmount).toBeCloseTo(3796.17610953312)
  })

  diagnoses.addAction('housing_electricity_amount', 'ac', electricityAmount)

  // test housing_housing-maintenance_amount
  test('housing_housing-maintenance_amount', () => {
    expect(
      reboundFromOtherFootprints(
        diagnoses.findEstimation('housing_housing-maintenance_amount'),
        diagnoses.findEstimation('housing_housing-maintenance_intensity'),
        'amount',
        'ac',
        [
          'housing_electricity',
          'housing_urban-gas',
          'housing_lpg',
          'housing_kerosene'
        ],
        -0.015345044,
        diagnoses
      )
    ).toBeCloseTo(19.8033015569162)
  })
})
