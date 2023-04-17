import {
  absoluteTarget,
  addAmount,
  drivingIntensityToEvPhv,
  foodAmountToAverageWithoutFoodLoss,
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
  type FoodLeftover
} from '../../ts/common/types'
import { estimateFoodIntakeAnnualAmount } from '../../ts/food/food-intake'
import { estimatePrivateCarDrivingIntensity } from '../../ts/mobility/private-car-driving'
import { estimatePrivateCarPurchaseIntensity } from '../../ts/mobility/private-car-purchase'

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

// test the mobilityDrivingIntensityAnswerToTarget function
describe('mobilityDrivingIntensityQuestionAnswerToTarget', () => {
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

// test the mobilityManufacturingIntensityAnswerToTarget function
describe('mobilityManufacturingIntensityQuestionAnswerToTarget', () => {
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

// test the foodAmountToAverageQuestionAnswerToTarget function
describe('foodAmountToAverageQuestionAnswerToTarget', () => {
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
