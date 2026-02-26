const fs = require('node:fs')
const path = require('node:path')
const {
  CACHE_DIR,
  CACHE_FILE,
  collectSeoRoutes,
  getSiteUrl,
  normalizePath,
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

function isIndexableRoute(routePath) {
  const normalized = normalizePath(routePath)
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

function xmlEscape(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function generateSitemapXml(routes, siteUrl) {
  const normalizedSiteUrl = String(siteUrl || '').replace(/\/+$/, '')
  const lastMod = new Date().toISOString()
  const body = routes
    .map((routePath) => {
      const fullUrl = `${normalizedSiteUrl}${routePath === '/' ? '' : routePath}`
      return [
        '  <url>',
        `    <loc>${xmlEscape(fullUrl)}</loc>`,
        `    <lastmod>${lastMod}</lastmod>`,
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
    '',
    `Sitemap: ${normalizedSiteUrl}/sitemap.xml`,
    ''
  ].join('\n')
}

async function buildSeoAssets() {
  const siteUrl = getSiteUrl()
  const discoveredRoutes = await collectSeoRoutes()
  const indexableRoutes = uniqueRoutes(discoveredRoutes.filter(isIndexableRoute))
  const prerenderRoutes = indexableRoutes.filter((routePath) => !routePath.startsWith('/news/tag/'))

  ensureDir(PUBLIC_DIR)
  ensureDir(CACHE_DIR)

  const sitemapXml = generateSitemapXml(indexableRoutes, siteUrl)
  const robotsTxt = generateRobotsTxt(siteUrl)

  fs.writeFileSync(SITEMAP_FILE, sitemapXml, 'utf8')
  fs.writeFileSync(ROBOTS_FILE, robotsTxt, 'utf8')

  const cachePayload = {
    generatedAt: new Date().toISOString(),
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
  generateRobotsTxt,
  generateSitemapXml,
  isIndexableRoute
}
