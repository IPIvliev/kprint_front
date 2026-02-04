<template>
  <img class="icons-small-shop-item cmp-components-elements-shop-productstock" :class="icon_color" :src="'../../../images/icons/' + icon_src" />
    <div class="name-shop-item ">{{ getStock(stock) }}</div>
</template>
<script>
    export default {
        props: ['stock'],
        data() {
            return {
                icon_color: '',
                icon_src: ''
            }
        },
        methods: {
            getStock(stock) {
                if (stock === 0) {
                    this.icon_color = 'filter-red'
                    this.icon_src = 'cross-circle-filled.svg'

                    return "Товар закончился"
                } else if (stock > 0 & stock < 5) {
                    this.icon_color = 'filter_orange'
                    this.icon_src = 'icon_V.svg'

                    return (stock + ' шт. в наличии')
                } else {
                    this.icon_color = 'filter_green'
                    this.icon_src = 'icon_V.svg'

                    return (stock + ' шт. в наличии')
                }
            }
        }
    }
</script>
