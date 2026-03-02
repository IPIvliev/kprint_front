import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const authSwitchPath = path.resolve(__dirname, '../../../src/components/AuthSwitch.vue')

describe('AuthSwitch component', () => {
  it('provides login and registration router-links', () => {
    const source = fs.readFileSync(authSwitchPath, 'utf8')

    expect(source).toContain('to="/login">Вход</router-link>')
    expect(source).toContain('to="/registration">Регистрация</router-link>')
  })

  it('contains tablet visibility styles for 768-1199.98', () => {
    const source = fs.readFileSync(authSwitchPath, 'utf8')

    expect(source).toContain('@media (min-width: 768px) and (max-width: 1199.98px)')
    expect(source).toContain('.login__buttons')
    expect(source).toContain('display: block;')
  })
})
