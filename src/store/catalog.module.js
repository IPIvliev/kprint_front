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
    product: []
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
    async fetchCategoryProducts ({ commit }, id) {
      const response = await fetchShopCategoryProducts(id)
      commit('setProductsData', response.data.products)
    },
    async fetchProduct ({ commit }, id) {
      const response = await fetchShopProduct(id)
      commit('setProductData', response.data)
    }
  }
}
