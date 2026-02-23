import { api } from './http'

/**
 * @typedef {import('../types/openapi').paths['/api/shop/order/create']['post']['requestBody']['content']['application/json']} CreateOrderRequest
 * @typedef {import('../types/openapi').operations['api_shop_discounts_retrieve']['parameters']['query']} DiscountQueryParams
 */

/**
 * @param {CreateOrderRequest} payload
 * @param {string} idempotencyKey
 */
export function createOrder (payload, idempotencyKey) {
  return api.post('/api/shop/order/create', payload, {
    headers: {
      'Idempotency-Key': idempotencyKey
    }
  })
}

export function syncUserCartOrder (payload) {
  return api.post('/api/shop/my/cart-order/sync', payload)
}

export function fetchUserCartOrder (orderId) {
  return api.get(`/api/shop/my/orders/${orderId}`)
}

export function createShopPayment (payload) {
  return api.post('/api/shop/create-payment-intent', payload)
}

export function syncShopPaymentStatus (payload) {
  return api.post('/api/shop/payments/sync', payload)
}

/**
 * @param {DiscountQueryParams} params
 */
export function fetchDiscountAmount (params) {
  return api.get('/api/shop/discounts', { params })
}
