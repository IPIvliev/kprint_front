import { publicApi } from './http'

export function fetchGalleryCategories (params = {}) {
  return publicApi.get('/api/gallery-categories/', { params })
}
