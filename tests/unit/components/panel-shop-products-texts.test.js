import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopProductsPath = path.resolve(__dirname, '../../../src/components/Panel/ShopProducts.vue')

describe('panel shop products text quality', () => {
  it('uses readable russian labels in manager products page', () => {
    const source = fs.readFileSync(shopProductsPath, 'utf8')

    expect(source).toContain('Товары')
    expect(source).toContain('Поиск по названию или артикулу')
    expect(source).toContain('Добавить товар')
    expect(source).toContain('Категория:')
    expect(source).toContain('Загрузка...')
    expect(source).toContain('Ничего не найдено')
    expect(source).not.toContain('袩芯懈褋泻')
    expect(source).not.toContain('袚邪谢械褉械褟')
  })
})
