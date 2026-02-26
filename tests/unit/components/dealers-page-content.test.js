import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const dealersViewPath = path.resolve(__dirname, '../../../src/views/Dealers.vue')

describe('dealers page content', () => {
  it('describes strategic cooperation formats for additive technologies', () => {
    const source = fs.readFileSync(dealersViewPath, 'utf8')

    expect(source).toContain('Сотрудничество в аддитивных технологиях')
    expect(source).toContain('программное обеспечение любой сложности')
    expect(source).toContain('компьютерного зрения и нейросетей')
    expect(source).toContain('фотополимерную смолу или филамент')
    expect(source).toContain('оптовые цены')
    expect(source).toContain('обучение сотрудников заказчика')
    expect(source).toContain('консультационные услуги')
    expect(source).toContain('экспертов по внедрению аддитивных технологий')
  })

  it('keeps dealer-specific partner and callback blocks', () => {
    const source = fs.readFileSync(dealersViewPath, 'utf8')

    expect(source).toContain('<partners-block')
    expect(source).toContain('category="dealers"')
    expect(source).toContain('<callback-window')
  })

  it('removes obsolete technology teaser cards from this page', () => {
    const source = fs.readFileSync(dealersViewPath, 'utf8')

    expect(source).not.toContain('Печать без подготовки в 1 клик')
    expect(source).not.toContain('Система блокчейн-контрактов')
  })
})
