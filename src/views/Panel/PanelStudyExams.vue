<template>
  <header-panel-block />
  <study-exams-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyExamsPage from '../../components/Panel/StudyExams.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyExamsPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
