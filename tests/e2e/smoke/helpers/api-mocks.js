function jsonResponse (body, status = 200) {
  return {
    status,
    contentType: 'application/json; charset=utf-8',
    body: JSON.stringify(body)
  }
}

function normalizePathname (pathname) {
  if (!pathname) {
    return '/'
  }
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname
}

async function mockSmokeApi (page, options = {}) {
  const routes = new Map()
  const staticRoutes = options.routes || {}
  Object.entries(staticRoutes).forEach(([key, value]) => {
    routes.set(key, value)
  })

  if (options.mockPublicIp !== false) {
    await page.route('https://api.ipify.org/**', async (route) => {
      await route.fulfill(jsonResponse({ ip: '1.1.1.1' }))
    })
  }

  await page.route('**/api/**', async (route) => {
    const request = route.request()
    const method = request.method().toUpperCase()
    const url = new URL(request.url())
    const pathname = normalizePathname(url.pathname)
    const key = `${method} ${pathname}`

    if (routes.has(key)) {
      const value = routes.get(key)
      if (typeof value === 'function') {
        const result = await value({ route, request, url, method, pathname })
        if (result === null) {
          return route.fallback()
        }
        return route.fulfill(jsonResponse(result))
      }
      return route.fulfill(jsonResponse(value))
    }

    if (method === 'GET') {
      return route.fulfill(jsonResponse([]))
    }

    return route.fulfill(jsonResponse({ ok: true }))
  })
}

module.exports = {
  mockSmokeApi
}
