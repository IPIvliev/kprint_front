import { publicApi } from './http'

export function fetchNewsArticles (params = {}) {
  return publicApi.get('/api/articles/', { params })
}

export function fetchNewsArticle (articleId) {
  return publicApi.get(`/api/articles/${Number(articleId)}/`)
}

export function fetchNewsCategories (params = {}) {
  return publicApi.get('/api/article-categories/', { params })
}
