import { publicApi } from './http'

/**
 * @typedef {import('../types/openapi').operations['api_shop_categories_list']['responses'][200]['content']['application/json']} ShopCategoriesResponse
 * @typedef {import('../types/openapi').operations['api_shop_products_list']['responses'][200]['content']['application/json']} ShopProductsResponse
 * @typedef {import('../types/openapi').operations['api_shop_categories_retrieve']['responses'][200]['content']['application/json']} ShopCategoryProductsResponse
 * @typedef {import('../types/openapi').operations['api_shop_products_retrieve']['responses'][200]['content']['application/json']} ShopProductResponse
 */

/** @returns {Promise<import('axios').AxiosResponse<ShopCategoriesResponse>>} */
export function fetchShopCategories () {
  return publicApi.get('/api/shop/categories')
}

/** @returns {Promise<import('axios').AxiosResponse<ShopProductsResponse>>} */
export function fetchShopProducts () {
  return publicApi.get('/api/shop/products')
}

/**
 * @param {number|string} categoryId
 * @returns {Promise<import('axios').AxiosResponse<ShopCategoryProductsResponse>>}
 */
export function fetchShopCategoryProducts (categoryId) {
  return publicApi.get(`/api/shop/categories/${Number(categoryId)}`)
}

/**
 * @param {number|string} productId
 * @returns {Promise<import('axios').AxiosResponse<ShopProductResponse>>}
 */
export function fetchShopProduct (productId) {
  return publicApi.get(`/api/shop/products/${Number(productId)}`)
}
