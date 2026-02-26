import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mainShopPath = path.resolve(__dirname, '../../../src/views/Shop/MainShop.vue')
const shopFilterPath = path.resolve(__dirname, '../../../src/components/Shop/ShopFilter.vue')
const shopCategoriesPath = path.resolve(__dirname, '../../../src/views/Shop/ShopCategories.vue')
const productPagePath = path.resolve(__dirname, '../../../src/views/Shop/ProductPage.vue')

describe('shop catalog ux improvements', () => {
  it('uses dynamic pagination and paginated product list in catalog showcase', () => {
    const source = fs.readFileSync(mainShopPath, 'utf8')

    expect(source).toContain('v-for="product in paginatedProducts"')
    expect(source).toContain('currentPage: 1')
    expect(source).toContain('pageSize: 9')
    expect(source).toContain('totalPages ()')
    expect(source).toContain('goToPage (page)')
  })

  it('applies debounced price filtering requests', () => {
    const source = fs.readFileSync(mainShopPath, 'utf8')

    expect(source).toContain('priceDebounceTimer: null')
    expect(source).toContain('schedulePriceReload ()')
    expect(source).toContain('setTimeout(() => {')
    expect(source).toContain('this.loadCategoryProducts()')
  })

  it('shows facet counts for filter values in left sidebar', () => {
    const source = fs.readFileSync(shopFilterPath, 'utf8')

    expect(source).toContain('facets')
    expect(source).toContain('facetValueCount (filterAttrId, valueId)')
    expect(source).toContain('{{ facetValueCount(filter.id, attr.id) }}')
  })

  it('keeps readable russian labels on catalog pages', () => {
    const mainShop = fs.readFileSync(mainShopPath, 'utf8')
    const shopCategories = fs.readFileSync(shopCategoriesPath, 'utf8')
    const productPage = fs.readFileSync(productPagePath, 'utf8')

    expect(mainShop).toContain('<router-link to="/">Главная</router-link>')
    expect(mainShop).toContain('<router-link to="/shop">Магазин</router-link>')
    expect(mainShop).toContain('<h1 class="title">Каталог продукции</h1>')
    expect(shopCategories).toContain('<h1 class="title">Каталог продукции</h1>')
    expect(productPage).toContain('<router-link to="/">Главная</router-link>')
    expect(productPage).toContain('<router-link to="/shop">Магазин</router-link>')
  })
})
