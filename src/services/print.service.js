import { publicApi } from './http'

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
