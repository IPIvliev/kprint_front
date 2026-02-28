const fs = require('node:fs')
const path = require('node:path')
const https = require('node:https')
const axios = require('axios')

const DEFAULT_SITE_URL = 'https://gorkyliquid.ru'
const CACHE_DIR = path.resolve(__dirname, '..', '.cache')
const CACHE_FILE = path.join(CACHE_DIR, 'seo-routes.json')
const ENV_FILE = path.resolve(__dirname, '..', '.env')

function parseDotEnvSource (source) {
  return String(source || '')
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#') && line.includes('='))
    .reduce((acc, line) => {
      const separatorIndex = line.indexOf('=')
      const key = line.slice(0, separatorIndex).trim()
      const rawValue = line.slice(separatorIndex + 1).trim()
      if (!key) {
        return acc
      }
      const unquoted = rawValue
        .replace(/^"(.*)"$/, '$1')
        .replace(/^'(.*)'$/, '$1')
      acc[key] = unquoted
      return acc
    }, {})
}

function readDotEnvFile (filePath) {
  if (!fs.existsSync(filePath)) {
    return {}
  }
  const source = fs.readFileSync(filePath, 'utf8')
  return parseDotEnvSource(source)
}

function getDotEnvMode () {
  const rawMode = String(
    process.env.SEO_ENV_MODE
      || process.env.VUE_CLI_MODE
      || process.env.NODE_ENV
      || 'production'
  ).trim()
  return rawMode || 'production'
}

function loadDotEnvConfig () {
  const mode = getDotEnvMode()
  const envRoot = path.resolve(__dirname, '..')
  const candidates = [
    ENV_FILE,
    path.resolve(envRoot, '.env.local'),
    path.resolve(envRoot, `.env.${mode}`),
    path.resolve(envRoot, `.env.${mode}.local`)
  ]

  const mergedConfig = {}
  candidates.forEach((candidatePath) => {
    Object.assign(mergedConfig, readDotEnvFile(candidatePath))
  })

  Object.entries(mergedConfig).forEach(([key, value]) => {
    if (!key || Object.prototype.hasOwnProperty.call(process.env, key)) {
      return
    }
    process.env[key] = value
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

function normalizeLastMod (value) {
  const raw = String(value || '').trim()
  if (!raw) {
    return ''
  }
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }
  return parsed.toISOString()
}

function asRouteEntry (routePath, lastmod = '') {
  return {
    path: normalizePath(routePath),
    lastmod: normalizeLastMod(lastmod)
  }
}

function uniqueRoutes (routes) {
  const unique = new Set()
  routes
    .map((item) => normalizePath(item))
    .filter(Boolean)
    .forEach((item) => unique.add(item))
  return Array.from(unique)
}

function uniqueRouteEntries (entries) {
  const byPath = new Map()
  entries.forEach((entry) => {
    if (!entry) {
      return
    }
    const path = normalizePath(entry.path || entry)
    if (!path) {
      return
    }
    const lastmod = normalizeLastMod(entry.lastmod)
    if (!byPath.has(path)) {
      byPath.set(path, { path, lastmod })
      return
    }
    const previous = byPath.get(path)
    const previousLastmod = normalizeLastMod(previous.lastmod)
    if (lastmod && (!previousLastmod || lastmod > previousLastmod)) {
      byPath.set(path, { path, lastmod })
    }
  })
  return Array.from(byPath.values())
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
    'http://127.0.0.1:8081',
    'http://localhost:8081',
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

function getStaticPublicRouteEntries () {
  return uniqueRouteEntries(
    getStaticPublicRoutes().map((routePath) => asRouteEntry(routePath))
  )
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

async function collectDynamicRouteEntries () {
  const apiBases = getApiBaseCandidates()
  const requestContext = {
    preferredBase: null,
    clientCache: new Map()
  }
  const dynamicEntries = []

  const categories = await requestListWithFallback(apiBases, '/api/shop/categories', null, requestContext)
  categories.forEach((category) => {
    const categorySlug = String(
      (category && (category.slug || category.id)) || ''
    ).trim()
    if (!categorySlug) {
      return
    }
    const encodedCategorySlug = encodeURIComponent(categorySlug)
    const categoryLastmod = normalizeLastMod(
      category && (category.updated_at || category.updated || category.created_at || category.created)
    )
    dynamicEntries.push(asRouteEntry(`/shop/categories/${encodedCategorySlug}`, categoryLastmod))
    dynamicEntries.push(asRouteEntry(`/shop/categories/${encodedCategorySlug}/showcase`, categoryLastmod))
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
    const productLastmod = normalizeLastMod(
      product && (product.updated_at || product.updated || product.created_at || product.created)
    )
    dynamicEntries.push(
      asRouteEntry(
        `/shop/categories/${encodeURIComponent(categorySlug)}/${encodeURIComponent(productSlug)}`,
        productLastmod
      )
    )
  })

  const articleCategories = await requestListWithFallback(apiBases, '/api/article-categories/', null, requestContext)
  articleCategories.forEach((category) => {
    const slug = String(category && category.slug ? category.slug : '').trim()
    if (!slug) {
      return
    }
    const categoryLastmod = normalizeLastMod(
      category && (category.updated_at || category.updated || category.created_at || category.created)
    )
    dynamicEntries.push(asRouteEntry(`/news/category/${slug}`, categoryLastmod))
  })

  const articles = await requestListWithFallback(apiBases, '/api/articles/', null, requestContext)
  articles.forEach((article) => {
    const articleLookup = String((article && (article.slug || article.id)) || '').trim()
    if (!articleLookup) {
      return
    }
    const articleLastmod = normalizeLastMod(
      article && (article.publish_iso || article.publish)
    )
    dynamicEntries.push(asRouteEntry(`/news/${encodeURIComponent(articleLookup)}`, articleLastmod))
    const tags = Array.isArray(article && article.tags) ? article.tags : []
    tags.forEach((tag) => {
      const tagSlug = String(tag && typeof tag === 'object' ? tag.slug : '').trim()
      if (tagSlug) {
        dynamicEntries.push(asRouteEntry(`/news/tag/${tagSlug}`, articleLastmod))
      }
    })
  })

  const studyCourses = await requestListWithFallback(apiBases, '/api/study/courses', null, requestContext)
  studyCourses.forEach((course) => {
    const courseSlug = String((course && (course.slug || course.id)) || '').trim()
    if (!courseSlug) {
      return
    }
    const courseLastmod = normalizeLastMod(
      course && (course.updated_at || course.updated || course.created_at || course.created)
    )
    dynamicEntries.push(asRouteEntry(`/study/course/${encodeURIComponent(courseSlug)}`, courseLastmod))
  })

  return uniqueRouteEntries(dynamicEntries)
}

async function collectDynamicRoutes () {
  const dynamicEntries = await collectDynamicRouteEntries()
  return uniqueRoutes(dynamicEntries.map((entry) => entry.path))
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

function getCachedDynamicRouteEntries (staticEntries) {
  const payload = readCachedPayload()
  const cachedRouteEntries = Array.isArray(payload && payload.routeEntries) ? payload.routeEntries : []
  if (!cachedRouteEntries.length) {
    return []
  }
  const staticSet = new Set(staticEntries.map((entry) => normalizePath(entry.path)))
  return uniqueRouteEntries(
    cachedRouteEntries
      .map((entry) => asRouteEntry(entry && entry.path, entry && entry.lastmod))
      .filter((entry) => !staticSet.has(entry.path))
  )
}

async function collectSeoRouteEntries () {
  const staticEntries = getStaticPublicRouteEntries()
  const dynamicEntries = await collectDynamicRouteEntries()
  if (dynamicEntries.length) {
    return uniqueRouteEntries([...staticEntries, ...dynamicEntries])
  }
  const cachedDynamicEntries = getCachedDynamicRouteEntries(staticEntries)
  if (cachedDynamicEntries.length) {
    process.stdout.write(`[seo] using ${cachedDynamicEntries.length} cached dynamic route entries\n`)
    return uniqueRouteEntries([...staticEntries, ...cachedDynamicEntries])
  }
  const cachedDynamicRoutes = getCachedDynamicRoutes(staticEntries.map((entry) => entry.path))
  if (cachedDynamicRoutes.length) {
    process.stdout.write(`[seo] using ${cachedDynamicRoutes.length} cached dynamic routes\n`)
    return uniqueRouteEntries([
      ...staticEntries,
      ...cachedDynamicRoutes.map((routePath) => asRouteEntry(routePath))
    ])
  }
  return staticEntries
}

async function collectSeoRoutes () {
  const entries = await collectSeoRouteEntries()
  return uniqueRoutes(entries.map((entry) => entry.path))
}

function getPrerenderRoutes () {
  const staticRoutes = getStaticPublicRoutes()
  const payload = readCachedPayload()
  const prerenderRoutes = Array.isArray(payload && payload.prerenderRoutes)
    ? payload.prerenderRoutes
    : []
  if (prerenderRoutes.length) {
    return uniqueRoutes([...staticRoutes, ...prerenderRoutes])
  }
  const routeEntries = Array.isArray(payload && payload.routeEntries)
    ? payload.routeEntries
    : []
  const entryPaths = routeEntries.map((entry) => normalizePath(entry && entry.path))
  return uniqueRoutes([...staticRoutes, ...entryPaths])
}

module.exports = {
  CACHE_DIR,
  CACHE_FILE,
  collectDynamicRouteEntries,
  collectSeoRouteEntries,
  collectSeoRoutes,
  getApiBaseCandidates,
  getApiBaseUrl,
  getPrerenderRoutes,
  getSiteUrl,
  getStaticPublicRouteEntries,
  getStaticPublicRoutes,
  normalizeLastMod,
  normalizePath,
  uniqueRouteEntries,
  uniqueRoutes
}
