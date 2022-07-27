<template>
  <div class="page">
    <header-block />
    <NewsPage />
    <footer-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import NewsPage from '../components/NewsPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    NewsPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
