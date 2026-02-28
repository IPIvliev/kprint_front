const fs = require('node:fs')
const {
  CACHE_FILE,
  getSiteUrl,
  getStaticPublicRoutes,
  normalizePath,
  uniqueRoutes
} = require('./seo-routes')
const axios = require('axios')

const DEFAULT_ENDPOINT = 'https://yandex.com/indexnow'
const DEFAULT_TIMEOUT_MS = 10000
const DEFAULT_MAX_URLS = 10000

function normalizeBaseUrl (value) {
  return String(value || '').trim().replace(/\/+$/, '')
}

function readCachePayload () {
  if (!fs.existsSync(CACHE_FILE)) {
    return null
  }
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'))
  } catch (error) {
    throw new Error(`failed to parse cache file: ${error.message}`)
  }
}

function resolveRoutePathsFromCache () {
  const payload = readCachePayload()
  if (!payload || typeof payload !== 'object') {
    return []
  }

  if (Array.isArray(payload.routes) && payload.routes.length) {
    return uniqueRoutes(payload.routes.map((routePath) => normalizePath(routePath)))
  }

  if (Array.isArray(payload.routeEntries) && payload.routeEntries.length) {
    return uniqueRoutes(
      payload.routeEntries.map((entry) => normalizePath(entry && entry.path))
    )
  }

  return []
}

function resolveUrlList (siteUrl, routePaths, maxUrls = DEFAULT_MAX_URLS) {
  const normalizedSiteUrl = normalizeBaseUrl(siteUrl)
  const limit = Number.isFinite(Number(maxUrls)) ? Math.max(1, Math.trunc(Number(maxUrls))) : DEFAULT_MAX_URLS
  return routePaths
    .map((routePath) => normalizePath(routePath))
    .filter(Boolean)
    .slice(0, limit)
    .map((routePath) => `${normalizedSiteUrl}${routePath === '/' ? '' : routePath}`)
}

function buildIndexNowPayload (options = {}) {
  const siteUrl = normalizeBaseUrl(options.siteUrl || getSiteUrl())
  const host = options.host || siteUrl.replace(/^https?:\/\//i, '')
  const key = String(options.key || process.env.INDEXNOW_KEY || '').trim()
  if (!key) {
    throw new Error('INDEXNOW_KEY is required')
  }

  const routePaths = Array.isArray(options.routePaths) && options.routePaths.length
    ? uniqueRoutes(options.routePaths)
    : resolveRoutePathsFromCache()
  const fallbackRoutes = routePaths.length ? routePaths : getStaticPublicRoutes()
  const urlList = resolveUrlList(siteUrl, fallbackRoutes, options.maxUrls || process.env.INDEXNOW_MAX_URLS)
  if (!urlList.length) {
    throw new Error('urlList is empty')
  }

  const keyLocation = String(options.keyLocation || process.env.INDEXNOW_KEY_LOCATION || `${siteUrl}/${key}.txt`).trim()
  return {
    host,
    key,
    keyLocation,
    urlList
  }
}

async function pingIndexNow (options = {}) {
  const endpoint = String(options.endpoint || process.env.INDEXNOW_ENDPOINT || DEFAULT_ENDPOINT).trim()
  const timeout = Number(options.timeoutMs || process.env.INDEXNOW_TIMEOUT_MS || DEFAULT_TIMEOUT_MS)
  const payload = buildIndexNowPayload(options)

  const response = await axios.post(endpoint, payload, {
    timeout,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return {
    endpoint,
    status: response.status,
    submitted: payload.urlList.length
  }
}

if (require.main === module) {
  pingIndexNow()
    .then((result) => {
      process.stdout.write(`[indexnow] submitted ${result.submitted} urls to ${result.endpoint} (status ${result.status})\n`)
    })
    .catch((error) => {
      process.stderr.write(`[indexnow] failed: ${error.message}\n`)
      process.exitCode = 1
    })
}

module.exports = {
  buildIndexNowPayload,
  pingIndexNow,
  resolveRoutePathsFromCache,
  resolveUrlList
}
