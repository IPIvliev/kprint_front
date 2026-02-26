import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const headerPath = path.resolve(__dirname, '../../../src/components/HeaderBlock.vue')

describe('header menu CTA links', () => {
  it('routes "Где купить?" button to contacts page', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('<router-link class="menu__btn" to="/contact">')
    expect(source).toContain('<div class="menu__btn-title">Где купить?</div>')
  })

  it('routes "Стать дилером" button to dealers page', () => {
    const source = fs.readFileSync(headerPath, 'utf8')

    expect(source).toContain('<router-link class="menu__btn" to="/dealers">')
    expect(source).toContain('<div class="menu__btn-title">Стать дилером</div>')
  })
})
