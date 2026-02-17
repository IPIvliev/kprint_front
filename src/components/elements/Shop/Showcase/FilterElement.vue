<template>
  <div class="row cmp-components-elements-shop-showcase-filterelement">
        <div class="filter_item" v-for="filter in filters" :key="`${filter.name}-${filter.attr}`">
            <p>
                {{ filter.name }}: {{ filter.attr }}
                <!-- <span class="close" @click="$emit('selectFilter', filter.name, filter.attr)">X</span> -->
            </p>
        </div>
    </div>
</template>
<script>
export default {
  props: ['filters'],
  emits: ['selectFilter']
}
</script>
