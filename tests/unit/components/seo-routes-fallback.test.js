import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const seoRoutesPath = path.resolve(__dirname, '../../../scripts/seo-routes.js')

describe('seo routes fallback discovery', () => {
  it('uses multiple api base candidates and tls-tolerant fallback for dynamic route discovery', () => {
    const source = fs.readFileSync(seoRoutesPath, 'utf8')

    expect(source).toContain('function getApiBaseCandidates ()')
    expect(source).toContain('function loadDotEnvConfig ()')
    expect(source).toContain("path.resolve(__dirname, '..', '.env')")
    expect(source).toContain('http://127.0.0.1:8000')
    expect(source).toContain('SEO_ALLOW_INSECURE_TLS')
    expect(source).toContain('httpsAgent: new https.Agent({ rejectUnauthorized: false })')
    expect(source).toContain('requestListWithFallback')
    expect(source).toContain('function isListPayload (payload)')
    expect(source).toContain('unexpected payload shape')
  })
})
