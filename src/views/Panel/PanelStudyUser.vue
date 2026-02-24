<template>
  <header-panel-block />
  <panel-study-user />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PanelStudyUser from '../../components/Panel/PanelStudyUser.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    PanelStudyUser,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
