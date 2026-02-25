import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const componentPaths = [
  path.resolve(__dirname, '../../../src/components/HeaderBlock.vue'),
  path.resolve(__dirname, '../../../src/components/FooterBlock.vue'),
  path.resolve(__dirname, '../../../src/components/ArticlePage.vue')
]

describe('social links migration', () => {
  it('uses VK, Dzen and Odnoklassniki links in public social blocks', () => {
    componentPaths.forEach((componentPath) => {
      const source = fs.readFileSync(componentPath, 'utf8')

      expect(source).toContain('https://vk.com/gorky_liquid')
      expect(source).toContain('https://dzen.ru/gorky_liquid')
      expect(source).toContain('https://ok.ru/group/70000046325756')
    })
  })

  it('removes legacy facebook and youtube icon paths from social blocks', () => {
    componentPaths.forEach((componentPath) => {
      const source = fs.readFileSync(componentPath, 'utf8')

      expect(source).not.toContain('17.6677 16.7028V25.4076')
      expect(source).not.toContain('22.6677 10.4995')
    })
  })
})
