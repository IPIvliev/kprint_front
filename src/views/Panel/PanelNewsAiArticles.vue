<template>
  <header-panel-block />
  <panel-news-section-placeholder
    title="ИИ статьи"
    description="Здесь будет управление статьями, созданными с помощью ИИ."
  />
  <footer-panel-block />
</template>

<script>
import HeaderPanelBlock from '../../components/Panel/HeaderBlock.vue'
import PanelNewsSectionPlaceholder from '../../components/Panel/PanelNewsSectionPlaceholder.vue'
import FooterPanelBlock from '../../components/Panel/FooterBlock.vue'

export default {
  components: {
    HeaderPanelBlock,
    PanelNewsSectionPlaceholder,
    FooterPanelBlock,
  },
}
</script>
