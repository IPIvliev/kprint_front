<template>
  <header-panel-block />
  <study-feedbacks-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyFeedbacksPage from '../../components/Panel/StudyFeedbacks.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyFeedbacksPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
