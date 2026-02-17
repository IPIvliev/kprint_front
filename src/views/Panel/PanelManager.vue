<template>
  <header-panel-block />
  <panel-manager-dashboard />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PanelManagerDashboard from '../../components/Panel/PanelManagerDashboard.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    PanelManagerDashboard,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
