import { api } from '@/services/http'

export const catalog = {
  namespaced: true,
  state: {
    categories: [],
    products: [],
    product: [],
  },
  mutations: {
    setCategoriesData(state, categoriesData) {
      state.categories = categoriesData
    },
    setProductsData(state, productsData) {
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
    setProductData(state, productData) {
      state.product = productData
    },
  },
  actions: {
    fetchCategories({ commit }) {
      return api
        .get('/api/shop/categories')
        .then(response => {
          commit('setCategoriesData', response.data)
        })
    },
    fetchProducts({ commit }) {
      return api
        .get('/api/shop/products')
        .then(response => {
          commit('setProductsData', response.data)
        })
    },
    fetchCategoryProducts({ commit }, id) {
      return api
        .get('/api/shop/categories/' + Number(id))
        .then(response => {
          commit('setProductsData', response.data.products)
        })
    },
    fetchProduct({ commit }, id) {
      return api
        .get('/api/shop/products/' + Number(id))
        .then(response => {
          commit('setProductData', response.data)
        })
    },
  },
}
