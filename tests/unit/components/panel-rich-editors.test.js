import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const shopProductsPath = path.resolve(__dirname, '../../../src/components/Panel/ShopProducts.vue')
const studyLessonsPath = path.resolve(__dirname, '../../../src/components/Panel/StudyLessons.vue')

describe('manager panel rich editors', () => {
  it('uses RichTextEditor for product description', () => {
    const source = fs.readFileSync(shopProductsPath, 'utf8')

    expect(source).toContain("RichTextEditor from '@/components/elements/Panel/RichTextEditor.vue'")
    expect(source).toContain('<RichTextEditor')
    expect(source).not.toContain('<textarea v-model="form.description"')
  })

  it('uses RichTextEditor for lesson description', () => {
    const source = fs.readFileSync(studyLessonsPath, 'utf8')

    expect(source).toContain("RichTextEditor from '@/components/elements/Panel/RichTextEditor.vue'")
    expect(source).toContain('<RichTextEditor')
    expect(source).not.toContain('<textarea v-model="form.description"')
    expect(source).not.toContain('<textarea\n                v-model="form.text_content"')
    expect(source).toContain('v-model="form.text_content"')
  })
})
