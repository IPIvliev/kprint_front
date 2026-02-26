import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routerPath = path.resolve(__dirname, '../../../src/router/index.js')

describe('seo entity schema', () => {
  it('contains route-aware Product/Article schema generation and safe utf-8 seo strings', () => {
    const source = fs.readFileSync(routerPath, 'utf8')

    expect(source).toContain('function buildProductSchema')
    expect(source).toContain('function buildArticleSchema')
    expect(source).toContain('function resolveEntitySchema')
    expect(source).toContain("ensureJsonLdScriptTag('entity')")
    expect(source).toContain('function fetchSeoEntity')
    expect(source).toContain('publicApi.get(requestPath)')
    expect(source).toContain("`/api/shop/products/${productId}`")
    expect(source).toContain("`/api/articles/${articleId}/`")
    expect(source).toContain("'@type': 'Product'")
    expect(source).toContain("'@type': 'Article'")

    expect(source).toContain('Аддитивные технологии и материалы')
    expect(source).toContain('Политика ПДн | Gorky Liquid')
    expect(source).not.toContain('\uFFFD')
    expect(source).not.toContain('袗写写')
  })
})
