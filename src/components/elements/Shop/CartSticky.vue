<template>
  <div class="cart cmp-components-elements-shop-cartsticky" v-show="this.$route.name != ('Cart' || 'ShopOrder')">
        <router-link to="/shop/cart">
            <img :src="'../../../images/icons/cart.svg'" width="50" height="50"/>
        </router-link>
    </div>
</template>

