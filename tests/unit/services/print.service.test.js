const { apiMock, publicApiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    delete: vi.fn()
  },
  publicApiMock: {
    get: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  api: apiMock,
  publicApi: publicApiMock
}))

import {
  acceptPrintOrderPrice,
  createPrintOrder,
  deletePrintOrder,
  fetchPrintMaterialCategories,
  fetchPrintOrderModelFile,
  fetchPrintOrders,
  managerSetPrintOrderPrice,
  payPrintOrder,
  requestPrintOrderPriceReview
} from '@/services/print.service'

describe('print service', () => {
  beforeEach(() => {
    apiMock.get.mockReset()
    apiMock.post.mockReset()
    apiMock.delete.mockReset()
    publicApiMock.get.mockReset()
  })

  it('loads categories from public API', async () => {
    await fetchPrintMaterialCategories()
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/print-material-categories/')
  })

  it('uses print orders endpoints', async () => {
    await fetchPrintOrders({ status: 'new' })
    await fetchPrintOrderModelFile(15)
    await createPrintOrder({ quantity: 2 })
    await requestPrintOrderPriceReview(15, { note: 'check' })
    await acceptPrintOrderPrice(15)
    await managerSetPrintOrderPrice(15, { price: '1000.00' })
    await payPrintOrder(15)
    await deletePrintOrder(15)

    expect(apiMock.get).toHaveBeenCalledWith('/api/printjobs/', { params: { status: 'new' } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/printjobs/15/model_file/', { responseType: 'blob' })
    expect(apiMock.post).toHaveBeenCalledWith('/api/printjobs/', { quantity: 2 })
    expect(apiMock.post).toHaveBeenCalledWith('/api/printjobs/15/request_price_review/', { note: 'check' })
    expect(apiMock.post).toHaveBeenCalledWith('/api/printjobs/15/user_accept_price/')
    expect(apiMock.post).toHaveBeenCalledWith('/api/printjobs/15/manager_set_price/', { price: '1000.00' })
    expect(apiMock.post).toHaveBeenCalledWith('/api/printjobs/15/user_mark_paid/')
    expect(apiMock.delete).toHaveBeenCalledWith('/api/printjobs/15/')
  })
})
