<template>
  <header-panel-block />
  <study-prices-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyPricesPage from '../../components/Panel/StudyPrices.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyPricesPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
