<template lang="pug">
.page
  header-block
  forgot-password-page
</template>

<script>
import HeaderBlock from '../components/HeaderBlock.vue'
import ForgotPasswordPage from '../components/ForgotPasswordPage.vue'

export default {
  name: 'ForgotPassword',
  components: {
    HeaderBlock,
    ForgotPasswordPage
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
