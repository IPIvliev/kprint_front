<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">{{ title }}</div>
              </div>
              <div class="panel__body">
                <div class="panel__table">
                  <div class="panel__table-text">{{ description }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuBlock from '../elements/Panel/MenuBlock.vue'

export default {
  name: 'PanelNewsSectionPlaceholder',
  components: {
    MenuBlock,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: 'Раздел находится в разработке.',
    },
  },
}
</script>
