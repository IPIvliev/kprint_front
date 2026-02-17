<template>
  <header-panel-block />
  <study-categories-page />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import StudyCategoriesPage from '../../components/Panel/StudyCategories.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    StudyCategoriesPage,
    FooterPanelBlock,
    HeaderPanelBlock
  }
}
</script>
