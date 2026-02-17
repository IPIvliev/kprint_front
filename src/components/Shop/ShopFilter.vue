<template>
  <div class="row cmp-components-shop-shopfilter">
    <div class="filter">
      <div class="row" v-for="filter in filters" :key="filter.name || filter.title">
        <div class="col-12">
          <div class="filter_header">{{ filter.title }}</div>
          <div class="filter_body">
            <template v-if="filter.type === 'C'">
              <ul class="filter_list">
                <li
                  v-for="attr in filter.filter_attrs_list_values"
                  :key="attr.id || attr.value"
                  class="filter_element"
                >
                  <input
                    class="filter-check-input"
                    type="radio"
                    :value="attr.value"
                    v-model="filter.name"
                    :checked="attr.name"
                    :id="attr.id"
                    @click="$emit('selectFilter', filter.title, attr.value)"
                  >
                  <label :for="attr.id">
                    {{ attr.value }}
                    <span
                      v-if="attr.color"
                      class="filter_element_color"
                      :style="{ 'background-color': attr.color }"
                    ></span>
                  </label>
                </li>
              </ul>
              <ul>
                <li>
                  <input
                    class="filter-check-input"
                    type="radio"
                    value="all"
                    v-model="filter.name"
                    :id="filter.name"
                    checked="true"
                    @click="$emit('selectFilter', filter.title, 'all')"
                  >
                  <label :for="filter.name">
                    袙褋械 胁邪褉懈邪薪褌褘
                  </label>
                </li>
              </ul>
            </template>

            <div v-if="filter.type === 'R'" :key="`range-${filter.name || filter.title}`">
              <div class="row">
                <div class="col-6">
                  <input type="text" class="filter_input" placeholder="芯褌" @input="$emit('rangeFilter')">
                </div>
                <div class="col-6">
                  <input type="text" class="filter_input" placeholder="写芯">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="filter_header">小褌芯懈屑芯褋褌褜</div>
          <div class="filter_body">
            <div class="row">
              <div class="col-6">
                <input
                  type="text"
                  class="filter_input"
                  placeholder="芯褌"
                  @input="$emit('priceFilter', 'from', $event.target.value)"
                >
              </div>
              <div class="col-6">
                <input
                  type="text"
                  class="filter_input"
                  placeholder="写芯"
                  @input="$emit('priceFilter', 'to', $event.target.value)"
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['filters', 'selectedFilters'],
  emits: ['selectFilter', 'rangeFilter', 'priceFilter']
}
</script>
