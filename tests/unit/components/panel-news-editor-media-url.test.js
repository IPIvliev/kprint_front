import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const panelNewsPath = path.resolve(__dirname, '../../../src/components/Panel/PanelNews.vue')

describe('panel news editor media urls', () => {
  it('normalizes body media urls for editor preview and save', () => {
    const source = fs.readFileSync(panelNewsPath, 'utf8')

    expect(source).toContain("body: this.prepareBodyForEditor(fullArticle.body || '')")
    expect(source).toContain("const body = String(this.prepareBodyForSave(this.form.body) || '').trim()")
    expect(source).toContain('prepareBodyForEditor (html)')
    expect(source).toContain('prepareBodyForSave (html)')
  })
})

