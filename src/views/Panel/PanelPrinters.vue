<template>
  <div class="page">
    <header-panel-block />
    <PrintersPanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PrintersPanelPage from '../../components/Panel/PanelPrinters.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    PrintersPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
