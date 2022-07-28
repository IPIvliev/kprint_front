<template>
  <div class="page">
    <header-panel-block />
    <MainPanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../components/Panel/HeaderBlock.vue'
import MainPanelPage from '../components/Panel/PanelMain.vue'
import FooterPanelBlock from '../components/Panel/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    MainPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
