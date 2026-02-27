import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mainShopPath = path.resolve(__dirname, '../../../src/views/Shop/MainShop.vue')
const catalogModulePath = path.resolve(__dirname, '../../../src/store/catalog.module.js')
const catalogServicePath = path.resolve(__dirname, '../../../src/services/catalog.service.js')

describe('shop catalog server-side filtering integration', () => {
  it('builds backend query payload from selected filters and price in MainShop', () => {
    const source = fs.readFileSync(mainShopPath, 'utf8')

    expect(source).toContain(':selectedFilters="filters"')
    expect(source).toContain("this.$store.dispatch('catalog/fetchCategoryProducts', {")
    expect(source).toContain('filters: this.filters')
    expect(source).toContain('price_from: this.priceFilter.from')
    expect(source).toContain('price_to: this.priceFilter.to')
    expect(source).not.toContain('product.product_attrs_values.some(')
  })

  it('passes query params to category products endpoint in catalog service', () => {
    const source = fs.readFileSync(catalogServicePath, 'utf8')

    expect(source).toContain('export function fetchShopCategoryProducts (categorySlug, params = {})')
    expect(source).toContain("publicApi.get(`/api/shop/categories/${encodeURIComponent(String(categorySlug || ''))}`, { params })")
  })

  it('stores facets metadata in catalog store module', () => {
    const source = fs.readFileSync(catalogModulePath, 'utf8')

    expect(source).toContain('facets: null')
    expect(source).toContain('setFacetsData (state, facetsData)')
    expect(source).toContain("commit('setFacetsData', response.data.facets || null)")
  })
})
