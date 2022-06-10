<template lang="pug">
.page
  header-block
  MainPage
  footer-block
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import MainPage from '../components/MainPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'Home',
  components: {
    MainPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
