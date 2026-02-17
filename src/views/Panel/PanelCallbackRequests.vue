<template>
  <header-panel-block />
  <callback-requests-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import CallbackRequestsPage from '../../components/Panel/CallbackRequests.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    CallbackRequestsPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
