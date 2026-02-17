<template>
  <header-panel-block />
  <news-tags-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import NewsTagsPanelPage from '../../components/Panel/PanelNewsTags.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    NewsTagsPanelPage,
    FooterPanelBlock
  }
}
</script>
