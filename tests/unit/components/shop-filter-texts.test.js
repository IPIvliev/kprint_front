import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopFilterPath = path.resolve(__dirname, '../../../src/components/Shop/ShopFilter.vue')

describe('shop filter labels', () => {
  it('uses readable russian labels in left filter sidebar', () => {
    const source = fs.readFileSync(shopFilterPath, 'utf8')

    expect(source).toContain('Все варианты')
    expect(source).toContain('placeholder="от"')
    expect(source).toContain('placeholder="до"')
    expect(source).toContain('<div class="filter_header">Стоимость</div>')
  })
})
