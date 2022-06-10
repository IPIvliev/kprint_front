<template lang="pug">
.page
  header-block
  ContactPage
  footer-block
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import ContactPage from '../components/ContactPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'Contact',
  components: {
    ContactPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
