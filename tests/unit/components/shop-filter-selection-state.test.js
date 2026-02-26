import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopFilterPath = path.resolve(__dirname, '../../../src/components/Shop/ShopFilter.vue')

describe('shop filter selection state', () => {
  it('controls radio checked states from selected filters and does not hardcode all-options checked', () => {
    const source = fs.readFileSync(shopFilterPath, 'utf8')

    expect(source).toContain(':checked="isFilterValueSelected(filter.id, attr.id)"')
    expect(source).toContain(':checked="isAllOptionsSelected(filter.id)"')
    expect(source).not.toContain('checked="true"')
    expect(source).not.toContain('v-model="filter.name"')
  })
})
