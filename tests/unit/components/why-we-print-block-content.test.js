import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const blockPath = path.resolve(__dirname, '../../../src/components/Print/WhyWePrintBlock.vue')

describe('components/Print/WhyWePrintBlock.vue', () => {
  it('shows four meaningful print advantages instead of empty placeholders', () => {
    const source = fs.readFileSync(blockPath, 'utf8')
    const cards = source.match(/class="whywe_print_card"/g) ?? []

    expect(source).toContain('Печать под вашу задачу')
    expect(source).toContain('Проверка модели перед запуском')
    expect(source).toContain('Прозрачный процесс в личном кабинете')
    expect(source).toContain('Доставка по РФ и самовывоз')
    expect(cards).toHaveLength(4)
    expect(source).not.toContain('<div class="col-lg-3"><img src="@/assets/img/whywe-card.png"></div>')
    expect(source).toContain('.whywe_print_card::after')
    expect(source).toContain('clip-path: polygon(100% 0, 0 0, 100% 100%)')
  })
})
