const {
  fetchNewsArticlesMock,
  fetchNewsArticleMock,
  fetchNewsCategoriesMock
} = vi.hoisted(() => ({
  fetchNewsArticlesMock: vi.fn(),
  fetchNewsArticleMock: vi.fn(),
  fetchNewsCategoriesMock: vi.fn()
}))

vi.mock('@/services/news.service', () => ({
  fetchNewsArticles: fetchNewsArticlesMock,
  fetchNewsArticle: fetchNewsArticleMock,
  fetchNewsCategories: fetchNewsCategoriesMock
}))

import { news } from '@/store/news.module'

describe('store/news.module', () => {
  beforeEach(() => {
    fetchNewsArticlesMock.mockReset()
    fetchNewsArticleMock.mockReset()
    fetchNewsCategoriesMock.mockReset()
  })

  it('loads categories once and serves from cache', async () => {
    fetchNewsCategoriesMock.mockResolvedValueOnce({ data: [{ id: 1, title: 'News' }] })
    const commit = vi.fn()
    const state = { categories: [], categories_loaded: false }

    const first = await news.actions.fetchCategories({ commit, state }, {})
    state.categories = [{ id: 1, title: 'News' }]
    state.categories_loaded = true
    const second = await news.actions.fetchCategories({ commit, state }, {})

    expect(first).toEqual([{ id: 1, title: 'News' }])
    expect(second).toEqual([{ id: 1, title: 'News' }])
    expect(fetchNewsCategoriesMock).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('setCategoriesData', [{ id: 1, title: 'News' }])
    expect(commit).toHaveBeenCalledWith('setCategoriesLoaded', true)
  })

  it('loads paginated articles and writes cache by params key', async () => {
    fetchNewsArticlesMock.mockResolvedValueOnce({
      data: {
        count: 3,
        page: 1,
        page_size: 2,
        total_pages: 2,
        results: [{ id: 7 }, { id: 8 }]
      }
    })
    const commit = vi.fn()
    const state = { list_cache: {} }

    const payload = await news.actions.fetchArticles(
      { commit, state },
      { page: 1, pageSize: 2, category: 'news', force: true }
    )

    expect(fetchNewsArticlesMock).toHaveBeenCalledWith({
      page: 1,
      page_size: 2,
      category: 'news'
    })
    expect(commit).toHaveBeenCalledWith('setArticlesData', [{ id: 7 }, { id: 8 }])
    expect(commit).toHaveBeenCalledWith('setArticlesMeta', {
      count: 3,
      page: 1,
      page_size: 2,
      total_pages: 2
    })
    expect(commit).toHaveBeenCalledWith(
      'setListCache',
      expect.objectContaining({
        key: expect.any(String),
        value: expect.objectContaining({
          items: [{ id: 7 }, { id: 8 }]
        })
      })
    )
    expect(payload.items).toEqual([{ id: 7 }, { id: 8 }])
  })

  it('returns cached list payload for same params', async () => {
    const commit = vi.fn()
    const state = {
      list_cache: {
        '{"category":"news","exclude_id":null,"page":1,"page_size":2,"tag":""}': {
          items: [{ id: 1 }],
          meta: { count: 1, page: 1, page_size: 2, total_pages: 1 }
        }
      }
    }

    const payload = await news.actions.fetchArticles(
      { commit, state },
      { page: 1, pageSize: 2, category: 'news' }
    )

    expect(fetchNewsArticlesMock).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith('setArticlesData', [{ id: 1 }])
    expect(payload.items).toEqual([{ id: 1 }])
  })

  it('loads article once and serves article cache', async () => {
    fetchNewsArticleMock.mockResolvedValueOnce({ data: { id: 11, title: 'A' } })
    const commit = vi.fn()
    const state = { article_cache: {} }

    const first = await news.actions.fetchArticle({ commit, state }, { id: 11, force: false })
    state.article_cache[11] = { id: 11, title: 'A' }
    const second = await news.actions.fetchArticle({ commit, state }, { id: 11, force: false })

    expect(fetchNewsArticleMock).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('setActiveArticle', { id: 11, title: 'A' })
    expect(commit).toHaveBeenCalledWith('setArticleCache', { id: 11, article: { id: 11, title: 'A' } })
    expect(first).toEqual({ id: 11, title: 'A' })
    expect(second).toEqual({ id: 11, title: 'A' })
  })
})
