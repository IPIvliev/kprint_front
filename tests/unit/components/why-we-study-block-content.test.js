import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const blockPath = path.resolve(__dirname, '../../../src/components/Study/WhyWeStudyBlock.vue')
const cssPath = path.resolve(__dirname, '../../../src/assets/css/components/Study/WhyWeStudyBlock.css')

describe('components/Study/WhyWeStudyBlock.vue', () => {
  it('shows meaningful study advantages instead of placeholders', () => {
    const source = fs.readFileSync(blockPath, 'utf8')
    const css = fs.readFileSync(cssPath, 'utf8')
    const highlightedCards = source.match(/whywe_card--highlight/g) ?? []

    expect(source).toContain('Практика на реальных задачах')
    expect(source).toContain('Онлайн и офлайн форматы')
    expect(source).toContain('Поддержка после обучения')
    expect(source).not.toContain('>sss<')
    expect(highlightedCards).toHaveLength(4)
    expect(source).toContain('cmp-components-study-whywestudyblock')
    expect(source).toContain('<div class="col-lg-3">')
    expect(source).toContain('<article class="whywe_card whywe_card--highlight">')
    expect(source).not.toContain('<div class="col-lg-3 whywe_card whywe_card--highlight">')
    expect(css).toContain('.whywe_card--highlight::after')
    expect(css).toContain('clip-path: polygon(100% 0, 0 0, 100% 100%)')
    expect(css).toContain('position: relative')
  })
})
