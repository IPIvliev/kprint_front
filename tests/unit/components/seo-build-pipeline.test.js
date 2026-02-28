import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const require = createRequire(import.meta.url)
const packageJsonPath = path.resolve(__dirname, '../../../package.json')
const vueConfigPath = path.resolve(__dirname, '../../../vue.config.js')
const seoScriptPath = path.resolve(__dirname, '../../../scripts/generate-seo-assets.js')
const indexNowScriptPath = path.resolve(__dirname, '../../../scripts/ping-indexnow.js')

describe('seo build pipeline', () => {
  it('includes seo asset generation in build scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    expect(pkg.scripts).toHaveProperty('seo:prepare')
    expect(pkg.scripts).toHaveProperty('seo:indexnow')
    expect(pkg.scripts['seo:prepare']).toContain('generate-seo-assets.js')
    expect(pkg.scripts['seo:indexnow']).toContain('ping-indexnow.js')
    expect(pkg.scripts.build).toContain('seo:prepare')
  })

  it('contains prerender setup in vue config and seo generator script', () => {
    const vueConfig = fs.readFileSync(vueConfigPath, 'utf8')
    const seoScript = fs.readFileSync(seoScriptPath, 'utf8')

    expect(vueConfig).toContain('@prerenderer/webpack-plugin')
    expect(vueConfig).toContain('getPrerenderRoutes')
    expect(vueConfig).toContain('process.env.CHROME_PATH')
    expect(vueConfig).toContain('Program Files\\\\Google\\\\Chrome\\\\Application\\\\chrome.exe')
    expect(vueConfig).toContain('renderAfterTime')
    expect(seoScript).toContain('function generateSitemapXml')
    expect(seoScript).toContain('Disallow: /panel/')
    expect(seoScript).toContain('Clean-param: PAGEN_1 /')
    expect(seoScript).toContain('module.exports = {')
  })

  it('uses entity lastmod for dynamic routes and generated fallback for static routes', () => {
    const { generateSitemapXml } = require(seoScriptPath)
    const generatedAt = '2026-02-28T10:00:00.000Z'
    const xml = generateSitemapXml(
      [
        { path: '/news/materials-update', lastmod: '2026-02-01T09:30:00.000Z' },
        '/about'
      ],
      'https://gorkyliquid.ru',
      generatedAt
    )

    expect(xml).toContain('<loc>https://gorkyliquid.ru/news/materials-update</loc>')
    expect(xml).toContain('<lastmod>2026-02-01T09:30:00.000Z</lastmod>')
    expect(xml).toContain('<loc>https://gorkyliquid.ru/about</loc>')
    expect(xml).toContain(`<lastmod>${generatedAt}</lastmod>`)
  })

  it('contains indexnow ping script with key/keyLocation/urlList payload', () => {
    const source = fs.readFileSync(indexNowScriptPath, 'utf8')

    expect(source).toContain('https://yandex.com/indexnow')
    expect(source).toContain('INDEXNOW_KEY')
    expect(source).toContain('keyLocation')
    expect(source).toContain('urlList')
    expect(source).toContain('axios.post')
  })

  it('generates indexnow key file in public directory from env key', () => {
    const { generateIndexNowKeyFile } = require(seoScriptPath)
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-public-'))
    const key = 'abc123indexnowkey'

    const generatedFilePath = generateIndexNowKeyFile(key, tempDir)

    expect(path.basename(generatedFilePath)).toBe(`${key}.txt`)
    expect(fs.readFileSync(generatedFilePath, 'utf8')).toBe(key)
  })
})
