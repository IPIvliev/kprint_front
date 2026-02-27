import {
  fetchNewsArticle,
  fetchNewsArticles,
  fetchNewsCategories
} from '@/services/news.service'

function normalizePositiveInt (value, fallback) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback
  }
  return Math.floor(parsed)
}

function normalizeString (value) {
  return String(value || '').trim()
}

function buildListQuery (payload = {}) {
  const page = normalizePositiveInt(payload.page, 1)
  const pageSize = normalizePositiveInt(payload.pageSize, 12)
  const tag = normalizeString(payload.tag)
  const category = normalizeString(payload.category)
  const excludeRaw = payload.excludeId
  const exclude = normalizePositiveInt(excludeRaw, null)

  const query = {
    page,
    page_size: pageSize,
    tag,
    category,
    exclude_id: exclude
  }

  return {
    requestParams: {
      page: query.page,
      page_size: query.page_size,
      ...(query.tag ? { tag: query.tag } : {}),
      ...(query.category ? { category: query.category } : {}),
      ...(query.exclude_id ? { exclude_id: query.exclude_id } : {})
    },
    cacheKey: JSON.stringify({
      category: query.category,
      exclude_id: query.exclude_id,
      page: query.page,
      page_size: query.page_size,
      tag: query.tag
    })
  }
}

function normalizeListPayload (payload, params) {
  if (Array.isArray(payload)) {
    return {
      items: payload,
      meta: {
        count: payload.length,
        page: params.page,
        page_size: params.page_size,
        total_pages: 1
      }
    }
  }

  const results = Array.isArray(payload?.results) ? payload.results : []
  return {
    items: results,
    meta: {
      count: Number(payload?.count || results.length),
      page: Number(payload?.page || params.page),
      page_size: Number(payload?.page_size || params.page_size),
      total_pages: Number(payload?.total_pages || 1)
    }
  }
}

export const news = {
  namespaced: true,
  state: {
    categories: [],
    categories_loaded: false,
    articles: [],
    articles_meta: {
      count: 0,
      page: 1,
      page_size: 12,
      total_pages: 1
    },
    active_article: null,
    list_cache: {},
    article_cache: {}
  },
  mutations: {
    setCategoriesData (state, categories) {
      state.categories = Array.isArray(categories) ? categories : []
    },
    setCategoriesLoaded (state, loaded) {
      state.categories_loaded = loaded === true
    },
    setArticlesData (state, items) {
      state.articles = Array.isArray(items) ? items : []
    },
    setArticlesMeta (state, meta) {
      state.articles_meta = {
        count: Number(meta?.count || 0),
        page: Number(meta?.page || 1),
        page_size: Number(meta?.page_size || 12),
        total_pages: Number(meta?.total_pages || 1)
      }
    },
    setActiveArticle (state, article) {
      state.active_article = article || null
    },
    setListCache (state, payload) {
      const key = payload?.key
      if (!key) {
        return
      }
      state.list_cache = {
        ...state.list_cache,
        [key]: payload.value
      }
    },
    setArticleCache (state, payload) {
      const key = String(payload?.key || '').trim()
      if (!key) {
        return
      }
      state.article_cache = {
        ...state.article_cache,
        [key]: payload.article || null
      }
    }
  },
  actions: {
    async fetchCategories ({ commit, state }, payload = {}) {
      const force = payload?.force === true
      if (state.categories_loaded && !force) {
        return state.categories
      }

      const response = await fetchNewsCategories({})
      const items = Array.isArray(response?.data) ? response.data : []
      commit('setCategoriesData', items)
      commit('setCategoriesLoaded', true)
      return items
    },
    async fetchArticles ({ commit, state }, payload = {}) {
      const force = payload?.force === true
      const { requestParams, cacheKey } = buildListQuery(payload)

      if (!force && state.list_cache[cacheKey]) {
        const cached = state.list_cache[cacheKey]
        commit('setArticlesData', cached.items)
        commit('setArticlesMeta', cached.meta)
        return cached
      }

      const response = await fetchNewsArticles(requestParams)
      const normalized = normalizeListPayload(response?.data, requestParams)
      commit('setArticlesData', normalized.items)
      commit('setArticlesMeta', normalized.meta)
      commit('setListCache', { key: cacheKey, value: normalized })
      return normalized
    },
    async fetchArticle ({ commit, state }, payload) {
      const articleLookup = typeof payload === 'object'
        ? (payload?.slug || payload?.id)
        : payload
      const lookupKey = String(articleLookup || '').trim()
      const force = typeof payload === 'object' && payload?.force === true
      if (!lookupKey) {
        return null
      }

      if (!force && state.article_cache[lookupKey]) {
        const cached = state.article_cache[lookupKey]
        commit('setActiveArticle', cached)
        return cached
      }

      const response = await fetchNewsArticle(lookupKey)
      const article = response?.data || null
      commit('setActiveArticle', article)
      if (article) {
        const cacheKeys = new Set([lookupKey])
        if (article.id) {
          cacheKeys.add(String(article.id))
        }
        if (article.slug) {
          cacheKeys.add(String(article.slug))
        }
        cacheKeys.forEach((key) => {
          commit('setArticleCache', { key, article })
        })
      }
      return article
    }
  }
}
