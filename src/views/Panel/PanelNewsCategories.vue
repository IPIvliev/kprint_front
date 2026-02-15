<template>
  <header-panel-block />
  <news-categories-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import NewsCategoriesPanelPage from '../../components/Panel/PanelNewsCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    NewsCategoriesPanelPage,
    FooterPanelBlock,
  },
}
</script>
