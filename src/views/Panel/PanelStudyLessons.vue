<template>
  <header-panel-block />
  <study-lessons-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyLessonsPage from '../../components/Panel/StudyLessons.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyLessonsPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
