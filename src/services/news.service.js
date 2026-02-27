import { publicApi } from './http'

export function fetchNewsArticles (params = {}) {
  return publicApi.get('/api/articles/', { params })
}

export function fetchNewsArticle (articleSlug) {
  return publicApi.get(`/api/articles/${encodeURIComponent(String(articleSlug || ''))}/`)
}

export function fetchNewsCategories (params = {}) {
  return publicApi.get('/api/article-categories/', { params })
}
