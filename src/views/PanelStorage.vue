<template>
  <div class="page">
    <header-panel-block />
    <StoragePanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../components/Panel/HeaderBlock.vue'
import StoragePanelPage from '../components/Panel/PanelStorage.vue'
import FooterPanelBlock from '../components/Panel/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    StoragePanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
