<template>
  <table class="table cmp-components-elements-shop-cartproducts">
        <thead>
            <tr class="text-center text_gray">
                <th scope="col">Наименование товара</th>
                <th scope="col">Стоимость</th>
                <th scope="col" >Количество</th>
                <th scope="col">Итого</th>
                <th scope="col">Удалить</th>
            </tr>
        </thead>
        <tbody>
            <tr class="gray_background align-middle" v-for="cartProduct in getCartProducts">
                <td class="">
                    <router-link :to="{path: '/shop/categories/' + cartProduct.category + '/' + cartProduct.id }">
                        <img class="table_img" :src="cartProduct.photo" width="80" height="80">
                    </router-link>
                    <p class="product_name">
                        {{ cartProduct.title }}
                    </p>
                </td>
                <td><div class="table_price">{{ cartProduct.price }} ₽</div></td>
                <td>

                    <ProductAmount :product="cartProduct"/>
                    
                </td>
                <td><div class="table_price">{{ cartProductTotal(cartProduct) }} ₽</div></td>
                <td>
                    <div class="table_trash" @click="deleteItemFromCart(cartProduct)">
                        <img src="@/assets/img/trash.svg" />
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script>
import { mapGetters } from 'vuex'

import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'

export default {
    components: { ProductAmount },
	beforeCreate() {

		// this.$store.commit('shop/initialiseCart');
	},
    created() {
        
        // this.$store.dispatch("catalog/fetchProducts")
    },
    mounted() {
        this.$store.commit('shop/initialiseCart')
    },
    computed: {
        ...mapGetters ({
            getCartProducts: 'shop/cartProducts',
            cartProductTotal: 'shop/cartProductTotal'
        })
    },
    methods: {
        deleteItemFromCart(cartProduct) {
            this.$store.dispatch("shop/DeleteItemFromCart", cartProduct)
        }
    }
}
</script>
