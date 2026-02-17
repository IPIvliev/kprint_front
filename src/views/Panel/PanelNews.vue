<template>
  <header-panel-block />
  <news-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import NewsPanelPage from '../../components/Panel/PanelNews.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    NewsPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
