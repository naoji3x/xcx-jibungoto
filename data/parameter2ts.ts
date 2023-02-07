import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { Parameter } from '../src/ts/data/parameter'

const toParameter = (record: any): Parameter => ({
  value: Number(record.value),
  unit: record.unit,
  citation: record.citation
})

const data = fs.readFileSync('data/parameter.csv')
const records = parse(data, { columns: true })

const parameters: { [key: string]: Parameter } = {}

for (const record of records) {
  parameters[record.category + '_' + record.key] = toParameter(record)
}

const header = `import { Parameter } from './parameter'
export const parameters: { [key: string]: Parameter } = `
const ts = header + JSON.stringify(parameters, null, 2)

try {
  fs.writeFileSync('src/ts/data/parameters.ts', ts)
} catch (e) {
  console.log(e)
}
