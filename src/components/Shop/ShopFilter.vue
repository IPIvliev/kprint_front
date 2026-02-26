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
                    :name="`filter-${filter.id}`"
                    :checked="isFilterValueSelected(filter.id, attr.id)"
                    :id="`filter-${filter.id}-value-${attr.id}`"
                    @change="$emit('selectFilter', filter.title, attr.value, filter.id, attr.id)"
                  >
                  <label :for="`filter-${filter.id}-value-${attr.id}`">
                    {{ attr.value }}
                    <span v-if="facetValueCount(filter.id, attr.id) !== null" class="filter_count_badge">{{ facetValueCount(filter.id, attr.id) }}</span>
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
                    :name="`filter-${filter.id}`"
                    :id="`filter-${filter.id}-all`"
                    :checked="isAllOptionsSelected(filter.id)"
                    @change="$emit('selectFilter', filter.title, 'all', filter.id, null)"
                  >
                  <label :for="`filter-${filter.id}-all`">
                    Все варианты
                  </label>
                </li>
              </ul>
            </template>

            <div v-if="filter.type === 'R'" :key="`range-${filter.name || filter.title}`">
              <div class="row">
                <div class="col-6">
                  <input type="text" class="filter_input" placeholder="от" @input="$emit('rangeFilter')">
                </div>
                <div class="col-6">
                  <input type="text" class="filter_input" placeholder="до">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="filter_header">Стоимость</div>
          <div class="filter_body">
            <div class="row">
              <div class="col-6">
                <input
                  type="text"
                  class="filter_input"
                  placeholder="от"
                  @input="$emit('priceFilter', 'from', $event.target.value)"
                >
              </div>
              <div class="col-6">
                <input
                  type="text"
                  class="filter_input"
                  placeholder="до"
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
  props: {
    filters: {
      type: Array,
      default: () => []
    },
    selectedFilters: {
      type: Array,
      default: () => []
    },
    facets: {
      type: Object,
      default: null
    }
  },
  emits: ['selectFilter', 'rangeFilter', 'priceFilter'],
  methods: {
    isFilterValueSelected (filterAttrId, valueId) {
      return this.selectedFilters.some(
        item =>
          Number(item?.filterAttrId || 0) === Number(filterAttrId || 0) &&
          Number(item?.valueId || 0) === Number(valueId || 0)
      )
    },
    isAllOptionsSelected (filterAttrId) {
      return !this.selectedFilters.some(
        item => Number(item?.filterAttrId || 0) === Number(filterAttrId || 0)
      )
    },
    facetValueCount (filterAttrId, valueId) {
      const attrs = Array.isArray(this.facets?.attrs) ? this.facets.attrs : null
      if (!attrs) {
        return null
      }
      const attrFacet = attrs.find(item => Number(item.id) === Number(filterAttrId))
      if (!attrFacet) {
        return 0
      }
      const valueFacet = (attrFacet.values || []).find(item => Number(item.id) === Number(valueId))
      return Number(valueFacet?.count || 0)
    }
  }
}
</script>

<style scoped>
.filter_count_badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 20px;
  padding: 0 7px;
  margin-left: 8px;
  border-radius: 999px;
  border: 1px solid rgba(233, 72, 107, 0.35);
  background: rgba(233, 72, 107, 0.12);
  color: #e9486b;
  font-size: 11px;
  font-weight: 600;
  line-height: 1;
}
</style>