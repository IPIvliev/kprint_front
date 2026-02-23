import {
  fetchDiscountAmount as fetchDiscountAmountRequest,
  fetchUserCartOrder,
  syncUserCartOrder
} from '@/services/shop.service'

function isLoggedIn (rootState) {
  return rootState?.auth?.status?.loggedIn === true
}

function hasCartData (state) {
  return state.cart.length > 0
}

function buildOrderPayload (getters, rootState, order = {}) {
  const orderItems = getters.cartProducts.map((item) => ({
    product: item.id,
    quantity: item.quantity,
    price: Number(item.price || 0)
  }))
  const productsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const rawDeliveryPrice = rootState.delivery?.delivery_price?.price
  const deliveryPrice = Number(rawDeliveryPrice || 0)
  const totalPrice = Number(order.total_price || (productsPrice + deliveryPrice))
  const payload = {
    total_price: totalPrice,
    products_price: productsPrice,
    order_items: orderItems.map(({ product, quantity }) => ({ product, quantity }))
  }
  if (order.status) {
    payload.status = order.status
  }
  if (order.fio) {
    payload.fio = order.fio
  }
  if (order.phone) {
    payload.phone = order.phone
  }
  if (order.email) {
    payload.email = order.email
  }
  if (order.delivery_company) {
    payload.delivery_company = order.delivery_company
  }
  if (order.delivery_destination) {
    payload.delivery_destination = order.delivery_destination
  }
  if (order.delivery_time) {
    payload.delivery_time = String(order.delivery_time)
  }
  if (rawDeliveryPrice !== undefined && rawDeliveryPrice !== null) {
    payload.delivery_price = deliveryPrice
  }
  return payload
}

export default {
  // actions = methods
  async AddProductToCart ({ commit, state, getters, rootState, dispatch }, product) {
    commit('initialiseCart')
    if (isLoggedIn(rootState)) {
      await dispatch('refreshActiveOrderState')
    }
    product = rootState.catalog.products.find(item => item.id === product.id)
    if (!product || product.stock <= 0) {
      return { added: false, requiresAuth: false }
    }

    const cartItem = state.cart.find(item => item.id === product.id)
    if (!cartItem) {
      commit('pushProductToCart', product.id)
    } else {
      commit('incrementItemQuantity', cartItem)
    }

    if (isLoggedIn(rootState)) {
      await dispatch('syncCartOrder')
      return { added: true, requiresAuth: false }
    }
    return { added: true, requiresAuth: true }
  },
  async DecrementProductFromCart ({ commit, state, rootState, dispatch }, product) {
    commit('initialiseCart')
    if (isLoggedIn(rootState)) {
      await dispatch('refreshActiveOrderState')
    }
    const cartItem = state.cart.find(item => item.id === product.id)
    if (!cartItem) {
      return
    }
    if (cartItem.quantity > 1) {
      commit('decrementItemQuantity', cartItem)
    } else {
      commit('deleteItemFromCart', cartItem)
    }
    if (isLoggedIn(rootState)) {
      if (hasCartData(state)) {
        await dispatch('syncCartOrder')
      } else {
        commit('setActiveOrderId', null)
        commit('setNewOrder', '')
      }
    }
  },
  async DeleteItemFromCart ({ commit, state, rootState, dispatch }, product) {
    commit('initialiseCart')
    if (isLoggedIn(rootState)) {
      await dispatch('refreshActiveOrderState')
    }
    const cartItem = state.cart.find(item => item.id === product.id)
    if (!cartItem) {
      return
    }
    commit('deleteItemFromCart', cartItem)
    if (isLoggedIn(rootState)) {
      if (hasCartData(state)) {
        await dispatch('syncCartOrder')
      } else {
        commit('setActiveOrderId', null)
        commit('setNewOrder', '')
      }
    }
  },
  async AddCourseToCart ({ rootState }) {
    return { added: false, requiresAuth: !isLoggedIn(rootState) }
  },
  async DeleteCourseFromCart () {
    return null
  },
  async refreshActiveOrderState ({ state, rootState, commit }) {
    if (!isLoggedIn(rootState)) {
      return null
    }
    const activeOrderId = Number(state.active_order_id || 0)
    if (!activeOrderId) {
      return null
    }
    try {
      const response = await fetchUserCartOrder(activeOrderId)
      const activeOrder = response?.data || null
      if (!activeOrder) {
        commit('setActiveOrderId', null)
        commit('setNewOrder', '')
        return null
      }
      if (activeOrder.is_paid) {
        commit('clearCartState')
        return { is_paid: true, id: activeOrder.id }
      }
      commit('setNewOrder', activeOrder)
      return activeOrder
    } catch (error) {
      if (error?.response?.status === 404) {
        commit('setActiveOrderId', null)
        commit('setNewOrder', '')
        return null
      }
      throw error
    }
  },
  async syncCartOrder ({ commit, getters, rootState, state }, order = {}) {
    if (!isLoggedIn(rootState)) {
      throw new Error('Требуется авторизация')
    }
    if (!hasCartData(state)) {
      commit('setActiveOrderId', null)
      commit('setNewOrder', '')
      return null
    }
    const payload = buildOrderPayload(getters, rootState, order)
    const response = await syncUserCartOrder(payload)
    const syncedOrder = response?.data || null
    commit('setNewOrder', syncedOrder || '')
    commit('setActiveOrderId', syncedOrder?.id || null)
    if (syncedOrder?.is_paid) {
      commit('clearCartState')
    }
    return syncedOrder
  },
  async syncCartOrderAfterLogin ({ state, rootState, dispatch, commit }) {
    if (!isLoggedIn(rootState)) {
      return null
    }
    await dispatch('refreshActiveOrderState')
    if (!hasCartData(state)) {
      commit('setActiveOrderId', null)
      commit('setNewOrder', '')
      return null
    }
    return dispatch('syncCartOrder')
  },
  fetchDiscountAmount ({ commit }, promocode) {
    return fetchDiscountAmountRequest({ promocode })
      .then(response => {
        commit('setDiscountAmount', response.data)
      })
      .catch(e => {
        commit('setDiscountAmount', 0)
        throw e
      })
  },
  async fetchCreateOrder ({ dispatch, rootState }, order = {}) {
    if (!isLoggedIn(rootState)) {
      throw new Error('Для оформления заказа войдите в аккаунт.')
    }
    return dispatch('syncCartOrder', order)
  }
}
