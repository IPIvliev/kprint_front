const { userApiMock, authHeaderMock } = vi.hoisted(() => ({
  userApiMock: {
    get: vi.fn()
  },
  authHeaderMock: vi.fn(() => ({ Authorization: 'Bearer abc' }))
}))

vi.mock('@/services/http', () => ({
  userApi: userApiMock
}))

vi.mock('@/services/auth-header', () => ({
  default: authHeaderMock
}))

import userService from '@/services/user.service'

describe('user service', () => {
  beforeEach(() => {
    userApiMock.get.mockReset()
    authHeaderMock.mockClear()
  })

  it('loads public board', async () => {
    userApiMock.get.mockResolvedValueOnce({ data: [] })
    await userService.getPublicContent()
    expect(userApiMock.get).toHaveBeenCalledWith('/api/test/all')
  })

  it('loads user board with auth header', async () => {
    userApiMock.get.mockResolvedValueOnce({ data: [] })
    await userService.getUserBoard()
    expect(authHeaderMock).toHaveBeenCalled()
    expect(userApiMock.get).toHaveBeenCalledWith('/api/test/user', { headers: { Authorization: 'Bearer abc' } })
  })
})
