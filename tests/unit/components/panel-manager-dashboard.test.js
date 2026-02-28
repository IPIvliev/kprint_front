import { flushPromises, shallowMount } from '@vue/test-utils'

const {
  fetchManagerCallbackRequestsMock,
  fetchPanelArticlesMock,
  fetchPrintJobsMock,
  fetchShopOrderStatusesMock,
  fetchShopOrdersMock,
  fetchManagerStudyEnrollmentsMock,
  isManagerUserMock
} = vi.hoisted(() => ({
  fetchManagerCallbackRequestsMock: vi.fn(),
  fetchPanelArticlesMock: vi.fn(),
  fetchPrintJobsMock: vi.fn(),
  fetchShopOrderStatusesMock: vi.fn(),
  fetchShopOrdersMock: vi.fn(),
  fetchManagerStudyEnrollmentsMock: vi.fn(),
  isManagerUserMock: vi.fn()
}))

vi.mock('@/services/panel.service', () => ({
  fetchManagerCallbackRequests: fetchManagerCallbackRequestsMock,
  fetchPanelArticles: fetchPanelArticlesMock,
  fetchPrintJobs: fetchPrintJobsMock,
  fetchShopOrderStatuses: fetchShopOrderStatusesMock,
  fetchShopOrders: fetchShopOrdersMock
}))

vi.mock('@/services/study-learning.service', () => ({
  fetchManagerStudyEnrollments: fetchManagerStudyEnrollmentsMock
}))

vi.mock('@/utils/panelMode', () => ({
  isManagerUser: isManagerUserMock
}))

import PanelManagerDashboard from '@/components/Panel/PanelManagerDashboard.vue'

function mountView () {
  const $router = { replace: vi.fn() }
  const $store = { state: { auth: { user: { id: 1, username: 'manager' } } } }

  const wrapper = shallowMount(PanelManagerDashboard, {
    global: {
      mocks: { $router, $store },
      stubs: {
        MenuBlock: true,
        RouterLink: true
      }
    }
  })

  return { wrapper, $router }
}

describe('components/Panel/PanelManagerDashboard.vue', () => {
  beforeEach(() => {
    isManagerUserMock.mockReset()
    fetchManagerCallbackRequestsMock.mockReset()
    fetchPanelArticlesMock.mockReset()
    fetchPrintJobsMock.mockReset()
    fetchShopOrderStatusesMock.mockReset()
    fetchShopOrdersMock.mockReset()
    fetchManagerStudyEnrollmentsMock.mockReset()

    isManagerUserMock.mockReturnValue(true)
    fetchPrintJobsMock.mockResolvedValue({ data: [] })
    fetchShopOrdersMock.mockResolvedValue({ data: [] })
    fetchShopOrderStatusesMock.mockResolvedValue({ data: [] })
    fetchPanelArticlesMock.mockResolvedValue({ data: [] })
    fetchManagerCallbackRequestsMock.mockResolvedValue({ data: [] })
  })

  it('counts only paid learners without issued certificate', async () => {
    fetchManagerStudyEnrollmentsMock.mockResolvedValue({
      data: [
        { id: 1, status: 'active', paid_at: '2026-01-10T10:00:00Z', certificate_status: 'not_reviewed' },
        { id: 2, status: 'active', paid_at: '2026-01-10T10:00:00Z', certificate_status: 'issued' },
        { id: 3, status: 'pending_payment', paid_at: null, certificate_status: 'not_reviewed' },
        { id: 4, status: 'active', paid_at: '2026-01-10T10:00:00Z', certificate_status: 'rejected' },
        { id: 5, status: 'completed', paid_at: null, certificate_status: 'not_reviewed' }
      ]
    })

    const { wrapper } = mountView()
    await flushPromises()

    expect(wrapper.vm.stats.studyPendingLearners).toBe(3)
  })

  it('shows warning when enrollments fetch fails', async () => {
    fetchManagerStudyEnrollmentsMock.mockRejectedValue(new Error('list failed'))

    const { wrapper } = mountView()
    await flushPromises()

    expect(wrapper.vm.stats.studyPendingLearners).toBe(0)
    expect(wrapper.vm.error).toContain('Часть данных не удалось загрузить')
  })
})
