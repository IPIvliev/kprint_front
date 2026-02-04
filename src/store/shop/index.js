// import { forEach } from 'core-js/core/array'
import actions from './actions.js'

export const shop = {
    namespaced: true,
    state: {
        cart: [],
        course_cart: [],
        discount_amount: 0,
        new_order: '',
    },
    // computed
    getters: {
        cartProducts(state, getters, rootState, rootGetters) {
            return state.cart.map(cartItem => {
                const product = rootState.catalog.products.find(product => product.id === cartItem.id)
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
        cartCourseItems(state) {
            return state.course_cart
        },
        cartCoursesTotal(state) {
            let total = 0
            state.course_cart.forEach(course => {
                total += course.price * course.quantity
            })
            return total
        },
        getDeliveryPrice(state, getters, rootState, rootGetters) {
            if (state.cart.length === 0) {
                return 0
            }
            if (rootState.delivery.delivery_price['price']) {
                return (rootState.delivery.delivery_price['price'] + ' ???.')
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

            getters.cartCourseItems.forEach(course => {
                total += course.price * course.quantity
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

            getters.cartCourseItems.forEach(course => {
                total += course.price * course.quantity
            })

            if (state.discount_amount > 0) {
                total = total - (total / 100 * state.discount_amount)
            }

            if (state.cart.length > 0 && rootState.delivery.delivery_price['price']) {
                total += rootState.delivery.delivery_price['price']
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
                return rootState.catalog.products.find(item => item.id === product.id)
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
        cartHasProducts(state) {
            return state.cart.length > 0
        },
        cartHasCourses(state) {
            return state.course_cart.length > 0
        },
    },
    // methods
    actions,
    mutations: {

        initialiseCart(state) {

            if(localStorage.getItem('cart')) {
                state.cart = JSON.parse(localStorage.getItem('cart')) || []; 
            }
            if(localStorage.getItem('course_cart')) {
                state.course_cart = JSON.parse(localStorage.getItem('course_cart')) || [];
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
        pushCourseToCart(state, courseItem) {
            state.course_cart.push(courseItem)
            localStorage.setItem('course_cart', JSON.stringify(state.course_cart))
        },
        deleteCourseFromCart(state, courseItem) {
            const index = state.course_cart.indexOf(courseItem)
            state.course_cart.splice(index, 1)
            localStorage.setItem('course_cart', JSON.stringify(state.course_cart))
        },
        incrementCourseQuantity(state, courseItem) {
            courseItem.quantity++
            localStorage.setItem('course_cart', JSON.stringify(state.course_cart))
        },
        setDiscountAmount(state, discount_amount) {
            state.discount_amount = discount_amount
        },
        setNewOrder(state, new_order) {
            state.new_order = new_order
        },
    }
}
