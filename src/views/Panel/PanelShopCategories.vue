<template>
  <header-panel-block />
  <shop-categories-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopCategoriesPage from '../../components/Panel/ShopCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopCategoriesPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
