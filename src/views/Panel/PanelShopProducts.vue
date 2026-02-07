<template>
  <header-panel-block />
  <shop-products-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopProductsPage from '../../components/Panel/ShopProducts.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopProductsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
