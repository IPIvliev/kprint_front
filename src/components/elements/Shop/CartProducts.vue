<template>
  <div class="cmp-components-elements-shop-cartproducts">
    <div class="cartproducts__table-wrap" v-if="getCartProducts.length > 0">
      <table class="table">
        <thead>
          <tr class="text-center text_gray">
            <th scope="col">Наименование</th>
            <th scope="col">Цена 1 ед.</th>
            <th scope="col">Количество</th>
            <th scope="col">Стоимость</th>
            <th scope="col">...</th>
          </tr>
        </thead>
        <tbody>
          <tr class="gray_background align-middle" v-for="cartProduct in getCartProducts" :key="cartProduct.id">
            <td class="cartproducts__product-cell" data-label="Наименование">
              <router-link :to="{ path: cartProductPath(cartProduct) }">
                <img class="table_img" :src="cartProduct.photo" width="80" height="80" />
              </router-link>
              <p class="product_name">{{ cartProduct.title }}</p>
            </td>
            <td data-label="Цена 1 ед."><div class="table_price">{{ cartProduct.price }} руб.</div></td>
            <td data-label="Количество">
              <ProductAmount :product="cartProduct" />
            </td>
            <td data-label="Стоимость"><div class="table_price">{{ cartProductTotal(cartProduct) }} руб.</div></td>
            <td data-label="Удалить">
              <div class="table_trash" @click="deleteItemFromCart(cartProduct)">
                <img src="@/assets/img/trash.svg" />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'
import { buildPublicSlug } from '@/utils/slug'

export default {
  components: { ProductAmount },
  beforeCreate () {

    // this.$store.commit('shop/initialiseCart');
  },
  created () {

    // this.$store.dispatch("catalog/fetchProducts")
  },
  mounted () {
    this.$store.commit('shop/initialiseCart')
  },
  computed: {
    ...mapGetters({
      getCartProducts: 'shop/cartProducts',
      cartProductTotal: 'shop/cartProductTotal'
    })
  },
  methods: {
    cartProductPath (cartProduct) {
      const categorySlug = cartProduct?.category_slug || cartProduct?.category
      const productSlug = cartProduct?.slug || buildPublicSlug(cartProduct?.title, cartProduct?.id, 'product')
      return `/shop/categories/${categorySlug}/${productSlug}`
    },
    deleteItemFromCart (cartProduct) {
      this.$store.dispatch('shop/DeleteItemFromCart', cartProduct)
    }
  }
}
</script>
