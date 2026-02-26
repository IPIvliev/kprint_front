const fs = require('node:fs')
const path = require('node:path')
const axios = require('axios')

const DEFAULT_SITE_URL = 'https://gorkyliquid.ru'
const CACHE_DIR = path.resolve(__dirname, '..', '.cache')
const CACHE_FILE = path.join(CACHE_DIR, 'seo-routes.json')

function normalizeBaseUrl(value, fallback = '') {
  const raw = String(value || fallback || '').trim()
  return raw.replace(/\/+$/, '')
}

function normalizePath(routePath) {
  const raw = String(routePath || '').trim()
  if (!raw) {
    return '/'
  }
  let normalized = raw.startsWith('/') ? raw : `/${raw}`
  normalized = normalized.replace(/\/{2,}/g, '/')
  if (normalized.length > 1) {
    normalized = normalized.replace(/\/+$/, '')
  }
  return normalized
}

function asId(value) {
  const id = Number(value)
  return Number.isFinite(id) && id > 0 ? id : null
}

function extractList(payload) {
  if (Array.isArray(payload)) {
    return payload
  }
  if (payload && Array.isArray(payload.results)) {
    return payload.results
  }
  if (payload && Array.isArray(payload.items)) {
    return payload.items
  }
  return []
}

function uniqueRoutes(routes) {
  const unique = new Set()
  routes
    .map((item) => normalizePath(item))
    .filter(Boolean)
    .forEach((item) => unique.add(item))
  return Array.from(unique)
}

function getSiteUrl() {
  return normalizeBaseUrl(process.env.VUE_APP_SITE_URL, DEFAULT_SITE_URL)
}

function getApiBaseUrl() {
  return normalizeBaseUrl(
    process.env.SEO_API_BASE || process.env.VUE_APP_API_BASE,
    getSiteUrl()
  )
}

function getStaticPublicRoutes() {
  return uniqueRoutes([
    '/',
    '/about',
    '/contact',
    '/gallery',
    '/dealers',
    '/print',
    '/it-innovations',
    '/news',
    '/shop',
    '/study',
    '/legal/personal-data-policy',
    '/legal/pd-consent',
    '/legal/ads-consent',
    '/legal/terms-offer',
    '/legal/delivery-payment',
    '/legal/returns'
  ])
}

async function requestList(client, url, params = null) {
  try {
    const response = await client.get(url, params ? { params } : undefined)
    return extractList(response.data)
  } catch (error) {
    process.stdout.write(`[seo] route discovery skipped for ${url}: ${error.message}\n`)
    return []
  }
}

async function collectDynamicRoutes() {
  const client = axios.create({
    baseURL: getApiBaseUrl(),
    timeout: Number(process.env.SEO_FETCH_TIMEOUT_MS || 6000)
  })
  const dynamicRoutes = []

  const categories = await requestList(client, '/api/shop/categories')
  categories.forEach((category) => {
    const categoryId = asId(category && category.id)
    if (!categoryId) {
      return
    }
    dynamicRoutes.push(`/shop/categories/${categoryId}`)
    dynamicRoutes.push(`/shop/categories/${categoryId}/showcase`)
  })

  const products = await requestList(client, '/api/shop/products')
  products.forEach((product) => {
    const productId = asId(product && product.id)
    const categorySource = product && product.category
    const categoryId = asId(
      categorySource && typeof categorySource === 'object'
        ? categorySource.id || categorySource.pk
        : categorySource
    )
    if (!productId || !categoryId) {
      return
    }
    dynamicRoutes.push(`/shop/categories/${categoryId}/${productId}`)
  })

  const articleCategories = await requestList(client, '/api/article-categories/')
  articleCategories.forEach((category) => {
    const slug = String(category && category.slug ? category.slug : '').trim()
    if (!slug) {
      return
    }
    dynamicRoutes.push(`/news/category/${slug}`)
  })

  const articles = await requestList(client, '/api/articles/')
  articles.forEach((article) => {
    const articleId = asId(article && article.id)
    if (!articleId) {
      return
    }
    const slug = String(article && article.slug ? article.slug : '').trim()
    if (slug) {
      dynamicRoutes.push(`/news/${articleId}/${encodeURIComponent(slug)}`)
    } else {
      dynamicRoutes.push(`/news/${articleId}`)
    }
    const tags = Array.isArray(article && article.tags) ? article.tags : []
    tags.forEach((tag) => {
      const tagSlug = String(tag && typeof tag === 'object' ? tag.slug : '').trim()
      if (tagSlug) {
        dynamicRoutes.push(`/news/tag/${tagSlug}`)
      }
    })
  })

  const studyCourses = await requestList(client, '/api/study/courses')
  studyCourses.forEach((course) => {
    const courseId = asId(course && course.id)
    if (!courseId) {
      return
    }
    dynamicRoutes.push(`/study/course/${courseId}`)
  })

  return uniqueRoutes(dynamicRoutes)
}

async function collectSeoRoutes() {
  const staticRoutes = getStaticPublicRoutes()
  const dynamicRoutes = await collectDynamicRoutes()
  return uniqueRoutes([...staticRoutes, ...dynamicRoutes])
}

function getPrerenderRoutes() {
  const staticRoutes = getStaticPublicRoutes()
  if (!fs.existsSync(CACHE_FILE)) {
    return staticRoutes
  }
  try {
    const payload = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
    const routes = Array.isArray(payload && payload.prerenderRoutes)
      ? payload.prerenderRoutes
      : []
    return uniqueRoutes([...staticRoutes, ...routes])
  } catch (error) {
    process.stdout.write(`[seo] failed to parse ${CACHE_FILE}: ${error.message}\n`)
    return staticRoutes
  }
}

module.exports = {
  CACHE_DIR,
  CACHE_FILE,
  collectSeoRoutes,
  getApiBaseUrl,
  getPrerenderRoutes,
  getSiteUrl,
  getStaticPublicRoutes,
  normalizePath,
  uniqueRoutes
}
