<template>
  <header-panel-block />
  <companies-panel-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import CompaniesPanelPage from '../../components/Panel/PanelCompanies.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    CompaniesPanelPage,
    FooterPanelBlock
  }
}
</script>
