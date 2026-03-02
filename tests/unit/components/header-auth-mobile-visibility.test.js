import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const headerPath = path.resolve(__dirname, '../../../src/components/HeaderBlock.vue')

describe('header auth controls visibility on auth pages', () => {
  it('hides header auth controls on mobile for login and registration routes', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('header__auth-controls--mobile-hidden')
    expect(source).toContain('isAuthRoute')
    expect(source).toContain("'Login'")
    expect(source).toContain("'Registration'")
    expect(source).toContain('@media (max-width: 1199.98px)')
  })
})
