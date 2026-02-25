<template>
  <header-panel-block />
  <study-enrollments-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyEnrollmentsPage from '../../components/Panel/StudyEnrollments.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyEnrollmentsPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
