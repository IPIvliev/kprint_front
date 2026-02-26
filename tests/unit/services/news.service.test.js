const { publicApiMock } = vi.hoisted(() => ({
  publicApiMock: {
    get: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  publicApi: publicApiMock
}))

import {
  fetchNewsArticle,
  fetchNewsArticles,
  fetchNewsCategories
} from '@/services/news.service'

describe('news service', () => {
  beforeEach(() => {
    publicApiMock.get.mockReset()
  })

  it('requests paginated news list with params', async () => {
    await fetchNewsArticles({ page: 2, page_size: 12, category: 'news' })
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/articles/', {
      params: { page: 2, page_size: 12, category: 'news' }
    })
  })

  it('requests article by id', async () => {
    await fetchNewsArticle(42)
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/articles/42/')
  })

  it('requests news categories', async () => {
    await fetchNewsCategories()
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/article-categories/', { params: {} })
  })
})
