import authHeader from '@/services/auth-header'

function makeJwt (expOffsetSeconds) {
  const now = Math.floor(Date.now() / 1000)
  const payload = { exp: now + expOffsetSeconds }
  return `header.${btoa(JSON.stringify(payload))}.sig`
}

describe('auth-header service', () => {
  it('returns bearer header for non-expired token', () => {
    const token = makeJwt(3600)
    window.localStorage.setItem('user', JSON.stringify({ access: token }))

    expect(authHeader()).toEqual({ Authorization: `Bearer ${token}` })
  })

  it('returns empty object for expired token', () => {
    window.localStorage.setItem('user', JSON.stringify({ access: makeJwt(-10) }))
    expect(authHeader()).toEqual({})
  })

  it('returns empty object for malformed token', () => {
    window.localStorage.setItem('user', JSON.stringify({ access: 'broken-token' }))
    expect(authHeader()).toEqual({})
  })
})
