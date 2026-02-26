import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopProductsPath = path.resolve(__dirname, '../../../src/components/Panel/ShopProducts.vue')

describe('panel shop products inline attributes editor', () => {
  it('loads filter attrs and product attr values in products modal', () => {
    const source = fs.readFileSync(shopProductsPath, 'utf8')

    expect(source).toContain('fetchShopManagerFilterAttrs')
    expect(source).toContain('loadProductAttrMeta ()')
    expect(source).toContain('fetchProductAttrValues ()')
    expect(source).toContain('fetchShopManagerProduct(this.currentId)')
    expect(source).not.toContain('fetchShopManagerFilterAttrValues()')
  })

  it('allows create/update/delete product attribute values from product card', () => {
    const source = fs.readFileSync(shopProductsPath, 'utf8')

    expect(source).toContain('createShopManagerFilterAttrValue')
    expect(source).toContain('updateShopManagerFilterAttrValue')
    expect(source).toContain('deleteShopManagerFilterAttrValue')
    expect(source).toContain('addProductAttrValue ()')
    expect(source).toContain('updateProductAttrValue (item)')
    expect(source).toContain('removeProductAttrValue (item)')
  })

  it('renders inline product attributes section in edit modal', () => {
    const source = fs.readFileSync(shopProductsPath, 'utf8')

    expect(source).toContain('Характеристики товара')
    expect(source).toContain('v-for="item in productAttrValues"')
    expect(source).toContain('v-model="newProductAttr.filter_attr"')
    expect(source).toContain('@click="addProductAttrValue"')
  })
})
