<template lang="pug">
.page
  header-block
  reset-password-page
</template>

<script>
import HeaderBlock from '../components/HeaderBlock.vue'
import ResetPasswordPage from '../components/ResetPasswordPage.vue'

export default {
  name: 'ResetPassword',
  components: {
    HeaderBlock,
    ResetPasswordPage
  }
}
</script>

<style scoped>
.page {
  min-height: 100vh;
}
</style>
