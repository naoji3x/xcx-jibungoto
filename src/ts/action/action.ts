/**
 * カーボンフットプリント・改善アクションの分析結果を検索するためのインターフェース
 */
export interface Diagnoses {
  /**
   * 活動量、GHG原単位の推定値を取得する
   * @param domainItemType 活動量、GHG原単位を取得する要素を指定。domain, item, typeを_で結合したキー
   * @returns 活動量もしくはGHG原単位
   */
  findEstimation: (domainItemType: string) => number

  /**
   * 削減施策後の活動量、GHG原単位を取得する
   * @param domainItemType 活動量、GHG原単位を取得する要素を指定。domain, item, typeを_で結合したキー
   * @param option 削減施策
   * @returns 活動量もしくはGHG原単位
   */
  findAction: (domainItemType: string, option: string) => number
}

//
// Phase 1
//

// [削減後] = [value]
export const absoluteTarget = (target: number): number => target

// [削減後] = [削減前] + [value]
export const addAmount = (base: number, addition: number): number =>
  base + addition

// [削減後] = [削減前] x (1+[value])
export const increaseRate = (base: number, rate: number): number =>
  base * (1 + rate)

// [削減後] = [削減前] x (1+[value])
export const reductionRate = (base: number, rate: number): number =>
  increaseRate(base, rate)

// question-answer-to-target-inverse
// ride shareだけなのでride shareに特化した実装
export const questionAnswerToTargetInverse = (
  base: number,
  target: string,
  taxiPassengers: number,
  passengersAfterAction: number,
  privateCarPassengers: number
): number =>
  target === 'mobility_taxi-car-passengers'
    ? (base * taxiPassengers) / passengersAfterAction
    : (base * privateCarPassengers) / passengersAfterAction

// car-ev-phv, car-ev-phv-re, lossで適用。
// argsは、mobility_driving-intensity, mobility_manufacturing-intensity, food_food-amount-to-average
export const questionAnswerToTarget = (
  base: number,
  target: string,
  intensityAfterAction: number,
  carDrivingIntensity: number,
  carManufacturingIntensity: number,
  foodPurchaseAmountConsideringFoodLossRate: number
): number => {
  if (target === 'mobility_driving-intensity') {
    return (base * intensityAfterAction) / carDrivingIntensity
  } else if (target === 'mobility_manufacturing-intensity') {
    return (base * intensityAfterAction) / carManufacturingIntensity
  } else if (target === 'food_food-amount-to-average') {
    return (
      (base * intensityAfterAction) / foodPurchaseAmountConsideringFoodLossRate
    )
  }
  return base
}

// insrenov, clothes-homeのみ
export const questionReductionRate = (
  base: number,
  target: string,
  reductionRate: number,
  renovationHousingInsulation: number,
  clothingHousingInsulation: number
): number => {
  if (target === 'housing_housing-insulation-renovation') {
    return base * (1 + reductionRate * renovationHousingInsulation)
  } else if (target === 'housing_housing-insulation-clothing') {
    return base * (1 + reductionRate * clothingHousingInsulation)
  }
  return base
}

//
// Phase 2
//

// [削減後] = [削減前] - Σ([valueに指定した複数項目の削減後]-[valueで指定した複数項目の削減前]) x [value2で指定した代替率]
export const shiftFromOtherItems = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  substitutionRate: number,
  diagnoses: Diagnoses
): number => {
  const sum = domainItemTypes.reduce(
    (sum, key) =>
      sum + diagnoses.findAction(key, option) - diagnoses.findEstimation(key),
    0
  )
  return base - sum * substitutionRate
}

// zeh用の計算
export const shiftFromOtherItemsThenReductionRate = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  conversionFactor: number, // 電力の一次エネルギー換算係数
  reductionRate: number, // 省エネ化後の一次エネルギー消費量の削減率（２割減=-0.2）
  diagnoses: Diagnoses
): number => {
  const sum = domainItemTypes.reduce(
    (sum, key) =>
      sum + diagnoses.findAction(key, option) - diagnoses.findEstimation(key),
    0
  )
  return (
    (base / conversionFactor - sum) * (1 + reductionRate) * conversionFactor
  )
}

// [削減後] = [削減前] x (1-[value2で指定した影響割合])
//  + [削減前] x [value2で指定した影響割合] x (Σ[valueで指定した複数項目の削減後] /Σ[valueで指定した複数項目の削減前])
export const proportionalToOtherItems = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  rate: number,
  diagnoses: Diagnoses
): number => {
  const sumBefore = domainItemTypes.reduce(
    (sum, key) => sum + diagnoses.findEstimation(key),
    0
  )
  const sumAfter = domainItemTypes.reduce(
    (sum, key) =>
      sum +
      (diagnoses.findAction(key, option) ?? diagnoses.findEstimation(key)),
    0
  )

  return sumBefore !== 0
    ? base * (1 - rate) + base * rate * (sumAfter / sumBefore)
    : base
}

//
// Phase 3
//

// [削減後] = [削減前] x (1-[value2で指定した影響割合])
//  + [削減前] x [value2で指定した影響割合] x ([valueで指定したフットプリントの削減後] / [valueで指定したフットプリントの削減前])
export const proportionalToOtherFootprints = (
  base: number,
  option: string,
  domainItems: readonly string[],
  rate: number,
  diagnoses: Diagnoses
): number => {
  let sumBefore = 0
  let sumAfter = 0

  for (const key of domainItems) {
    const ab = diagnoses.findEstimation(key + '_amount') ?? 0 // amountBefore
    const aa = diagnoses.findAction(key + '_amount', option) ?? ab // amountAfter

    const ib = diagnoses.findEstimation(key + '_intensity') ?? 0 // intensityBefore
    const ia = diagnoses.findAction(key + '_intensity', option) ?? ib // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }
  return sumBefore !== 0
    ? (base = base * (1 - rate) + base * rate * (sumAfter / sumBefore))
    : base
}

// [削減後] = [削減前] + (Σ[valueで指定したフットプリントの削減後] - Σ[valueで指定したフットプリントの削減前]) x [value2で指定したリバウンド割合]
export const furtherReductionFromOtherFootprints = (
  base: number,
  domainItemType: string,
  option: string,
  domainItems: readonly string[],
  reboundRate: number,
  diagnoses: Diagnoses,
  sign: number = -1
): number => {
  let sumBefore = 0
  let sumAfter = 0
  for (const key of domainItems) {
    const ab = diagnoses.findEstimation(key + '_amount') ?? 0 // amountBefore
    const aa = diagnoses.findAction(key + '_amount', option) ?? ab // amountAfter
    const ib = diagnoses.findEstimation(key + '_intensity') ?? 0 // intensityBefore
    const ia = diagnoses.findAction(key + '_intensity', option) ?? ib // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }

  const keys = domainItemType.split('_')
  const domainItem = keys[0] + '_' + keys[1]
  const type = keys[2]

  let amount = 0
  let intensity = 0
  let denominator = 1

  if (type === 'amount') {
    amount = base
    intensity = diagnoses.findEstimation(domainItem + '_intensity')
    denominator = intensity
  } else {
    intensity = base
    amount = diagnoses.findEstimation(domainItem + '_amount')
    denominator = amount
  }
  return (
    (amount * intensity + sign * (sumAfter - sumBefore) * reboundRate) /
    denominator
  )
}

export const reboundFromOtherFootprints = (
  base: number,
  domainItemType: string,
  option: string,
  domainItems: string[],
  reboundRate: number,
  diagnoses: Diagnoses
): number =>
  furtherReductionFromOtherFootprints(
    base,
    domainItemType,
    option,
    domainItems,
    reboundRate,
    diagnoses,
    1
  )
