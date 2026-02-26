import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopFilterPath = path.resolve(__dirname, '../../../src/components/Shop/ShopFilter.vue')

describe('shop filter facet badge', () => {
  it('renders facet count as styled badge, not plain parentheses text', () => {
    const source = fs.readFileSync(shopFilterPath, 'utf8')

    expect(source).toContain('class="filter_count_badge"')
    expect(source).toContain('.filter_count_badge')
    expect(source).not.toContain('({{ facetValueCount(filter.id, attr.id) }})')
  })
})
