import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const nginxTemplatePath = path.resolve(__dirname, '../../../for_nginx')
const htaccessTemplatePath = path.resolve(__dirname, '../../../public/.htaccess')

describe('production deploy template', () => {
  it('contains nginx SPA history fallback for gorkyliquid.ru', () => {
    const source = fs.readFileSync(nginxTemplatePath, 'utf8')

    expect(source).toContain('server_name gorkyliquid.ru')
    expect(source).toContain('try_files $uri $uri/ /index.html;')
  })

  it('contains apache SPA history fallback for shared hosting', () => {
    const source = fs.readFileSync(htaccessTemplatePath, 'utf8')

    expect(source).toContain('RewriteEngine On')
    expect(source).toContain('RewriteCond %{REQUEST_FILENAME} -f [OR]')
    expect(source).toContain('RewriteCond %{REQUEST_FILENAME} -d')
    expect(source).toContain('RewriteRule ^ index.html [L]')
  })
})
