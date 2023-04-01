import { parse } from 'csv-parse/sync'
import * as fs from 'fs'
import { type Option } from '../src/ts/data/option'

const toOption = (record: any): Option => {
  const values = [Number(record.value)]
  const args = record.args === '' ? [] : String(record.args).split(' ')

  if (record.operation === 'shift-from-other-items-then-reduction-rate') {
    values.push(Number(args[0]))
    args.shift()
  }

  const option = String(record.option)

  return {
    option,
    values,
    args,
    operation: record.operation,
    citation: record.citation
  }
}

const data = fs.readFileSync('data/option.csv')
const records = parse(data, { columns: true })

const options: Record<string, Option> = {}

for (const record of records) {
  const option = String(record.option)
  const domainItemType = String(record.domain_item_type)
  options[option + '_' + domainItemType] = toOption(record)
}

const header = `import { type Option } from './option'
export const options: Record<string, Option> = `
const ts = header + JSON.stringify(options, null, 2)

try {
  fs.writeFileSync('src/ts/data/options.ts', ts)
} catch (e) {
  console.log(e)
}
