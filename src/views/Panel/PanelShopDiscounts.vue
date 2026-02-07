<template>
  <header-panel-block />
  <shop-discounts-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopDiscountsPage from '../../components/Panel/ShopDiscounts.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopDiscountsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
