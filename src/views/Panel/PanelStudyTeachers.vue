<template>
  <header-panel-block />
  <study-teachers-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyTeachersPage from '../../components/Panel/StudyTeachers.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyTeachersPage,
    FooterPanelBlock,
    HeaderPanelBlock,
  },
}
</script>
