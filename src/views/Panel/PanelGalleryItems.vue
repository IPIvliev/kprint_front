<template>
  <header-panel-block />
  <gallery-items-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import GalleryItemsPanelPage from '../../components/Panel/PanelGalleryItems.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    GalleryItemsPanelPage,
    FooterPanelBlock
  }
}
</script>
