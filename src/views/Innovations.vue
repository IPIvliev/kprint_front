<template lang="pug">
.page
  header-block
  InnovationsPage
  footer-block
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import InnovationsPage from '../components/InnovationsPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'Innovations',
  components: {
    InnovationsPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
