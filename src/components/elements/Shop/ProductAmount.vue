<template>
  <div class="qty qty_text cmp-components-elements-shop-productamount">
        <span class="minus bg-dark" @click="decrement">-</span>
        <input type="number" class="count gray_background" name="qty" :value="getCurrentCartProductQuantity(product)">
        <span class="plus bg-dark" @click="increment">+</span>
    </div>
</template>

<script>
import { promptAuthForCart } from '@/services/cart-auth.service'

export default {
  props: ['product'],
  computed: {
    getCurrentProduct () {
      return this.$store.getters['shop/getCurrentProduct']
    },
    getCurrentCartProductQuantity () {
      return this.$store.getters['shop/getCurrentCartProductQuantity']
    }
  },
  methods: {
    async increment () {
      const result = await this.$store.dispatch('shop/AddProductToCart', this.product)
      if (result?.requiresAuth) {
        promptAuthForCart({ router: this.$router, route: this.$route })
      }
    },
    async decrement () {
      await this.$store.dispatch('shop/DecrementProductFromCart', this.product)
    }
  }
}
</script>
