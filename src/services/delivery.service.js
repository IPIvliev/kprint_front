import { api } from './http'

/**
 * @typedef {import('../types/openapi').operations['api_shop_pochta_rossii_offices_retrieve']['parameters']['query']} PochtaOfficesQuery
 * @typedef {import('../types/openapi').operations['api_shop_sdek_offices_retrieve']['parameters']['query']} SdekOfficesQuery
 * @typedef {import('../types/openapi').operations['api_shop_pochta_rossii_price_retrieve']['parameters']['query']} PochtaPriceQuery
 * @typedef {import('../types/openapi').operations['api_shop_sdek_price_retrieve']['parameters']['query']} SdekPriceQuery
 */

/**
 * @param {PochtaOfficesQuery} params
 */
export function fetchPochtaOffices(params) {
  return api.get('/api/shop/pochta_rossii/offices', { params })
}

/**
 * @param {SdekOfficesQuery} params
 */
export function fetchSdekOffices(params) {
  return api.get('/api/shop/sdek/offices', { params })
}

/**
 * @param {PochtaPriceQuery} params
 */
export function fetchPochtaPrice(params) {
  return api.get('/api/shop/pochta_rossii/price', { params })
}

/**
 * @param {SdekPriceQuery} params
 */
export function fetchSdekPrice(params) {
  return api.get('/api/shop/sdek/price', { params })
}
