<template lang="pug">
.page
  header-block
  login-page
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import LoginPage from '../components/LoginPage.vue'


export default {
  name: 'Login',
  components: {
    LoginPage,
    HeaderBlock
  }
}
</script>
