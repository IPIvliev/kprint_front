<template>
  <div class="page">
    <header-panel-block />
    <ModelsPanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../components/Panel/HeaderBlock.vue'
import ModelsPanelPage from '../components/Panel/PanelModels.vue'
import FooterPanelBlock from '../components/Panel/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    ModelsPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
