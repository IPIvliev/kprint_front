<template>
  <header-panel-block />
  <print-materials-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PrintMaterialsPage from '../../components/Panel/PrintMaterials.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    PrintMaterialsPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
