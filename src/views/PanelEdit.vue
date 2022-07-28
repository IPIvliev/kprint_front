<template>
  <div class="page">
    <header-panel-block />
    <EditPanelPage />
    <footer-panel-block />
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderPanelBlock from '../components/Panel/HeaderBlock.vue'
import EditPanelPage from '../components/Panel/PanelEdit.vue'
import FooterPanelBlock from '../components/Panel/FooterBlock.vue'

export default {
  name: 'News',
  components: {
    EditPanelPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
