<template>
<div class="page">
  <header-block />
  <Page404 />
  <footer-block />
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import Page404 from '../components/Page404.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: 'NotFoundPageView',
  components: {
    Page404,
    FooterBlock,
    HeaderBlock
  }
}
</script>
