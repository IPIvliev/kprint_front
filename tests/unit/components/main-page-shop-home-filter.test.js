import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const mainPageShopPath = path.resolve(__dirname, '../../../src/components/elements/MainPage/MainPageShop.vue')
const homeViewPath = path.resolve(__dirname, '../../../src/views/Home.vue')

describe('main page shop homepage filter', () => {
  it('requests only products flagged for homepage', () => {
    const source = fs.readFileSync(mainPageShopPath, 'utf8')

    expect(source).toContain("this.$store.dispatch('catalog/fetchProducts', { home: true })")
  })

  it('does not trigger unfiltered product preload from Home view', () => {
    const source = fs.readFileSync(homeViewPath, 'utf8')

    expect(source).not.toContain("this.$store.dispatch('catalog/fetchProducts')")
  })
})
