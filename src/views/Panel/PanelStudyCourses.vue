<template>
  <header-panel-block />
  <study-courses-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyCoursesPage from '../../components/Panel/StudyCourses.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyCoursesPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
