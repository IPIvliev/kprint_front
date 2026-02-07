<template>
  <header-panel-block />
  <shop-filter-attr-list-values-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopFilterAttrListValuesPage from '../../components/Panel/ShopFilterAttrListValues.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopFilterAttrListValuesPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
