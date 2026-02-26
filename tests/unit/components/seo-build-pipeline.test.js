import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const packageJsonPath = path.resolve(__dirname, '../../../package.json')
const vueConfigPath = path.resolve(__dirname, '../../../vue.config.js')
const seoScriptPath = path.resolve(__dirname, '../../../scripts/generate-seo-assets.js')

describe('seo build pipeline', () => {
  it('includes seo asset generation in build scripts', () => {
    const pkg = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))

    expect(pkg.scripts).toHaveProperty('seo:prepare')
    expect(pkg.scripts['seo:prepare']).toContain('generate-seo-assets.js')
    expect(pkg.scripts.build).toContain('seo:prepare')
  })

  it('contains prerender setup in vue config and seo generator script', () => {
    const vueConfig = fs.readFileSync(vueConfigPath, 'utf8')
    const seoScript = fs.readFileSync(seoScriptPath, 'utf8')

    expect(vueConfig).toContain('@prerenderer/webpack-plugin')
    expect(vueConfig).toContain('getPrerenderRoutes')
    expect(seoScript).toContain('function generateSitemapXml')
    expect(seoScript).toContain('Disallow: /panel/')
    expect(seoScript).toContain('module.exports = {')
  })
})
