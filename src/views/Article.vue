<template>
  <div class="page">
    <header-block />
    <ArticlePage />
    <WhiteWelcome/>
    <footer-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'

import WhiteWelcome from '../components/elements/WhiteWelcome.vue'

import ArticlePage from '../components/ArticlePage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'ArticlePageView',
  components: {
    ArticlePage,
    FooterBlock,
    HeaderBlock,
    WhiteWelcome
  }
}
</script>
