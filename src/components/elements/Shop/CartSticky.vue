<template>
    <div class="cart" v-if="this.$route.name != 'Cart'">
        <router-link to="/shop/cart">
            <img :src="'../../../images/icons/cart.svg'" width="50" height="50"/>
        </router-link>
    </div>
</template>

<style>
  .cart {
    position: fixed;
    bottom: 50%;
    right: 50px;
  }
</style>