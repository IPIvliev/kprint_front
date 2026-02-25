const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    post: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  api: apiMock
}))

import authService from '@/services/auth.service'

describe('auth service', () => {
  beforeEach(() => {
    apiMock.post.mockReset()
  })

  it('stores user after successful login with access token', async () => {
    apiMock.post.mockResolvedValueOnce({
      data: { access: 'token-1', refresh: 'token-2' }
    })
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const result = await authService.login({ username: 'u', password: 'p' })

    expect(apiMock.post).toHaveBeenCalledWith('/api/token/', { username: 'u', password: 'p' })
    expect(result).toEqual({ access: 'token-1', refresh: 'token-2' })
    expect(JSON.parse(window.localStorage.getItem('user'))).toEqual({ access: 'token-1', refresh: 'token-2' })
    logSpy.mockRestore()
  })

  it('registers user with expected payload', async () => {
    apiMock.post.mockResolvedValueOnce({ data: { ok: true } })
    await authService.register({
      username: 'u',
      email: 'x@y.z',
      password: 'secret',
      terms_offer_accepted: true,
      pd_accepted: true,
      ads_accepted: false
    })
    expect(apiMock.post).toHaveBeenCalledWith('/api/signup', {
      username: 'u',
      email: 'x@y.z',
      password: 'secret',
      terms_offer_accepted: true,
      pd_accepted: true,
      ads_accepted: false
    })
  })

  it('submits password reset confirmation payload', async () => {
    apiMock.post.mockResolvedValueOnce({ data: { ok: true } })
    await authService.confirmPasswordReset({
      uid: 'uid-1',
      token: 'token-1',
      new_password: 'next'
    })
    expect(apiMock.post).toHaveBeenCalledWith('/api/password-reset/confirm', {
      uid: 'uid-1',
      token: 'token-1',
      new_password: 'next'
    })
  })
})
