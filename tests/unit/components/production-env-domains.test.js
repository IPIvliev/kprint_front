import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const envExamplePath = path.resolve(__dirname, '../../../.env.example')
const envProductionPath = path.resolve(__dirname, '../../../.env.production')

function parseEnv (source) {
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .reduce((acc, line) => {
      const [key, ...rest] = line.split('=')
      acc[key.trim()] = rest.join('=').trim()
      return acc
    }, {})
}

describe('production env domains', () => {
  it('uses production domains for frontend and backend api in env example', () => {
    const source = fs.readFileSync(envExamplePath, 'utf8')
    const env = parseEnv(source)

    expect(env.VUE_APP_SITE_URL).toBe('https://gorkyliquid.ru')
    expect(env.VUE_APP_API_BASE).toBe('https://bk.gorkyliquid.ru')
    expect(env.VUE_APP_USER_API_BASE).toBe('https://bk.gorkyliquid.ru')
    expect(env.SEO_API_BASE).toBe('https://bk.gorkyliquid.ru')
  })

  it('keeps dedicated production env file with production domains', () => {
    const source = fs.readFileSync(envProductionPath, 'utf8')
    const env = parseEnv(source)

    expect(env.VUE_APP_SITE_URL).toBe('https://gorkyliquid.ru')
    expect(env.VUE_APP_API_BASE).toBe('https://bk.gorkyliquid.ru')
    expect(env.VUE_APP_USER_API_BASE).toBe('https://bk.gorkyliquid.ru')
    expect(env.SEO_API_BASE).toBe('https://bk.gorkyliquid.ru')
  })
})
