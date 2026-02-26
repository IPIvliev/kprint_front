import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const routerPath = path.resolve(__dirname, '../../../src/router/index.js')

describe('seo router policy', () => {
  it('manages canonical and robots tags and applies noindex for panel routes', () => {
    const source = fs.readFileSync(routerPath, 'utf8')

    expect(source).toContain('function ensureRobotsMetaTag ()')
    expect(source).toContain('function ensureCanonicalLinkTag ()')
    expect(source).toContain('to.path.startsWith(\'/panel\')')
    expect(source).toContain('robotsMeta.setAttribute(\'content\', robots)')
    expect(source).toContain('canonicalLink.setAttribute(\'href\', canonicalUrl)')
  })
})
