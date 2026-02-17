<template>
    <!-- <div v-if="office['address-source']"> -->
    <div v-if="GetPrice == 0">
        Необходимо выбрать пункт доставки
    </div>
    <div v-else>
        {{ GetPrice }}
    </div>
</template>
<script>
export default {
  props: ['office'],
  computed: {
    GetPrice () {
      return this.$store.getters['shop/getDeliveryPrice']
    }
  }
}
</script>
