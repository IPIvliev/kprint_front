<template>
  <router-view/>
  <CartSticky />
  <CallbackModal />
</template>

<script>
import CartSticky from './components/elements/Shop/CartSticky.vue'
import CallbackModal from './components/elements/CallbackModal.vue'

export default {
  components: { CartSticky, CallbackModal }
}
</script>
