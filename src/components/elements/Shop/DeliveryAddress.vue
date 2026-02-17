<template>
    <div v-if="office['address-source']">
        {{ (' ' + office['postal-code'] + ', г. ' + office['settlement'] + ', ' + office['address-source']) }}
    </div>
    <div v-else-if="office['code']">
        {{ office['location']['address_full'] }}
    </div>
    <div v-else>
        Необходимо выбрать пункт доставки
    </div>
</template>
<script>
export default {
  props: ['office']
}
</script>
