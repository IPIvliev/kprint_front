<template>
<div class="page">
  <header-block />
  <GalleryPage />
  <footer-block />
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import GalleryPage from '../components/GalleryPage.vue'
import FooterBlock from '../components/FooterBlock.vue'

export default {
  name: '404',
  components: {
    GalleryPage,
    FooterBlock,
    HeaderBlock
  }
}
</script>
