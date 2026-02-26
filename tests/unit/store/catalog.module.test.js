const {
  fetchShopCategoriesMock,
  fetchShopProductsMock,
  fetchShopCategoryProductsMock,
  fetchShopProductMock
} = vi.hoisted(() => ({
  fetchShopCategoriesMock: vi.fn(),
  fetchShopProductsMock: vi.fn(),
  fetchShopCategoryProductsMock: vi.fn(),
  fetchShopProductMock: vi.fn()
}))

vi.mock('@/services/catalog.service', () => ({
  fetchShopCategories: fetchShopCategoriesMock,
  fetchShopProducts: fetchShopProductsMock,
  fetchShopCategoryProducts: fetchShopCategoryProductsMock,
  fetchShopProduct: fetchShopProductMock
}))

import { catalog } from '@/store/catalog.module'

describe('store/catalog.module', () => {
  beforeEach(() => {
    fetchShopCategoriesMock.mockReset()
    fetchShopProductsMock.mockReset()
    fetchShopCategoryProductsMock.mockReset()
    fetchShopProductMock.mockReset()
  })

  it('maps products in setProductsData mutation', () => {
    const state = { categories: [], products: [], product: [] }
    catalog.mutations.setProductsData(state, [
      {
        id: 1,
        category: 2,
        name: 'P1',
        description: 'D',
        price: 100,
        mass: 50,
        stock: 7,
        photo: '/img',
        product_attrs_values: [{ id: 3 }]
      }
    ])

    expect(state.products).toEqual([
      {
        id: 1,
        category: 2,
        name: 'P1',
        description: 'D',
        price: 100,
        mass: 50,
        stock: 7,
        photo: '/img',
        product_attrs_values: [{ id: 3 }]
      }
    ])
  })

  it('loads categories and commits data', async () => {
    fetchShopCategoriesMock.mockResolvedValueOnce({ data: [{ id: 1 }] })
    const commit = vi.fn()
    await catalog.actions.fetchCategories({ commit })
    expect(fetchShopCategoriesMock).toHaveBeenCalledTimes(1)
    expect(commit).toHaveBeenCalledWith('setCategoriesData', [{ id: 1 }])
  })

  it('loads product by id and commits data', async () => {
    fetchShopProductMock.mockResolvedValueOnce({ data: { id: 9, name: 'X' } })
    const commit = vi.fn()
    await catalog.actions.fetchProduct({ commit }, 9)
    expect(fetchShopProductMock).toHaveBeenCalledWith(9)
    expect(commit).toHaveBeenCalledWith('setProductData', { id: 9, name: 'X' })
  })

  it('loads category products and commits mapped products list', async () => {
    fetchShopCategoryProductsMock.mockResolvedValueOnce({ data: { products: [{ id: 1, name: 'P' }] } })
    const commit = vi.fn()
    await catalog.actions.fetchCategoryProducts({ commit }, 5)
    expect(fetchShopCategoryProductsMock).toHaveBeenCalledWith(5, {})
    expect(commit).toHaveBeenCalledWith('setProductsData', [{ id: 1, name: 'P' }])
  })
})
