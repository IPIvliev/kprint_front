<template>
  <header-panel-block />
  <print-material-categories-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PrintMaterialCategoriesPage from '../../components/Panel/PrintMaterialCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    PrintMaterialCategoriesPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
