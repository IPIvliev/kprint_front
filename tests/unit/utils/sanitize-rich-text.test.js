import { sanitizeRichText } from '@/utils/sanitizeRichText'

describe('utils/sanitizeRichText', () => {
  const prevApiBase = process.env.VUE_APP_API_BASE

  afterEach(() => {
    process.env.VUE_APP_API_BASE = prevApiBase
  })

  it('keeps basic formatting tags', () => {
    const html = sanitizeRichText('<p>Hello <strong>world</strong></p>')
    expect(html).toContain('<p>Hello <strong>world</strong></p>')
  })

  it('removes blocked tags and dangerous attributes', () => {
    const html = sanitizeRichText('<script>alert(1)</script><a href="javascript:alert(2)" onclick="x()">Link</a>')
    expect(html).not.toContain('<script')
    expect(html).not.toContain('onclick=')
    expect(html).not.toContain('javascript:')
  })

  it('resolves relative media urls with API base', () => {
    process.env.VUE_APP_API_BASE = 'https://bk.gorkyliquid.ru/'
    const html = sanitizeRichText('<img src="/media/study/course.jpg">')
    expect(html).toContain('src="https://bk.gorkyliquid.ru/media/study/course.jpg"')
  })
})
