import { Footprint } from './footprint'
import { footprints } from './footprints'
import { Parameter } from './parameter'
import { parameters } from './parameters'

export const getBaselineAmount = (domain: string, item: string): Footprint => ({
  ...footprints['baseline_' + domain + '_' + item + '_amount']
})

export const getBaselineIntensity = (
  domain: string,
  item: string
): Footprint => ({
  ...footprints['baseline_' + domain + '_' + item + '_intensity']
})

export const getParameter = (category: string, key: string): Parameter => ({
  ...parameters[category + '_' + key]
})
