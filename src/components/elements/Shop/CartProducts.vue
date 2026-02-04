<template>
    <table class="table">
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
<style scoped>
.table {
    border-collapse: separate;
    border-spacing:0 20px;
}

.text_gray {
    color: var(--bs-gray);
}
table tr {
    /* line-height:100px */
}

table tr td:first-child {
    border-radius: 24px 0 0 24px;
}

table tr td:last-child {
    border-radius: 0 24px 24px 0;
}

.table tbody tr td {
     vertical-align: middle;
     
}

.table_img {
    border-radius: 16px;
    /* vertical-align: middle; */
    margin-left: 5px;
    float:left;
    margin-right:10px;
}

.product_name {
    display: inline;
    /* margin: 20px; */
}
.table_price {
    font-weight: 800;
}

.table_trash {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  /* padding: 10px var(--tokens-4xl) 10px var(--tokens-4xl); */
  position: relative;
  border-radius: var(--tokens-m);
  background-color: #fff;
  cursor: pointer;
}
</style>