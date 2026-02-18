<template>
  <header-panel-block />
  <gallery-categories-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import GalleryCategoriesPanelPage from '../../components/Panel/PanelGalleryCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    GalleryCategoriesPanelPage,
    FooterPanelBlock
  }
}
</script>
