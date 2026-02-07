<template>
  <header-panel-block />
  <shop-filter-attr-values-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopFilterAttrValuesPage from '../../components/Panel/ShopFilterAttrValues.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopFilterAttrValuesPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
