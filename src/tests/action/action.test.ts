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
  manufacturingIntensityToEvPhv
} from '../../ts/action/action'
import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType,
  type FoodDirectWaste,
  type FoodIntake,
  type FoodLeftover,
  type HousingInsulation
} from '../../ts/common/types'
import { estimateFoodIntakeAnnualAmount } from '../../ts/food/food-intake'
import { estimateElectricityAnnualAmount } from '../../ts/housing/electricity'
import { estimateGasAnnualAmount } from '../../ts/housing/gas'
import { estimateKeroseneAnnualAmount } from '../../ts/housing/kerosene'
import { estimateCarSharingDrivingIntensity } from '../../ts/mobility/car-sharing-driving'
import { estimatePrivateCarDrivingIntensity } from '../../ts/mobility/private-car-driving'
import { estimatePrivateCarPurchaseIntensity } from '../../ts/mobility/private-car-purchase'
import { estimateTaxiIntensity } from '../../ts/mobility/taxi'

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
