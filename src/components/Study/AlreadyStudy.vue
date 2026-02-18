<template>
  <partners-block
    title="Компании, которые уже прошли обучение у нас"
    category="study"
    fallback-category-title="Обучение"
    wrapper-class="cmp-components-study-alreadystudy"
    background-class="gray_background"
  />
</template>

<script>
import PartnersBlock from '@/components/elements/PartnersBlock.vue'

export default {
  name: 'AlreadyStudy',
  components: {
    PartnersBlock
  }
}
</script>
