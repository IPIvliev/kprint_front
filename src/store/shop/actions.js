import axios from 'axios'

const API_BASE = process.env.VUE_APP_API_BASE
export default {
    // actions = methods
    AddProductToCart({ commit, state, getters, rootState, rootGetters }, product) {
        product = rootState.products.find(item => item.id === product.id)

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
    fetchDiscountAmount({ commit, state }, promocode) {
        console.log(promocode)
        axios
            .get(`${API_BASE}/api/shop/discounts`, {
                params: {
                    promocode: promocode
                }
            })
            .then(response => {
                commit("setDiscountAmount", response.data);
            })
            .catch(e => {
                console.log(e); 
            });
    },
    fetchCreateOrder({ commit, state }, order) {
        console.log(order)
        axios
            .post(`${API_BASE}/api/shop/order/create`, {
                params: {
                    total_price: order.total_price
                }
            })
            .then(response => {
                commit("setOrder", response.data);
            })
            .catch(e => {
                console.log(e); 
            });
    },
}