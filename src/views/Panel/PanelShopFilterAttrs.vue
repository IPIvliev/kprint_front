<template>
  <header-panel-block />
  <shop-filter-attrs-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopFilterAttrsPage from '../../components/Panel/ShopFilterAttrs.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopFilterAttrsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
