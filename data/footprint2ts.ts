import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { type Footprint } from '../src/ts/data/footprint'

const toFootprint = (record: any): Footprint => ({
  subdomain: record.subdomain,
  value: Number(record.value),
  unit: record.unit,
  citation: record.citation
})

const data = fs.readFileSync('data/footprint.csv')
const records = parse(data, { columns: true })

const footprints: Record<string, Footprint> = {}

for (const record of records) {
  const dirDomain = String(record.dir_domain)
  const itemType = String(record.item_type)
  footprints[dirDomain + '_' + itemType] = toFootprint(record)
}

const header = `import { type Footprint } from './footprint'
export const footprints: Record<string, Footprint> = `
const ts = header + JSON.stringify(footprints, null, 2)

try {
  fs.writeFileSync('src/ts/data/footprints.ts', ts)
} catch (e) {
  console.log(e)
}
