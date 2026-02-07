<template>
  <header-panel-block />
  <shop-orders-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopOrdersPage from '../../components/Panel/ShopOrders.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopOrdersPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
