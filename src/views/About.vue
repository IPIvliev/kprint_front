<template>
<div class="page">
  <header-block />
  <AboutPage />
  <footer-block />
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import AboutPage from '../components/AboutPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'About',
  components: {
    AboutPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
