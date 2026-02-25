import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const innovationsPagePath = path.resolve(__dirname, '../../../src/components/InnovationsPage.vue')
const headerPath = path.resolve(__dirname, '../../../src/components/HeaderBlock.vue')
const footerPath = path.resolve(__dirname, '../../../src/components/FooterBlock.vue')

describe('innovations page content and navigation', () => {
  it('contains mandatory accreditation details required by Mincifry order 511', () => {
    const source = fs.readFileSync(innovationsPagePath, 'utf8')

    expect(source).toContain('Общество с ограниченной ответственностью')
    expect(source).toContain('603074, Нижегородская область')
    expect(source).toContain('ИНН')
    expect(source).toContain('5258144510')
    expect(source).toContain('ОКВЭД')
    expect(source).toContain('47.91.2')
    expect(source).toContain('Электронная почта')
    expect(source).toContain('Номер телефона')
    expect(source).toContain('Коды видов деятельности в области ИТ')
    expect(source).toContain('1.01')
    expect(source).toContain('Стоимость')
    expect(source).toContain('Договорная')
    expect(source).toContain('24/7')
    expect(source).toContain('без регистрации')
    expect(source).toContain('без передачи персональных данных')
  })

  it('uses the new /it-innovations route in header and footer', () => {
    const headerSource = fs.readFileSync(headerPath, 'utf8')
    const footerSource = fs.readFileSync(footerPath, 'utf8')

    expect(headerSource).toContain('to="/it-innovations"')
    expect(footerSource).toContain('to="/it-innovations"')
    expect(headerSource).not.toContain('to="/innovations"')
    expect(footerSource).not.toContain('to="/innovations"')
  })

  it('keeps only relevant additional disclosures and shows software stack competencies', () => {
    const source = fs.readFileSync(innovationsPagePath, 'utf8')

    expect(source).toContain('2022668441')
    expect(source).toContain('2025684932')
    expect(source).toContain('AO-20221020-9248053450-4')
    expect(source).toContain('31552')

    expect(source).toContain('Vue.js')
    expect(source).toContain('Python')
    expect(source).toContain('Solidity')
    expect(source).toContain('YOLO')
    expect(source).toContain('Golang')

    expect(source).not.toContain('реестра российского ПО')
    expect(source).not.toContain('фискальных данных')
  })

  it('shows public documents block with downloadable evidence files', () => {
    const source = fs.readFileSync(innovationsPagePath, 'utf8')

    expect(source).toContain('innovation-it__docs')
    expect(source).toContain('innovation-it__doc-preview')
    expect(source).toContain('innovation-it__doc-actions')
    expect(source).toContain('download')
    expect(source).toContain('/docs/software-certificate-2025684932.pdf')
    expect(source).toContain('/docs/it-accreditation-mincifry-ao-20221020-9248053450-4.pdf')
  })
})
