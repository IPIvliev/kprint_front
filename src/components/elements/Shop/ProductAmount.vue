<template>
  <div class="qty qty_text cmp-components-elements-shop-productamount">
        <span class="minus bg-dark" @click="decrement">-</span>
        <input type="number" class="count gray_background" name="qty" :value="getCurrentCartProductQuantity(product)">
        <span class="plus bg-dark" @click="increment">+</span>
    </div>
</template>

<script>
    export default {
        props: ['product'],
        computed: {
            getCurrentProduct() {
                return this.$store.getters['shop/getCurrentProduct']
            },
            getCurrentCartProductQuantity() {
                return this.$store.getters['shop/getCurrentCartProductQuantity']
            }
        },
        methods: {
            increment() {
                this.$store.dispatch("shop/AddProductToCart", this.product)

            },
            decrement() {
                this.$store.dispatch("shop/DecrementProductFromCart", this.product)
            }
        }
    }
</script>
