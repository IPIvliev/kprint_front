import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const headerPath = path.resolve(__dirname, '../../../src/components/HeaderBlock.vue')

describe('header registration responsive behavior', () => {
  it('keeps registration button visible on desktop 1200-1599.98 and hides icon-only auth', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('@media (min-width: 1200px) and (max-width: 1599.98px)')
    expect(source).toContain('.header__regbuttons .btn')
    expect(source).toContain('display: inline-flex !important;')
    expect(source).toContain('.header__regicon')
    expect(source).toContain('display: none !important;')
  })

  it('uses desktop auth buttons on mobile and hides duplicate mobile auth block', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('class="header__auth-mobile d-xl-none"')
    expect(source).toContain('class="header__regbuttons"')
    expect(source).toContain('to="/registration">Регистрация</router-link>')
    expect(source).toContain('@media (max-width: 1199.98px)')
    expect(source).toContain('.header__auth-mobile')
    expect(source).toContain('.header__regbuttons')
    expect(source).toContain('display: inline-flex !important;')
    expect(source).toContain('.header__regicon')
    expect(source).toContain('display: none !important;')
  })
})
