import { shallowMount } from '@vue/test-utils'

const { isManagerUserMock, setStoredPanelModeMock } = vi.hoisted(() => ({
  isManagerUserMock: vi.fn(),
  setStoredPanelModeMock: vi.fn()
}))

vi.mock('@/utils/panelMode', () => ({
  isManagerUser: isManagerUserMock,
  setStoredPanelMode: setStoredPanelModeMock
}))

import PanelHomeView from '@/views/Panel/Panel.vue'

function mountWithContext ({ user, path, isManager }) {
  isManagerUserMock.mockReturnValue(isManager)
  const $store = { state: { auth: { user } } }
  const $router = { replace: vi.fn() }
  const $route = { path }
  const wrapper = shallowMount(PanelHomeView, {
    global: {
      mocks: { $store, $router, $route },
      stubs: {
        HeaderPanelBlock: true,
        MainPanelPage: true,
        FooterPanelBlock: true
      }
    }
  })
  return { wrapper, $router }
}

describe('views/Panel/Panel.vue', () => {
  beforeEach(() => {
    isManagerUserMock.mockReset()
    setStoredPanelModeMock.mockReset()
  })

  it('redirects manager from /panel to dashboard on mount', () => {
    const { $router } = mountWithContext({
      user: { id: 1, groups: ['manager'] },
      path: '/panel',
      isManager: true
    })

    expect(setStoredPanelModeMock).toHaveBeenCalledWith('manager')
    expect($router.replace).toHaveBeenCalledWith('/panel/manager')
  })

  it('does not redirect non-manager user', () => {
    const { $router } = mountWithContext({
      user: { id: 2, groups: ['user'] },
      path: '/panel',
      isManager: false
    })

    expect(setStoredPanelModeMock).not.toHaveBeenCalled()
    expect($router.replace).not.toHaveBeenCalled()
  })

  it('does not redirect manager outside /panel root route', () => {
    const { $router } = mountWithContext({
      user: { id: 3, groups: ['manager'] },
      path: '/panel/user',
      isManager: true
    })

    expect(setStoredPanelModeMock).not.toHaveBeenCalled()
    expect($router.replace).not.toHaveBeenCalled()
  })
})
