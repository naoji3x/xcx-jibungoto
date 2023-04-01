import { type Footprint } from './footprint'
import { footprints } from './footprints'
import { type Parameter } from './parameter'
import { parameters } from './parameters'
import { options } from './options'
import { type Option } from './option'

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

export const getOption = (
  domain: string,
  item: string,
  type: string
): Option => ({
  ...options[domain + '_' + item + '_' + type]
})
