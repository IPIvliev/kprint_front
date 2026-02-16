import { api, publicApi } from './http'

/**
 * @typedef {{
 *   id: number
 *   name: string
 *   color: string
 *   price_per_mm3: string
 * }} PrintMaterial
 */

/**
 * @typedef {{
 *   id: number
 *   name: string
 *   materials: PrintMaterial[]
 * }} PrintMaterialCategory
 */

/** @returns {Promise<import('axios').AxiosResponse<PrintMaterialCategory[]>>} */
export function fetchPrintMaterialCategories() {
  return publicApi.get('/api/print-material-categories/')
}

export function fetchPrintOrders(params = {}) {
  return api.get('/api/printjobs/', { params })
}

export function fetchPrintOrder(orderId) {
  return api.get(`/api/printjobs/${orderId}/`)
}

export function createPrintOrder(payload) {
  return api.post('/api/printjobs/', payload)
}

export function requestPrintOrderPriceReview(orderId, payload = {}) {
  return api.post(`/api/printjobs/${orderId}/request_price_review/`, payload)
}

export function acceptPrintOrderPrice(orderId) {
  return api.post(`/api/printjobs/${orderId}/user_accept_price/`)
}

export function rejectPrintOrderPrice(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/user_reject_price/`, payload)
}

export function payPrintOrder(orderId) {
  return api.post(`/api/printjobs/${orderId}/user_mark_paid/`)
}

export function acceptPrintOrderResult(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/user_accept_result/`, payload)
}

export function requestPrintOrderRework(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/user_request_rework/`, payload)
}

export function repeatPrintOrder(orderId) {
  return api.post(`/api/printjobs/${orderId}/repeat_order/`)
}

export function managerSetPrintOrderPrice(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/manager_set_price/`, payload)
}

export function managerStartPrintOrder(orderId) {
  return api.post(`/api/printjobs/${orderId}/manager_start_printing/`)
}

export function managerSendPrintOrderForReview(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/manager_send_for_customer_review/`, payload)
}

export function managerStartPrintOrderDelivery(orderId, payload) {
  return api.post(`/api/printjobs/${orderId}/manager_start_delivery/`, payload)
}

export function managerMarkPrintOrderReceived(orderId) {
  return api.post(`/api/printjobs/${orderId}/manager_mark_received/`)
}
