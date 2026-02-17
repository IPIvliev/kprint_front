<template>
  <div class="page">
    <header-block />
    <WhiteWelcome />
    <NewsPage/>

    <footer-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import WhiteWelcome from '../components/elements/WhiteWelcome.vue'
import NewsPage from '../components/NewsPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {

  name: 'NewsPageView',
  components: {
    NewsPage,
    FooterBlock,
    HeaderBlock,
    WhiteWelcome
  }
}
</script>
