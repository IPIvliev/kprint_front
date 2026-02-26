import {
  fetchShopCategories,
  fetchShopProducts,
  fetchShopCategoryProducts,
  fetchShopProduct
} from '@/services/catalog.service'

export const catalog = {
  namespaced: true,
  state: {
    categories: [],
    products: [],
    product: [],
    facets: null
  },
  mutations: {
    setCategoriesData (state, categoriesData) {
      state.categories = categoriesData
    },
    setProductsData (state, productsData) {
      state.products = productsData.map(product => {
        return {
          id: product.id,
          category: product.category,
          name: product.name,
          description: product.description,
          price: product.price,
          mass: product.mass,
          stock: product.stock,
          photo: product.photo,
          product_attrs_values: product.product_attrs_values
        }
      })
    },
    setFacetsData (state, facetsData) {
      state.facets = facetsData
    },
    setProductData (state, productData) {
      state.product = productData
    }
  },
  actions: {
    async fetchCategories ({ commit }) {
      const response = await fetchShopCategories()
      commit('setCategoriesData', response.data)
    },
    async fetchProducts ({ commit }) {
      const response = await fetchShopProducts()
      commit('setProductsData', response.data)
    },
    async fetchCategoryProducts ({ commit }, payload) {
      const categoryId = typeof payload === 'object' && payload !== null ? payload.id : payload
      const params = typeof payload === 'object' && payload !== null ? (payload.params || {}) : {}
      const response = await fetchShopCategoryProducts(categoryId, params)
      commit('setProductsData', response.data.products || [])
      commit('setFacetsData', response.data.facets || null)
    },
    async fetchProduct ({ commit }, id) {
      const response = await fetchShopProduct(id)
      commit('setProductData', response.data)
    }
  }
}
