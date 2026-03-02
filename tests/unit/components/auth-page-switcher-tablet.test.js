import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const authSwitchPath = path.resolve(__dirname, '../../../src/components/AuthSwitch.vue')

describe('auth pages switcher visibility on tablet', () => {
  it('shows login/registration switcher on tablet for 768-1199.98', () => {
    const source = fs.readFileSync(authSwitchPath, 'utf8')

    expect(source).toContain('@media (min-width: 768px) and (max-width: 1199.98px)')
    expect(source).toContain('.login__buttons')
    expect(source).toContain('display: block;')
  })
})
