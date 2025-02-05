<template>
    <!-- <div v-if="office['address-source']"> -->
    <div v-if="GetPeriod == 0">
        Необходимо выбрать пункт доставки
    </div>
    <div v-else>
        {{ GetPeriod }}
    </div>
</template>
<script>
    export default {
        props: ['office'],
        computed: {
            GetPeriod() {
                if (this.$store.state.delivery_price['delivery_time']) {
                    if (this.$store.state.delivery_price['delivery_time'] == 1) {
                        return (this.$store.state.delivery_price['delivery_time'] + ' день')
                    } else if (this.$store.state.delivery_price['delivery_time'] > 1 && this.$store.state.delivery_price['delivery_time'] < 5) {
                        return (this.$store.state.delivery_price['delivery_time'] + ' дня')
                    } else {
                        return (this.$store.state.delivery_price['delivery_time'] + ' дней')
                    }
                    
                } else {
                    return 0
                }
            },
        }
    }
</script>