const { authServiceMock } = vi.hoisted(() => ({
  authServiceMock: {
    login: vi.fn(),
    logout: vi.fn(),
    register: vi.fn()
  }
}))

vi.mock('@/services/auth.service', () => ({
  default: authServiceMock
}))

describe('store/auth.module', () => {
  beforeEach(() => {
    authServiceMock.login.mockReset()
    authServiceMock.logout.mockReset()
    authServiceMock.register.mockReset()
  })

  it('commits loginSuccess on successful login action', async () => {
    const { auth } = await import('@/store/auth.module')
    authServiceMock.login.mockResolvedValueOnce({ access: 'token' })
    const commit = vi.fn()
    const response = await auth.actions.login({ commit }, { username: 'u', password: 'p' })
    expect(response).toEqual({ access: 'token' })
    expect(commit).toHaveBeenCalledWith('loginSuccess', { access: 'token' })
  })

  it('commits loginFailure on failed login action', async () => {
    const { auth } = await import('@/store/auth.module')
    authServiceMock.login.mockRejectedValueOnce(new Error('denied'))
    const commit = vi.fn()
    await expect(auth.actions.login({ commit }, { username: 'u', password: 'p' })).rejects.toThrow('denied')
    expect(commit).toHaveBeenCalledWith('loginFailure')
  })

  it('commits registerSuccess and registerFailure', async () => {
    const { auth } = await import('@/store/auth.module')
    const commit = vi.fn()

    authServiceMock.register.mockResolvedValueOnce({ data: { ok: true } })
    const data = await auth.actions.register({ commit }, { username: 'u' })
    expect(data).toEqual({ ok: true })
    expect(commit).toHaveBeenCalledWith('registerSuccess')

    authServiceMock.register.mockRejectedValueOnce(new Error('bad'))
    await expect(auth.actions.register({ commit }, { username: 'u' })).rejects.toThrow('bad')
    expect(commit).toHaveBeenCalledWith('registerFailure')
  })

  it('logout action calls service and commits mutation', async () => {
    const { auth } = await import('@/store/auth.module')
    const commit = vi.fn()
    auth.actions.logout({ commit })
    expect(authServiceMock.logout).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('logout')
  })

  it('mutations change auth state', async () => {
    const { auth } = await import('@/store/auth.module')
    const state = { status: { loggedIn: false }, user: null }

    auth.mutations.loginSuccess(state, { id: 1 })
    expect(state.status.loggedIn).toBe(true)
    expect(state.user).toEqual({ id: 1 })

    auth.mutations.logout(state)
    expect(state.status.loggedIn).toBe(false)
    expect(state.user).toBe(null)
  })
})
