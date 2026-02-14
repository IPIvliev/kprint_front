import { createOrder, fetchDiscountAmount as fetchDiscountAmountRequest } from '@/services/shop.service'

function buildIdempotencyKey() {
    if (typeof globalThis !== 'undefined' && globalThis.crypto && typeof globalThis.crypto.randomUUID === 'function') {
        return globalThis.crypto.randomUUID()
    }
    return `order-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export default {
    // actions = methods
    AddProductToCart({ commit, state, getters, rootState, rootGetters }, product) {
        product = rootState.catalog.products.find(item => item.id === product.id)

        if (product.stock > 0) {
            const cartItem = state.cart.find(item => item.id === product.id)

            if (!cartItem) {
                commit('pushProductToCart', product.id)
            } else {
                commit('incrementItemQuantity', cartItem)
            }
            
            // decrementItemStock
        } else {
            // show out of stock message
        }
    },
    DecrementProductFromCart({ commit, state}, product) {
        const cartItem = state.cart.find(item => item.id === product.id)
        if (cartItem.quantity > 1) {
            commit('decrementItemQuantity', cartItem)
        } else {
            commit('deleteItemFromCart', cartItem)
        }
    },
    DeleteItemFromCart({ commit, state}, product) {
        const cartItem = state.cart.find(item => item.id === product.id)
        commit('deleteItemFromCart', cartItem)
    },
    AddCourseToCart({ commit, state }, courseItem) {
        const existing = state.course_cart.find(item => item.course_id === courseItem.course_id && item.price_id === courseItem.price_id)
        if (!existing) {
            commit('pushCourseToCart', courseItem)
        }
    },
    DeleteCourseFromCart({ commit, state }, courseItem) {
        const existing = state.course_cart.find(item => item.course_id === courseItem.course_id && item.price_id === courseItem.price_id)
        if (existing) {
            commit('deleteCourseFromCart', existing)
        }
    },
    fetchDiscountAmount({ commit }, promocode) {
        return fetchDiscountAmountRequest({ promocode: promocode })
            .then(response => {
                commit("setDiscountAmount", response.data);
            })
            .catch(e => {
                commit("setDiscountAmount", 0)
                throw e
            });
    },
    fetchCreateOrder({ commit, getters, rootState }, order = {}) {
        const orderItems = getters.cartProducts.map((item) => ({
            product: item.id,
            quantity: item.quantity,
            price: Number(item.price || 0),
        }))
        const productsPrice = orderItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        const rawDeliveryPrice = rootState.delivery?.delivery_price?.price
        const deliveryPrice = Number(rawDeliveryPrice || 0)
        const totalPrice = Number(order.total_price || (productsPrice + deliveryPrice))
        const payload = {
            total_price: totalPrice,
            products_price: productsPrice,
            order_items: orderItems.map(({ product, quantity }) => ({ product, quantity })),
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

        const idempotencyKey = String(order.idempotency_key || buildIdempotencyKey())

        return createOrder(payload, idempotencyKey)
            .then(response => {
                commit("setNewOrder", response.data);
                return response.data
            })
            .catch(e => {
                throw e
            });
    },
}
