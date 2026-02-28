import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const nginxTemplatePath = path.resolve(__dirname, '../../../for_nginx')
const htaccessTemplatePath = path.resolve(__dirname, '../../../public/.htaccess')
const indexHtmlPath = path.resolve(__dirname, '../../../public/index.html')

describe('production deploy template', () => {
  it('contains nginx SPA history fallback for gorkyliquid.ru', () => {
    const source = fs.readFileSync(nginxTemplatePath, 'utf8')

    expect(source).toContain('server_name gorkyliquid.ru')
    expect(source).toContain('try_files $uri $uri/ @spa_known_routes;')
    expect(source).toContain('location @spa_known_routes')
    expect(source).toContain('error_page 404 = @spa_not_found;')
    expect(source).toContain('location @spa_not_found')
    expect(source).toContain('try_files /index.html =404;')
    expect(source).toContain('news(?:/.*)?')
  })

  it('contains apache SPA history fallback for shared hosting', () => {
    const source = fs.readFileSync(htaccessTemplatePath, 'utf8')

    expect(source).toContain('RewriteEngine On')
    expect(source).toContain('RewriteCond %{REQUEST_FILENAME} -f [OR]')
    expect(source).toContain('RewriteCond %{REQUEST_FILENAME} -d')
    expect(source).toContain('RewriteRule ^ index.html [L]')
  })

  it('contains Yandex Metrika counter near the beginning of the page template', () => {
    const source = fs.readFileSync(indexHtmlPath, 'utf8')
    const metrikaScriptIndex = source.indexOf('https://mc.yandex.ru/metrika/tag.js')
    const titleIndex = source.indexOf('<title>')

    expect(source).toContain('ym(53599684, \'init\'')
    expect(source).toContain('ecommerce:"dataLayer"')
    expect(source).toContain('https://mc.yandex.ru/watch/53599684')
    expect(metrikaScriptIndex).toBeGreaterThan(-1)
    expect(titleIndex).toBeGreaterThan(-1)
    expect(metrikaScriptIndex).toBeLessThan(titleIndex)
  })

  it('uses svg favicon in the html template', () => {
    const source = fs.readFileSync(indexHtmlPath, 'utf8')

    expect(source).toContain('href="<%= BASE_URL %>favicon.svg"')
    expect(source).not.toContain('href="<%= BASE_URL %>favicon.ico"')
  })

  it('sets russian lang attribute on html root', () => {
    const source = fs.readFileSync(indexHtmlPath, 'utf8')

    expect(source).toContain('<html lang="ru">')
    expect(source).not.toContain('<html lang="">')
  })
})
