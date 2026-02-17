<template>
  <router-view/>
  <CartSticky />
</template>

<script>
import CartSticky from './components/elements/Shop/CartSticky.vue'

export default {
  components: { CartSticky }
}
</script>
