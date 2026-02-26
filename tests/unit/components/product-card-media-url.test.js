import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const productCardPath = path.resolve(__dirname, '../../../src/components/elements/Shop/Showcase/ProductCard.vue')

describe('shop product card media url', () => {
  it('resolves relative product photo paths against API base url', () => {
    const source = fs.readFileSync(productCardPath, 'utf8')

    expect(source).toContain(':src="resolveMediaUrl(product.photo)"')
    expect(source).toContain('resolveMediaUrl (path)')
    expect(source).toContain('process.env.VUE_APP_API_BASE')
  })
})
