const fs = require('node:fs')
const path = require('node:path')
const {
  CACHE_DIR,
  CACHE_FILE,
  collectSeoRouteEntries,
  getSiteUrl,
  normalizePath,
  uniqueRouteEntries,
  uniqueRoutes
} = require('./seo-routes')

const PUBLIC_DIR = path.resolve(__dirname, '..', 'public')
const SITEMAP_FILE = path.join(PUBLIC_DIR, 'sitemap.xml')
const ROBOTS_FILE = path.join(PUBLIC_DIR, 'robots.txt')

const NOINDEX_EXACT = new Set([
  '/login',
  '/registration',
  '/forgot-password',
  '/shop/cart',
  '/shop/order'
])

function getRoutePath(routeEntry) {
  if (routeEntry && typeof routeEntry === 'object') {
    return normalizePath(routeEntry.path)
  }
  return normalizePath(routeEntry)
}

function getRouteLastmod(routeEntry) {
  if (!routeEntry || typeof routeEntry !== 'object') {
    return ''
  }
  const raw = String(routeEntry.lastmod || '').trim()
  if (!raw) {
    return ''
  }
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return ''
  }
  return parsed.toISOString()
}

function isIndexableRoute(routeEntry) {
  const normalized = getRoutePath(routeEntry)
  if (normalized === '/panel' || normalized.startsWith('/panel/')) {
    return false
  }
  return !NOINDEX_EXACT.has(normalized)
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

function normalizeIndexNowKey (value) {
  const normalized = String(value || '').trim()
  if (!normalized) {
    return ''
  }
  if (!/^[A-Za-z0-9_-]+$/.test(normalized)) {
    return ''
  }
  return normalized
}

function generateIndexNowKeyFile (indexNowKey, publicDir = PUBLIC_DIR) {
  const normalizedKey = normalizeIndexNowKey(indexNowKey)
  if (!normalizedKey) {
    return ''
  }
  ensureDir(publicDir)
  const keyFilePath = path.join(publicDir, `${normalizedKey}.txt`)
  fs.writeFileSync(keyFilePath, normalizedKey, 'utf8')
  return keyFilePath
}

function xmlEscape(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateSitemapXml(routes, siteUrl, generatedAt = new Date().toISOString()) {
  const normalizedSiteUrl = String(siteUrl || '').replace(/\/+$/, '')
  const fallbackLastmod = getRouteLastmod({ lastmod: generatedAt }) || new Date().toISOString()
  const body = routes
    .map((routeEntry) => {
      const routePath = getRoutePath(routeEntry)
      const routeLastmod = getRouteLastmod(routeEntry) || fallbackLastmod
      const fullUrl = `${normalizedSiteUrl}${routePath === '/' ? '' : routePath}`
      return [
        '  <url>',
        `    <loc>${xmlEscape(fullUrl)}</loc>`,
        `    <lastmod>${routeLastmod}</lastmod>`,
        '    <changefreq>weekly</changefreq>',
        '    <priority>0.7</priority>',
        '  </url>'
      ].join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    body,
    '</urlset>',
    ''
  ].join('\n')
}

function generateRobotsTxt(siteUrl) {
  const normalizedSiteUrl = String(siteUrl || '').replace(/\/+$/, '')
  return [
    'User-agent: *',
    'Allow: /',
    'Disallow: /panel/',
    'Disallow: /login',
    'Disallow: /registration',
    'Disallow: /forgot-password',
    'Disallow: /reset-password',
    'Disallow: /shop/cart',
    'Disallow: /shop/order',
    'Clean-param: PAGEN_1 /',
    '',
    `Sitemap: ${normalizedSiteUrl}/sitemap.xml`,
    ''
  ].join('\n')
}

async function buildSeoAssets() {
  const siteUrl = getSiteUrl()
  const generatedAt = new Date().toISOString()
  const discoveredEntries = await collectSeoRouteEntries()
  const indexableEntries = uniqueRouteEntries(discoveredEntries.filter(isIndexableRoute))
  const indexableRoutes = uniqueRoutes(indexableEntries.map((entry) => entry.path))
  const prerenderRoutes = indexableRoutes.filter((routePath) => !routePath.startsWith('/news/tag/'))

  ensureDir(PUBLIC_DIR)
  ensureDir(CACHE_DIR)

  const sitemapXml = generateSitemapXml(indexableEntries, siteUrl, generatedAt)
  const robotsTxt = generateRobotsTxt(siteUrl)
  const indexNowKeyFile = generateIndexNowKeyFile(process.env.INDEXNOW_KEY, PUBLIC_DIR)

  fs.writeFileSync(SITEMAP_FILE, sitemapXml, 'utf8')
  fs.writeFileSync(ROBOTS_FILE, robotsTxt, 'utf8')

  const cachePayload = {
    generatedAt,
    routeEntries: indexableEntries,
    routes: indexableRoutes,
    prerenderRoutes
  }
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cachePayload, null, 2), 'utf8')

  process.stdout.write(
    `[seo] generated ${path.relative(process.cwd(), SITEMAP_FILE)} (${indexableRoutes.length} routes)\n`
  )
  process.stdout.write(
    `[seo] generated ${path.relative(process.cwd(), ROBOTS_FILE)}\n`
  )
  if (indexNowKeyFile) {
    process.stdout.write(
      `[seo] generated ${path.relative(process.cwd(), indexNowKeyFile)}\n`
    )
  }
  process.stdout.write(
    `[seo] updated ${path.relative(process.cwd(), CACHE_FILE)} (${prerenderRoutes.length} prerender routes)\n`
  )
}

if (require.main === module) {
  buildSeoAssets().catch((error) => {
    process.stderr.write(`[seo] generation failed: ${error.message}\n`)
    process.exitCode = 1
  })
}

module.exports = {
  buildSeoAssets,
  generateIndexNowKeyFile,
  generateRobotsTxt,
  generateSitemapXml,
  isIndexableRoute,
  normalizeIndexNowKey
}
