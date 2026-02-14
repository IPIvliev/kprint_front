import { api } from './http'

/**
 * @typedef {import('../types/openapi').paths['/api/shop/order/create']['post']['requestBody']['content']['application/json']} CreateOrderRequest
 */

/**
 * @param {CreateOrderRequest} payload
 * @param {string} idempotencyKey
 */
export function createOrder(payload, idempotencyKey) {
  return api.post('/api/shop/order/create', payload, {
    headers: {
      'Idempotency-Key': idempotencyKey,
    },
  })
}
