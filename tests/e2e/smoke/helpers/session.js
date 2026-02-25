function base64Json (value) {
  return Buffer.from(JSON.stringify(value)).toString('base64')
}

function createJwtToken (ttlSeconds = 3600) {
  const now = Math.floor(Date.now() / 1000)
  const payload = {
    exp: now + ttlSeconds,
    iat: now
  }
  return `header.${base64Json(payload)}.signature`
}

function buildStoredUser (overrides = {}) {
  const token = createJwtToken()
  return {
    access: token,
    refresh: token,
    username: 'e2e-user',
    email: 'e2e@example.com',
    ...overrides
  }
}

async function applyStoredUser (page, overrides = {}) {
  const user = buildStoredUser(overrides)
  await page.addInitScript((serializedUser) => {
    window.localStorage.setItem('user', JSON.stringify(serializedUser))
  }, user)
  return user
}

module.exports = {
  applyStoredUser,
  buildStoredUser,
  createJwtToken
}
