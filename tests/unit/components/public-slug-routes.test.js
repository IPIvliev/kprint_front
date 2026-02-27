import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routerPath = path.resolve(__dirname, '../../../src/router/index.js')

describe('public slug routes', () => {
  it('uses slug params for shop, study and news pages', () => {
    const source = fs.readFileSync(routerPath, 'utf8')

    expect(source).toContain("path: 'categories/:categorySlug'")
    expect(source).toContain("path: 'categories/:categorySlug/:productSlug'")
    expect(source).toContain("path: 'categories/:categorySlug/showcase'")
    expect(source).toContain("path: 'course/:courseSlug'")
    expect(source).toContain("path: '/news/:articleSlug'")

    expect(source).not.toContain("path: 'categories/:id'")
    expect(source).not.toContain("path: 'course/:id'")
    expect(source).not.toContain("path: '/news/:id(\\\\d+)/:slug?'")
  })
})
