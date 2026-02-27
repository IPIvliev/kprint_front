const { apiMock, publicApiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  },
  publicApiMock: {
    get: vi.fn(),
    post: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  api: apiMock,
  publicApi: publicApiMock
}))

import {
  createCallbackRequest,
  createPanelArticle,
  createStudyManagerLesson,
  fetchCallbackCaptcha,
  fetchPanelArticles,
  generatePanelAiArticle,
  fetchShopOrders,
  fetchShopPublicProduct,
  fetchStudyManagerLessons,
  fetchStudyManagerTeachers,
  reorderStudyManagerLessons,
  updatePanelArticle,
  updateStudyManagerLesson
} from '@/services/panel.service'

describe('panel service', () => {
  beforeEach(() => {
    apiMock.get.mockReset()
    apiMock.post.mockReset()
    apiMock.patch.mockReset()
    apiMock.delete.mockReset()
    publicApiMock.get.mockReset()
    publicApiMock.post.mockReset()
  })

  it('works with articles management endpoints', async () => {
    await fetchPanelArticles()
    await createPanelArticle({ title: 'A' })
    await updatePanelArticle(10, { title: 'B' })

    expect(apiMock.get).toHaveBeenCalledWith('/api/articles/')
    expect(apiMock.post).toHaveBeenCalledWith('/api/articles/', { title: 'A' })
    expect(apiMock.patch).toHaveBeenCalledWith('/api/articles/10/', { title: 'B' })
  })

  it('passes upload progress callbacks for AI article generation', async () => {
    const payload = { append: vi.fn() }
    const onUploadProgress = vi.fn()
    await generatePanelAiArticle(payload, { onUploadProgress })

    expect(apiMock.post).toHaveBeenCalledWith('/api/articles/generate-ai/', payload, { onUploadProgress })
  })

  it('works with study manager lessons endpoints', async () => {
    await fetchStudyManagerLessons({ course: 2 })
    await createStudyManagerLesson({ title: 'Урок 1' })
    await updateStudyManagerLesson(5, { title: 'Урок 1.1' })
    await reorderStudyManagerLessons({ course: 2, ordered_ids: [1, 2, 3] })
    await fetchStudyManagerTeachers({ course: 2 })

    expect(apiMock.get).toHaveBeenCalledWith('/api/study/manager/lessons', { params: { course: 2 } })
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/lessons', { title: 'Урок 1' })
    expect(apiMock.patch).toHaveBeenCalledWith('/api/study/manager/lessons/5', { title: 'Урок 1.1' })
    expect(apiMock.post).toHaveBeenCalledWith('/api/study/manager/lessons/reorder', { course: 2, ordered_ids: [1, 2, 3] })
    expect(apiMock.get).toHaveBeenCalledWith('/api/study/manager/teachers', { params: { course: 2 } })
  })

  it('works with callback and shop endpoints', async () => {
    await fetchShopOrders()
    await fetchShopPublicProduct(12)
    await fetchCallbackCaptcha()
    await createCallbackRequest({ phone: '+70000000000' })

    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/orders')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/shop/products/12')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/callback/captcha')
    expect(publicApiMock.post).toHaveBeenCalledWith('/api/callback/requests', { phone: '+70000000000' })
  })
})
