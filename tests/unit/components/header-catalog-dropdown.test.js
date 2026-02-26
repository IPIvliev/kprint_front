import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const headerPath = path.resolve(__dirname, '../../../src/components/HeaderBlock.vue')

describe('header catalog dropdown', () => {
  it('loads categories and products from shop catalog service', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain("import { fetchShopCategories, fetchShopProducts } from '@/services/catalog.service'")
    expect(source).toContain('this.loadCatalogDropdownData()')
    expect(source).toContain('await Promise.all([')
  })

  it('renders dynamic category and product cards', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('v-for="(category, index) in catalogDropdownCategories"')
    expect(source).toContain('v-for="(group, groupIndex) in catalogDropdownProductGroups"')
    expect(source).toContain('v-for="product in group"')
    expect(source).toContain(':to="shopCategoryRoute(category)"')
    expect(source).toContain(':to="shopProductRoute(product)"')
  })

  it('removes hardcoded old catalog showcase items', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).not.toContain('Kulibin Print<span>Pro1</span>')
    expect(source).not.toContain('Kulibin Print<span>Dental</span>')
    expect(source).not.toContain('«Dental FL»')
    expect(source).not.toContain('«Flex LCD»')
    expect(source).not.toContain('«Reactive»')
    expect(source).not.toContain('«Castable LCD»')
  })
})
