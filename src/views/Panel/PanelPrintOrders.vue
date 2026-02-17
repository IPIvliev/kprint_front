<template>
  <header-panel-block />
  <print-orders-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PrintOrdersPage from '../../components/Panel/PrintOrders.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    PrintOrdersPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
