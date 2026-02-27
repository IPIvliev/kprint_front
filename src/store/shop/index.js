// import { forEach } from 'core-js/core/array'
import actions from './actions.js'

export const shop = {
  namespaced: true,
  state: {
    cart: [],
    discount_amount: 0,
    new_order: '',
    active_order_id: null
  },
  // computed
  getters: {
    cartProducts (state, getters, rootState, rootGetters) {
      const catalogProducts = Array.isArray(rootState?.catalog?.products)
        ? rootState.catalog.products
        : []

      return state.cart.reduce((items, cartItem) => {
        const product = catalogProducts.find(product => product.id === cartItem.id)
        if (!product) {
          return items
        }
        items.push({
          id: product.id,
          slug: product.slug,
          category: product.category,
          category_slug: product.category_slug,
          title: product.name,
          price: product.price,
          photo: product.photo,
          mass: product.mass,
          quantity: cartItem.quantity
        })
        return items
      }, [])
    },
    getDeliveryPrice (state, getters, rootState, rootGetters) {
      if (state.cart.length === 0) {
        return 0
      }
      if (rootState.delivery.delivery_price.price) {
        return (rootState.delivery.delivery_price.price + ' ???.')
      } else {
        return 0
      }
    },
    getDiscountAmount (state, getters) {
      return state.discount_amount
    },
    cartProductTotal (state, getters) {
      return (thisproduct) => {
        const cartProduct = getters.cartProducts.find(product => product.id === thisproduct.id)
        if (!cartProduct) {
          return 0
        }
        return cartProduct.price * cartProduct.quantity
      }
    },
    cartTotal (state, getters) {
      let total = 0

      getters.cartProducts.forEach(product => {
        total += product.price * product.quantity
      })

      return total
    },
    cartTotalWeight (state, getters) {
      let total = 0

      getters.cartProducts.forEach(product => {
        total += product.mass * product.quantity
      })

      return total / 1000
    },
    cartTotalWithDelivery (state, getters, rootState, rootGetters) {
      let total = 0

      getters.cartProducts.forEach(product => {
        total += product.price * product.quantity
      })

      if (state.discount_amount > 0) {
        total = total - (total / 100 * state.discount_amount)
      }

      if (state.cart.length > 0 && rootState.delivery.delivery_price.price) {
        total += rootState.delivery.delivery_price.price
      }

      return total
    },
    productIsInStock () {
      return (product) => {
        return product.stock > 0
      }
    },
    getCurrentProduct (state, getters, rootState, rootGetters) {
      return (product) => {
        return rootState.catalog.products.find(item => item.id === product.id)
      }
    },
    getCurrentCartProductQuantity (state, getters, rootState, rootGetters) {
      return (product) => {
        const cartProduct = state.cart.find(item => item.id === product.id)
        if (cartProduct) {
          return state.cart.find(item => item.id === product.id).quantity
        } else {
          return 0
        }
      }
    },
    cartHasProducts (state) {
      return state.cart.length > 0
    }
  },
  // methods
  actions,
  mutations: {

    initialiseCart (state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart')) || []
      }
      localStorage.removeItem('course_cart')
      const rawOrderId = localStorage.getItem('shop_active_order_id')
      const parsedOrderId = Number(rawOrderId)
      state.active_order_id = Number.isFinite(parsedOrderId) && parsedOrderId > 0 ? parsedOrderId : null
    },
    pushProductToCart (state, productId) {
      // const item = {
      //     'id': productId,
      //     'quantity': 1
      // }

      state.cart.push({
        id: productId,
        quantity: 1
      })

      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    incrementItemQuantity (state, cartItem) {
      cartItem.quantity++
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    decrementItemQuantity (state, cartItem) {
      cartItem.quantity--
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    deleteItemFromCart (state, cartItem) {
      console.log('deleteItemFromCart')
      // cartItem.quantity--
      const index = state.cart.indexOf(cartItem)
      state.cart.splice(index, 1)
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    setDiscountAmount (state, discountAmount) {
      state.discount_amount = discountAmount
    },
    setNewOrder (state, newOrder) {
      state.new_order = newOrder
    },
    setActiveOrderId (state, orderId) {
      const parsed = Number(orderId)
      const normalized = Number.isFinite(parsed) && parsed > 0 ? parsed : null
      state.active_order_id = normalized
      if (normalized) {
        localStorage.setItem('shop_active_order_id', String(normalized))
      } else {
        localStorage.removeItem('shop_active_order_id')
      }
    },
    clearCartState (state) {
      state.cart = []
      state.discount_amount = 0
      state.new_order = ''
      state.active_order_id = null
      localStorage.removeItem('cart')
      localStorage.removeItem('course_cart')
      localStorage.removeItem('shop_active_order_id')
    }
  }
}
