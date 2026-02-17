<template>
  <div class="cmp-components-elements-shop-cartproducts">
    <table class="table" v-if="getCartProducts.length > 0">
      <thead>
        <tr class="text-center text_gray">
          <th scope="col">???????????? ??????</th>
          <th scope="col">?????????</th>
          <th scope="col">??????????</th>
          <th scope="col">?????</th>
          <th scope="col">???????</th>
        </tr>
      </thead>
      <tbody>
        <tr class="gray_background align-middle" v-for="cartProduct in getCartProducts" :key="cartProduct.id">
          <td class="">
            <router-link :to="{path: '/shop/categories/' + cartProduct.category + '/' + cartProduct.id }">
              <img class="table_img" :src="cartProduct.photo" width="80" height="80" />
            </router-link>
            <p class="product_name">{{ cartProduct.title }}</p>
          </td>
          <td><div class="table_price">{{ cartProduct.price }} ???.</div></td>
          <td>
            <ProductAmount :product="cartProduct" />
          </td>
          <td><div class="table_price">{{ cartProductTotal(cartProduct) }} ???.</div></td>
          <td>
            <div class="table_trash" @click="deleteItemFromCart(cartProduct)">
              <img src="@/assets/img/trash.svg" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <table class="table mt-2" v-if="getCartCourses.length > 0">
      <thead>
        <tr class="text-center text_gray">
          <th scope="col">????</th>
          <th scope="col">?????</th>
          <th scope="col">???????</th>
        </tr>
      </thead>
      <tbody>
        <tr class="gray_background align-middle" v-for="courseItem in getCartCourses" :key="courseItem.course_id + '-' + courseItem.price_id">
          <td class="">
            <p class="product_name">{{ courseItem.course_name }} - {{ courseItem.price_name }}</p>
          </td>
          <td><div class="table_price">{{ courseItem.price * courseItem.quantity }} ???.</div></td>
          <td>
            <div class="table_trash" @click="deleteCourseFromCart(courseItem)">
              <img src="@/assets/img/trash.svg" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import ProductAmount from '@/components/elements/Shop/ProductAmount.vue'

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
      cartProductTotal: 'shop/cartProductTotal',
      getCartCourses: 'shop/cartCourseItems'
    })
  },
  methods: {
    deleteItemFromCart (cartProduct) {
      this.$store.dispatch('shop/DeleteItemFromCart', cartProduct)
    },
    deleteCourseFromCart (courseItem) {
      this.$store.dispatch('shop/DeleteCourseFromCart', courseItem)
    }
  }
}
</script>
