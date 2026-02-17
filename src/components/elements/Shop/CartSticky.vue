<template>
  <div class="cart cmp-components-elements-shop-cartsticky" v-show="showCartSticky">
        <router-link to="/shop/cart">
            <img src="/images/icons/cart.svg" width="50" height="50" alt=""/>
        </router-link>
    </div>
</template>

<script>
export default {
  computed: {
    showCartSticky () {
      const hiddenRoutes = ['Cart', 'ShopOrder']
      return !hiddenRoutes.includes(this.$route?.name)
    }
  }
}
</script>
