const { apiMock, publicApiMock, axiosGetMock } = vi.hoisted(() => ({
  apiMock: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn()
  },
  publicApiMock: {
    get: vi.fn(),
    post: vi.fn()
  },
  axiosGetMock: vi.fn()
}))

vi.mock('@/services/http', () => ({
  api: apiMock,
  publicApi: publicApiMock
}))

vi.mock('axios', () => ({
  default: {
    get: axiosGetMock
  }
}))

import { fetchShopCategories, fetchShopCategoryProducts, fetchShopProduct, fetchShopProducts } from '@/services/catalog.service'
import { fetchCompanyCategories, fetchCompanies } from '@/services/company.service'
import { fetchPochtaOffices, fetchPochtaPrice, fetchSdekOffices, fetchSdekPrice } from '@/services/delivery.service'
import { fetchPublicIp, fetchIp, fetchLocationByAbstract, fetchLocationByDadata } from '@/services/external.service'
import { fetchGalleryCategories } from '@/services/gallery.service'
import { fetchStudyCourse, fetchStudyCourses } from '@/services/study.service'

describe('public and delivery services', () => {
  beforeEach(() => {
    apiMock.get.mockReset()
    publicApiMock.get.mockReset()
    axiosGetMock.mockReset()
  })

  it('uses public endpoints for catalog and study', async () => {
    await fetchShopCategories()
    await fetchShopProducts()
    await fetchShopCategoryProducts('12')
    await fetchShopProduct('17')
    await fetchStudyCourses()
    await fetchStudyCourse('4')

    expect(publicApiMock.get).toHaveBeenCalledWith('/api/shop/categories')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/shop/products')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/shop/categories/12', { params: {} })
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/shop/products/17')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/study/courses')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/study/course/4')
  })

  it('passes query params for companies, gallery and delivery', async () => {
    await fetchCompanyCategories({ page: 2 })
    await fetchCompanies({ category: 9 })
    await fetchGalleryCategories({ page: 3 })
    await fetchPochtaOffices({ city: 'Москва' })
    await fetchSdekOffices({ city: 'Казань' })
    await fetchPochtaPrice({ weight: 2 })
    await fetchSdekPrice({ weight: 3 })

    expect(publicApiMock.get).toHaveBeenCalledWith('/api/company-categories/', { params: { page: 2 } })
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/companies/', { params: { category: 9 } })
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/gallery-categories/', { params: { page: 3 } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/pochta_rossii/offices', { params: { city: 'Москва' } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/sdek/offices', { params: { city: 'Казань' } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/pochta_rossii/price', { params: { weight: 2 } })
    expect(apiMock.get).toHaveBeenCalledWith('/api/shop/sdek/price', { params: { weight: 3 } })
  })

  it('fetches external IP and location', async () => {
    axiosGetMock.mockResolvedValueOnce({ data: { ip: '1.2.3.4' } })

    await fetchIp()
    await fetchLocationByAbstract({ source: 'abstract' })
    await fetchLocationByDadata({ source: 'dadata' })
    const ip = await fetchPublicIp()

    expect(publicApiMock.get).toHaveBeenCalledWith('/api/external/ip')
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/external/location', { params: { source: 'abstract' } })
    expect(publicApiMock.get).toHaveBeenCalledWith('/api/external/location', { params: { source: 'dadata' } })
    expect(axiosGetMock).toHaveBeenCalledWith('https://api.ipify.org', {
      params: { format: 'json' },
      timeout: 5000
    })
    expect(ip).toBe('1.2.3.4')
  })
})
