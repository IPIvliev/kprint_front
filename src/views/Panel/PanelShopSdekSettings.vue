<template>
  <header-panel-block />
  <shop-sdek-settings-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopSdekSettingsPage from '../../components/Panel/ShopSdekSettings.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopSdekSettingsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  }
}
</script>
