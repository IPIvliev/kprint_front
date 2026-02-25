<template>
  <router-view/>
  <CartSticky />
  <CallbackModal />
  <CookieConsentBanner />
</template>

<script>
import CartSticky from './components/elements/Shop/CartSticky.vue'
import CallbackModal from './components/elements/CallbackModal.vue'
import CookieConsentBanner from './components/elements/CookieConsentBanner.vue'

export default {
  components: { CartSticky, CallbackModal, CookieConsentBanner }
}
</script>
