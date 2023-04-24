import {
  type CarCharging,
  type CarPassengers,
  type CarType,
  type ElectricityType,
  type FoodDirectWasteFrequency,
  type FoodLeftoverFrequency,
  type HousingInsulation
} from '../common/types'
import { getParameter } from '../data/database'
import { estimateFoodLossRate } from '../food/rate-calculation'
import { estimateCarDrivingIntensityFactor } from '../mobility/factor-calculation'

/**
 * カーボンフットプリント・改善アクションの分析結果を検索するためのインターフェース
 */
export interface Diagnoses {
  /**
   * 活動量、GHG原単位の推定値を取得する（推定値がない場合はベースライン値を返す）
   * @param domainItemType 活動量、GHG原単位を取得する要素を指定。domain, item, typeを_で結合したキー
   * @returns 活動量もしくはGHG原単位（推定値、ベースライン値ともない場合はNaNを返す）
   */
  findEstimation: (domainItemType: string) => number

  /**
   * 削減施策後の活動量、GHG原単位を取得する（削減後の値がない場合は、推定値、ベースライン値を返す）
   * @param domainItemType 活動量、GHG原単位を取得する要素を指定。domain, item, typeを_で結合したキー
   * @param option 削減施策
   * @returns 活動量もしくはGHG原単位（削減後の値、推定値、ベースライン値がない場合はNaNを返す）
   */
  findAction: (domainItemType: string, option: string) => number
}

//
// Phase 1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
//

/**
 * [削減後] = [target] 選択肢を最大限採用した場合に理論的に到達できる絶対値を指定
 * 例）テレワークを最大限実施した場合、通勤分のみ削減される
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @param target 削減後の絶対値を指定
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const absoluteTarget = (target: number): number => target

/**
 * [削減後] = [削減前(base)] + [addition] あらかじめ定めたの値(addition)を増加する
 * 例）ゼロエネルギー住宅の設備費増加分
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @param base 削減前の値
 * @param addition 増加分の値
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const addAmount = (base: number, addition: number): number =>
  base + addition

/**
 * [削減後] = [削減前(base)] x (1+[rate])
 * 例）テレワークを最大限実施した場合、通勤分のみ削減される
 * その選択肢を最大限採用した場合に削減が可能な割合を指定（rate < 0で削減、rate > 0で増加）
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * @param base 削減前の値
 * @param rate 削減比率
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const increaseRate = (base: number, rate: number): number =>
  base * (1 + rate)

/**
 * [削減後] = [削減前(base)] x ([推定値を算出した質問票回答の値]/[passengersAfterActionで指定した絶対値])
 * 例）ライドシェアリングにより自家用車の乗車人数が質問票で把握した人数から4人に増加した場合、
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: rideshare, operation: question-answer-to-target-inverse,
 * args: mobility_taxi-car-passengers に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTargetInverse
 * 原単位の変化としてはこれらの比率の逆数として計算される
 * @param base 削減前の値
 * @param passengersAfterAction 削減後の乗車人数
 * @param baseCarPassengers 削減前平均乗車人数
 * @returns GHG原単位
 */
export const drivingIntensityToTaxiRideshare = (
  base: number,
  passengersAfterAction: number,
  baseCarPassengers: CarPassengers
): number => {
  const passengersBeforeAction = getParameter(
    'car-passengers',
    baseCarPassengers + '_taxi-passengers'
  ).value
  return (base * passengersBeforeAction) / passengersAfterAction
}

/**
 * [削減後] = [削減前(base)] x ([推定値を算出した質問票回答の値]/[passengersAfterActionで指定した絶対値])
 * 例）ライドシェアリングにより自家用車の乗車人数が質問票で把握した人数から4人に増加した場合、
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: rideshare, operation: question-answer-to-target-inverse,
 * args: private-car-driving に特化した実装
 * 原単位の変化としてはこれらの比率の逆数として計算される
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTargetInverse
 * @param base 削減前の値
 * @param baseCarPassengers 削減前平均乗車人数
 * @param passengersAfterAction 削減後の乗車人数
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const drivingIntensityToPrivateCarRideshare = (
  base: number,
  passengersAfterAction: number,
  baseCarPassengers: CarPassengers
): number => {
  const passengersBeforeAction = getParameter(
    'car-passengers',
    baseCarPassengers + '_private-car-passengers'
  ).value
  return (base * passengersBeforeAction) / passengersAfterAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: loss, operation: question-answer-to-target,
 * args: food_food-amount-to-average に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param foodDirectWaste
 * @param foodLeftover
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const foodAmountToAverageWithoutFoodLoss = (
  base: number,
  valueAfterAction: number,
  foodDirectWaste: FoodDirectWasteFrequency = 'unknown',
  foodLeftover: FoodLeftoverFrequency = 'unknown'
): number => {
  const valueBeforeAction = estimateFoodLossRate(foodDirectWaste, foodLeftover)
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: car-ev-phv, car-ev-phv-re, operation: question-answer-to-target,
 * args: mobility_driving-intensity に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param carType
 * @param carCharging
 * @param electricityType
 * @returns 削減後のGHG原単位
 */
export const drivingIntensityToEvPhv = (
  base: number,
  valueAfterAction: number,
  carType: CarType = 'unknown',
  carCharging: CarCharging = 'unknown',
  electricityType: ElectricityType = 'unknown'
): number => {
  const valueBeforeAction = estimateCarDrivingIntensityFactor(
    carType,
    carCharging,
    electricityType,
    'intensity'
  )
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前(base)] x ([valueAfterActionで指定した絶対値]/[推定値を算出した質問票回答の値])
 * フットプリント推計に用いた質問票回答のパラメーターがある絶対値へ変化する
 * 例）EV・PHVの導入により自家用車の排出原単位が質問票で把握した値から約0.084に増加
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * option: car-ev-phv, car-ev-phv-re, operation: question-answer-to-target,
 * args: mobility_manufacturing-intensity に特化した実装
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionAnswerToTarget
 * @param base 削減前の値
 * @param valueAfterAction 削減後の削減後の質問票の回答の値の絶対値
 * @param carType
 * @returns 削減後のGHG原単位
 */
export const manufacturingIntensityToEvPhv = (
  base: number,
  valueAfterAction: number,
  carType: CarType = 'unknown'
): number => {
  const valueBeforeAction = getParameter(
    'car-intensity-factor',
    carType + '_manufacturing-intensity'
  ).value
  return (base * valueAfterAction) / valueBeforeAction
}

/**
 * [削減後] = [削減前] x (1+[推定値を算出した質問票回答からの削減率] x [reductionRateで指定した影響割合])
 * 削減効果推定用の追加質問回答から求めた削減率の分だけ、一部(reductionRate)が削減される
 * 例）現在の住居の断熱基準に依存する削減率の分だけ、電力のうち冷暖房分が削減される
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * insrenovのhousing_housing-insulation-renovationで適用
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionReductionRate
 * @param base 削減前の値
 * @param reductionRate 削減の影響割合
 * @param housingInsulation リノベーションによる家の断熱
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const housingInsulationRenovation = (
  base: number,
  reductionRate: number,
  housingInsulation: HousingInsulation
): number => {
  const renovationHousingInsulation = getParameter(
    'housing-insulation',
    housingInsulation + '_renovation'
  ).value
  return base * (1 + reductionRate * renovationHousingInsulation)
}

/**
 * [削減後] = [削減前] x (1+[推定値を算出した質問票回答からの削減率] x [reductionRateで指定した影響割合])
 * 削減効果推定用の追加質問回答から求めた削減率の分だけ、一部(reductionRate)が削減される
 * 例）現在の住居の断熱基準に依存する削減率の分だけ、電力のうち冷暖房分が削減される
 * @remarks Phase1: 推定値があれば計算可能な削減施策（他の削減施策に依存しないので最初に計算可能）
 * clothes-homeのhousing_housing-insulation-clothingで適用
 * @privateRemarks JibungotoPlanet-Backendの初期バージョンではquestionReductionRate
 * @param base 削減前の値
 * @param reductionRate 削減の影響割合
 * @param housingInsulation 厚着による家の断熱
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const housingInsulationClothing = (
  base: number,
  reductionRate: number,
  housingInsulation: HousingInsulation
): number => {
  const clothingHousingInsulation = getParameter(
    'housing-insulation',
    housingInsulation + '_clothing'
  ).value
  return base * (1 + reductionRate * clothingHousingInsulation)
}

//
// Phase 2: 他の項目の削減量を参照して削減量を計算する施策（その1）
//

/**
 * [削減後] = [削減前] + Σ([他の項目の削減後]-[他の項目の削減前]) x [substitutionRateで指定した代替率]
 * 他の項目の削減分が代替率(substitutionRate)を掛け算した分だけその項目に転換される
 * 例）カーシェアリングにより自家用車の移動距離が削減された分、カーシェアリングの距離が増加する
 * @remarks Phase2: Phase 1の削減施策の計算結果に依存した削減施策
 * @param base 削減前の値
 * @param option 他の削減施策
 * @param domainItemTypes 転換する他の項目
 * @param substitutionRate 代替率
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @returns 削減後の活動量もしくはGHG原単位
 */
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

/**
 * [削減後] = [削減前(base)] / (電力の一次エネルギー換算係数 - Σ([他の項目の削減後]-[他の項目の削減前])
 *  x (1 + 省エネ化後の一次エネルギー消費量の削減率(２割減)) * 電力の一次エネルギー換算係数
 * @remarks Phase2: Phase 1の削減施策の計算結果に依存した削減施策
 * zehに特化した実装
 * @param base 削減前の値
 * @param option 転換する削減施策
 * @param domainItemTypes 転換する他の項目
 * @param conversionFactor 電力の一次エネルギー換算係数
 * @param reductionRate 省エネ化後の一次エネルギー消費量の削減率（２割減=-0.2）
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const shiftFromOtherItemsThenReductionRate = (
  base: number,
  option: string,
  domainItemTypes: readonly string[],
  conversionFactor: number,
  reductionRate: number,
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

//
// Phase 3: 他の項目の削減量を参照して削減量を計算する施策（その２）
//

/**
 * [削減後] = [削減前(base)] x (1-[rateで指定した影響割合])
 * + [削減前(base)] x [rateで指定した影響割合] x (Σ[他の項目の削減後] /Σ[他の項目の削減前])
 * 他の項目の削減の比率に従い、その項目の一部(rateで指定した影響割合）が削減される
 * 例）テレワークにより自動車移動距離が削減されると、維持管理・購入も同じ比率で削減
 * @remarks Phase3: Phase 1, 2の削減施策の計算結果に依存した削減施策
 * @param base 削減前の値
 * @param option 転換する削減施策
 * @param domainItemTypes 転換する他の項目
 * @param rate 影響割合
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @returns 削減後の活動量もしくはGHG原単位
 */
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
// Phase 4 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
//

/**
 * [削減後] = [削減前(base)] x (1-[rateで指定した影響割合])
 *  + [削減前(base)] x [value2で指定した影響割合] x ([valueで指定したフットプリントの削減後] / [valueで指定したフットプリントの削減前])
 * 他の複数項目のフットプリントの合計の前後比に従い削減比率(rateの割合)が増減
 * 例）菜食により自炊の食材構成が変化すると、自炊食材のフットプリントと同じ比率で惣菜・外食も削減
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param base 削減前の値
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param rate 削減割合
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @returns 削減後の活動量もしくはGHG原単位
 */
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
    const ab = diagnoses.findEstimation(key + '_amount') // amountBefore
    const aa = diagnoses.findAction(key + '_amount', option) // amountAfter

    const ib = diagnoses.findEstimation(key + '_intensity') // intensityBefore
    const ia = diagnoses.findAction(key + '_intensity', option) // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }
  return sumBefore !== 0
    ? base * (1 - rate) + base * rate * (sumAfter / sumBefore)
    : base
}

/**
 * [削減後] = [削減前(base)] +
 * (Σ[他のフットプリントの削減後] - Σ[他のフットプリントの削減前])
 * x [リバウンド割合(reboundRate)] ※sign=1で排出増加(リバウンド) sign=-1で排出削減(相乗効果)
 * 他の複数項目のフットプリントの合計の削減分の一部(reboundRateの割合)が増加
 * 例）断熱リノベーションによりエネルギー消費量が削減されるが、その一部は建設・維持管理のために増加
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param baseAmount 削減前の活動量
 * @param baseIntensity 削減前のGHG原単位
 * @param type 計算対象のタイプ(amount(活動量)/intensity(GHG原単位))
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param reboundRate リバウンド割合
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @param sign -1 排出削減、1:リバウンド
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const furtherReductionFromOtherFootprints = (
  baseAmount: number,
  baseIntensity: number,
  type: 'amount' | 'intensity',
  option: string,
  domainItems: readonly string[],
  reboundRate: number,
  diagnoses: Diagnoses,
  sign: -1 | 1 = -1
): number => {
  let sumBefore = 0
  let sumAfter = 0
  for (const key of domainItems) {
    const ab = diagnoses.findEstimation(key + '_amount') // amountBefore
    const aa = diagnoses.findAction(key + '_amount', option) // amountAfter
    const ib = diagnoses.findEstimation(key + '_intensity') // intensityBefore
    const ia = diagnoses.findAction(key + '_intensity', option) // intensityAfter

    sumBefore += ab * ib
    sumAfter += aa * ia
  }

  const numerator = sign * (sumAfter - sumBefore) * reboundRate
  return type === 'amount'
    ? baseAmount + numerator / baseIntensity
    : baseIntensity + numerator / baseAmount
}

/**
 * [削減後] = [削減前(base)] +
 * (Σ[他のフットプリントの削減後] - Σ[他のフットプリントの削減前])
 * x [リバウンド割合(reboundRate)]
 * 他の複数項目のフットプリントの合計の削減分の一部(reboundRateの割合)が増加
 * 例）断熱リノベーションによりエネルギー消費量が削減されるが、その一部は建設・維持管理のために増加
 * @remarks Phase4: 他の項目のフットプリント（amount x intensity）の削減量を参照して削減量を計算する施策
 * @param baseAmount 削減前の活動量
 * @param baseIntensity 削減前のGHG原単位
 * @param type 計算対象のタイプ(amount(活動量)/intensity(GHG原単位))
 * @param option 他の削減施策
 * @param domainItems 他のフットプリント項目
 * @param reboundRate リバウンド割合
 * @param diagnoses カーボンフットプリント・改善アクションの分析結果
 * @returns 削減後の活動量もしくはGHG原単位
 */
export const reboundFromOtherFootprints = (
  baseAmount: number,
  baseIntensity: number,
  type: 'amount' | 'intensity',
  option: string,
  domainItems: string[],
  reboundRate: number,
  diagnoses: Diagnoses
): number =>
  furtherReductionFromOtherFootprints(
    baseAmount,
    baseIntensity,
    type,
    option,
    domainItems,
    reboundRate,
    diagnoses,
    1
  )
