import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const loginPagePath = path.resolve(__dirname, '../../../src/components/LoginPage.vue')

describe('login page auth links', () => {
  it('uses shared AuthSwitch component and has no dead auth anchors', () => {
    const source = fs.readFileSync(loginPagePath, 'utf8')

    expect(source).toContain('<AuthSwitch />')
    expect(source).toContain("import AuthSwitch from '@/components/AuthSwitch.vue'")
    expect(source).not.toContain('<a class="btn btn--black" href="#">Регистрация</a>')
  })
})
