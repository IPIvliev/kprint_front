import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const loginPagePath = path.resolve(__dirname, '../../../src/components/LoginPage.vue')
const registrationPagePath = path.resolve(__dirname, '../../../src/components/RegistrationPage.vue')

describe('auth switch usage', () => {
  it('uses AuthSwitch component in LoginPage', () => {
    const source = fs.readFileSync(loginPagePath, 'utf8')

    expect(source).toContain('<AuthSwitch />')
    expect(source).toContain("import AuthSwitch from '@/components/AuthSwitch.vue'")
    expect(source).not.toContain('<div class="login__buttons">')
  })

  it('uses AuthSwitch component in RegistrationPage', () => {
    const source = fs.readFileSync(registrationPagePath, 'utf8')

    expect(source).toContain('<AuthSwitch />')
    expect(source).toContain("import AuthSwitch from '@/components/AuthSwitch.vue'")
    expect(source).not.toContain('<div class="login__buttons">')
  })
})
