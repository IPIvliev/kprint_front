const fs = require('node:fs')
const path = require('node:path')
const https = require('node:https')
const axios = require('axios')

const DEFAULT_SITE_URL = 'https://gorkyliquid.ru'
const CACHE_DIR = path.resolve(__dirname, '..', '.cache')
const CACHE_FILE = path.join(CACHE_DIR, 'seo-routes.json')
const ENV_FILE = path.resolve(__dirname, '..', '.env')

function loadDotEnvConfig () {
  if (!fs.existsSync(ENV_FILE)) {
    return
  }
  const source = fs.readFileSync(ENV_FILE, 'utf8')
  source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .forEach((line) => {
      const separatorIndex = line.indexOf('=')
      const key = line.slice(0, separatorIndex).trim()
      const rawValue = line.slice(separatorIndex + 1).trim()
      if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
        return
      }
      const unquoted = rawValue
        .replace(/^"(.*)"$/, '$1')
        .replace(/^'(.*)'$/, '$1')
      process.env[key] = unquoted
    })
}

loadDotEnvConfig()

function normalizeBaseUrl (value, fallback = '') {
  const raw = String(value || fallback || '').trim()
  return raw.replace(/\/+$/, '')
}

function normalizePath (routePath) {
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

function asId (value) {
  const id = Number(value)
  return Number.isFinite(id) && id > 0 ? id : null
}

function extractList (payload) {
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

function isListPayload (payload) {
  if (Array.isArray(payload)) {
    return true
  }
  if (!payload || typeof payload !== 'object') {
    return false
  }
  return Array.isArray(payload.results) || Array.isArray(payload.items)
}

function uniqueRoutes (routes) {
  const unique = new Set()
  routes
    .map((item) => normalizePath(item))
    .filter(Boolean)
    .forEach((item) => unique.add(item))
  return Array.from(unique)
}

function uniqueBaseUrls (candidates) {
  const unique = new Set()
  candidates
    .map((value) => normalizeBaseUrl(value))
    .filter(Boolean)
    .forEach((value) => unique.add(value))
  return Array.from(unique)
}

function getSiteUrl () {
  return normalizeBaseUrl(process.env.VUE_APP_SITE_URL, DEFAULT_SITE_URL)
}

function getApiBaseCandidates () {
  const envCandidates = String(process.env.SEO_API_BASE_CANDIDATES || '')
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean)

  const explicitBase = normalizeBaseUrl(process.env.SEO_API_BASE)
  const frontendApiBase = normalizeBaseUrl(process.env.VUE_APP_API_BASE)
  const siteUrl = getSiteUrl()

  const httpVariants = [explicitBase, frontendApiBase, siteUrl]
    .filter(Boolean)
    .map((value) => value.replace(/^https:/i, 'http:'))

  const localDefaults = [
    'http://127.0.0.1:8000',
    'http://localhost:8000',
    'http://127.0.0.1:8080',
    'http://localhost:8080'
  ]

  return uniqueBaseUrls([
    ...envCandidates,
    explicitBase,
    frontendApiBase,
    siteUrl,
    ...httpVariants,
    ...localDefaults
  ])
}

function getApiBaseUrl () {
  return getApiBaseCandidates()[0] || getSiteUrl()
}

function getStaticPublicRoutes () {
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

function createApiClient (baseURL) {
  const allowInsecureTls = String(process.env.SEO_ALLOW_INSECURE_TLS || '1') !== '0'
  const timeout = Number(process.env.SEO_FETCH_TIMEOUT_MS || 6000)
  const tlsConfig = allowInsecureTls && /^https:/i.test(baseURL)
    ? { httpsAgent: new https.Agent({ rejectUnauthorized: false }) }
    : {}

  return axios.create({
    baseURL,
    timeout,
    ...tlsConfig
  })
}

function getCachedClient (context, baseURL) {
  if (!context.clientCache.has(baseURL)) {
    context.clientCache.set(baseURL, createApiClient(baseURL))
  }
  return context.clientCache.get(baseURL)
}

async function requestListWithFallback (apiBases, url, params, context) {
  if (!apiBases.length) {
    return []
  }

  const preferredBase = context.preferredBase
  const orderedBases = preferredBase
    ? [preferredBase, ...apiBases.filter((baseURL) => baseURL !== preferredBase)]
    : apiBases

  for (const baseURL of orderedBases) {
    const client = getCachedClient(context, baseURL)
    try {
      const response = await client.get(url, params ? { params } : undefined)
      if (!isListPayload(response.data)) {
        throw new Error('unexpected payload shape')
      }
      context.preferredBase = baseURL
      return extractList(response.data)
    } catch (error) {
      process.stdout.write(`[seo] route discovery failed for ${url} via ${baseURL}: ${error.message}\n`)
    }
  }

  process.stdout.write(`[seo] route discovery skipped for ${url}: all API bases failed\n`)
  return []
}

async function collectDynamicRoutes () {
  const apiBases = getApiBaseCandidates()
  const requestContext = {
    preferredBase: null,
    clientCache: new Map()
  }
  const dynamicRoutes = []

  const categories = await requestListWithFallback(apiBases, '/api/shop/categories', null, requestContext)
  categories.forEach((category) => {
    const categorySlug = String(
      (category && (category.slug || category.id)) || ''
    ).trim()
    if (!categorySlug) {
      return
    }
    const encodedCategorySlug = encodeURIComponent(categorySlug)
    dynamicRoutes.push(`/shop/categories/${encodedCategorySlug}`)
    dynamicRoutes.push(`/shop/categories/${encodedCategorySlug}/showcase`)
  })

  const products = await requestListWithFallback(apiBases, '/api/shop/products', null, requestContext)
  products.forEach((product) => {
    const productSlug = String((product && (product.slug || product.id)) || '').trim()
    const categorySlug = String(
      (product && (product.category_slug || product.category)) || ''
    ).trim()
    if (!productSlug || !categorySlug) {
      return
    }
    dynamicRoutes.push(
      `/shop/categories/${encodeURIComponent(categorySlug)}/${encodeURIComponent(productSlug)}`
    )
  })

  const articleCategories = await requestListWithFallback(apiBases, '/api/article-categories/', null, requestContext)
  articleCategories.forEach((category) => {
    const slug = String(category && category.slug ? category.slug : '').trim()
    if (!slug) {
      return
    }
    dynamicRoutes.push(`/news/category/${slug}`)
  })

  const articles = await requestListWithFallback(apiBases, '/api/articles/', null, requestContext)
  articles.forEach((article) => {
    const articleLookup = String((article && (article.slug || article.id)) || '').trim()
    if (!articleLookup) {
      return
    }
    dynamicRoutes.push(`/news/${encodeURIComponent(articleLookup)}`)
    const tags = Array.isArray(article && article.tags) ? article.tags : []
    tags.forEach((tag) => {
      const tagSlug = String(tag && typeof tag === 'object' ? tag.slug : '').trim()
      if (tagSlug) {
        dynamicRoutes.push(`/news/tag/${tagSlug}`)
      }
    })
  })

  const studyCourses = await requestListWithFallback(apiBases, '/api/study/courses', null, requestContext)
  studyCourses.forEach((course) => {
    const courseSlug = String((course && (course.slug || course.id)) || '').trim()
    if (!courseSlug) {
      return
    }
    dynamicRoutes.push(`/study/course/${encodeURIComponent(courseSlug)}`)
  })

  return uniqueRoutes(dynamicRoutes)
}

function readCachedPayload () {
  if (!fs.existsSync(CACHE_FILE)) {
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  } catch (error) {
    process.stdout.write(`[seo] failed to parse ${CACHE_FILE}: ${error.message}\n`)
    return null
  }
}

function getCachedDynamicRoutes (staticRoutes) {
  const payload = readCachedPayload()
  const cachedRoutes = Array.isArray(payload && payload.routes) ? payload.routes : []
  if (!cachedRoutes.length) {
    return []
  }
  const staticSet = new Set(staticRoutes.map((routePath) => normalizePath(routePath)))
  return uniqueRoutes(cachedRoutes.filter((routePath) => !staticSet.has(normalizePath(routePath))))
}

async function collectSeoRoutes () {
  const staticRoutes = getStaticPublicRoutes()
  const dynamicRoutes = await collectDynamicRoutes()
  if (dynamicRoutes.length) {
    return uniqueRoutes([...staticRoutes, ...dynamicRoutes])
  }
  const cachedDynamicRoutes = getCachedDynamicRoutes(staticRoutes)
  if (cachedDynamicRoutes.length) {
    process.stdout.write(`[seo] using ${cachedDynamicRoutes.length} cached dynamic routes\n`)
    return uniqueRoutes([...staticRoutes, ...cachedDynamicRoutes])
  }
  return staticRoutes
}

function getPrerenderRoutes () {
  const staticRoutes = getStaticPublicRoutes()
  const payload = readCachedPayload()
  const routes = Array.isArray(payload && payload.prerenderRoutes)
    ? payload.prerenderRoutes
    : []
  return uniqueRoutes([...staticRoutes, ...routes])
}

module.exports = {
  CACHE_DIR,
  CACHE_FILE,
  collectSeoRoutes,
  getApiBaseCandidates,
  getApiBaseUrl,
  getPrerenderRoutes,
  getSiteUrl,
  getStaticPublicRoutes,
  normalizePath,
  uniqueRoutes
}
