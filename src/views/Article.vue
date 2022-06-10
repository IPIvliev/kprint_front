<template>
  <div class="page">
    <header-block />
    <ArticlePage />
    <router-view/>
    <footer-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import ArticlePage from '../components/ArticlePage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'Article',
  components: {
    ArticlePage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
