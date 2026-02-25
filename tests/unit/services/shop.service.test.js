const { apiMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn()
  }
}))

vi.mock('@/services/http', () => ({
  api: apiMock
}))

import {
  createOrder,
  createShopPayment,
  fetchDiscountAmount,
  fetchUserCartOrder,
  syncShopPaymentStatus,
  syncUserCartOrder
} from '@/services/shop.service'

describe('shop service', () => {
  beforeEach(() => {
    apiMock.get.mockReset()
    apiMock.post.mockReset()
  })

  it('creates order with idempotency key', async () => {
    const payload = { items: [{ id: 1, quantity: 2 }] }
    await createOrder(payload, 'idem-1')
    expect(apiMock.post).toHaveBeenCalledWith('/api/shop/order/create', payload, {
      headers: { 'Idempotency-Key': 'idem-1' }
    })
  })

  it('works with cart and payment endpoints', async () => {
    await syncUserCartOrder({ items: [] })
    await fetchUserCartOrder(10)
    await createShopPayment({ order: 10 })
    await syncShopPaymentStatus({ payment_id: 77 })
    await fetchDiscountAmount({ code: 'NEW10' })

    expect(apiMock.post).toHaveBeenCalledWith('/api/shop/my/cart-order/sync', { items: [] })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/my/orders/10')
    expect(apiMock.post).toHaveBeenCalledWith('/api/shop/create-payment-intent', { order: 10 })
    expect(apiMock.post).toHaveBeenCalledWith('/api/shop/payments/sync', { payment_id: 77 })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/discounts', { params: { code: 'NEW10' } })
  })
})
