// import { forEach } from 'core-js/core/array'
import actions from './actions.js'

export const shop = {
    namespaced: true,
    state: {
        cart: [],
        discount_amount: 0,
        new_order: '',
    },
    // computed
    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.cart.map(cartItem => {
                const product = rootState.products.find(product => product.id === cartItem.id)
                return {
                    id: product.id,
                    category: product.category,
                    title: product.name,
                    price: product.price,
                    photo: product.photo,
                    mass: product.mass,
                    quantity: cartItem.quantity
                }
            })
        },
        getDeliveryPrice(state, getters, rootState, rootGetters) {
            if (rootState.delivery_price['price']) {
                return (rootState.delivery_price['price'] + ' руб.')
            } else {
                return 0
            }
        },
        getDiscountAmount(state, getters) {
            return state.discount_amount
        },
        cartProductTotal(state, getters) {
            return(thisproduct) => {
                const cartProduct = getters.cartProducts.find(product => product.id === thisproduct.id)
                return cartProduct.price * cartProduct.quantity
            }
        },
        cartTotal(state, getters) {
            let total = 0

            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })

            return total
        },
        cartTotalWeight(state, getters) {
            let total = 0

            getters.cartProducts.forEach(product => {
                total += product.mass * product.quantity
            })

            return total/1000
        },
        cartTotalWithDelivery(state, getters, rootState, rootGetters) {
            let total = 0

            getters.cartProducts.forEach(product => {
                total += product.price * product.quantity
            })

            if (state.discount_amount > 0) {
                total = total - (total / 100 * state.discount_amount)
            }

            if (rootState.delivery_price['price']) {
                total += rootState.delivery_price['price']
            }



            return total
        },
        productIsInStock() {
            return(product) => {
                return product.stock > 0
            }
        },
        getCurrentProduct(state, getters, rootState, rootGetters) {
            return(product) => {
                return rootState.products.find(item => item.id === product.id)
            }
        },
        getCurrentCartProductQuantity(state, getters, rootState, rootGetters) {
            return(product) => {
                const cartProduct = state.cart.find(item => item.id === product.id)
                if (cartProduct) {
                    return state.cart.find(item => item.id === product.id).quantity
                } else {
                    return 0
                }
                
            }
        },
        
    },
    // methods
    actions,
    mutations: {

        initialiseCart(state) {

            if(localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart')) || []; 
            }

		},
        pushProductToCart(state, productId) {
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
        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        decrementItemQuantity(state, cartItem) {
            cartItem.quantity--
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        deleteItemFromCart(state, cartItem) {
            console.log('deleteItemFromCart')
            // cartItem.quantity--
            const index = state.cart.indexOf(cartItem)
            state.cart.splice(index, 1)
            localStorage.setItem('cart', JSON.stringify(state.cart))
        },
        setDiscountAmount(state, discount_amount) {
            state.discount_amount = discount_amount
        },
        setNewOrder(state, new_order) {
            state.new_order = new_order
        },
    }
}

