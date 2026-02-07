<template>
  <header-panel-block />
  <shop-pochta-settings-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import ShopPochtaSettingsPage from '../../components/Panel/ShopPochtaSettings.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    ShopPochtaSettingsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  }
}
</script>
