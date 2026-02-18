<template>
  <header-panel-block />
  <company-categories-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import CompanyCategoriesPanelPage from '../../components/Panel/PanelCompanyCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    CompanyCategoriesPanelPage,
    FooterPanelBlock
  }
}
</script>
