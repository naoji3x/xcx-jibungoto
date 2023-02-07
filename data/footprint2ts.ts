import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { Footprint } from '../src/ts/data/footprint'

const toFootprint = (record: any): Footprint => ({
  subdomain: record.subdomain,
  value: Number(record.value),
  unit: record.unit,
  citation: record.citation
})

const data = fs.readFileSync('data/footprint.csv')
const records = parse(data, { columns: true })

const footprints: { [key: string]: Footprint } = {}

for (const record of records) {
  footprints[record.dir_domain + '_' + record.item_type] = toFootprint(record)
}

const header = `import { Footprint } from './footprint'
export const footprints: { [key: string]: Footprint } = `
const ts = header + JSON.stringify(footprints, null, 2)

try {
  fs.writeFileSync('src/ts/data/footprints.ts', ts)
} catch (e) {
  console.log(e)
}