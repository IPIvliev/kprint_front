<template>
    <img class="icons-small-shop-item" :class="icon_color" :src="'../../../images/icons/' + icon_src" />
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
<style scoped>
.icons-small-shop-item {
  position: relative;

  width: 12px;
  height: 12px;
}

.name-shop-item {
  width: fit-content;
  font-family: "RF Dewi-Regular", Helvetica;
  color: #000;
  font-size: 0.8em;
  letter-spacing: -0.26px;
  line-height: 18px;
  white-space: nowrap;
  position: relative;
  font-weight: 400;
}

.filter-red {
    filter: brightness(0) saturate(100%) invert(38%) sepia(35%) saturate(2805%) hue-rotate(320deg) brightness(85%) contrast(100%);
}

.filter_orange {
    filter: brightness(0) saturate(100%) invert(80%) sepia(67%) saturate(1924%) hue-rotate(333deg) brightness(104%) contrast(83%);
}

.filter_green {
    filter: brightness(0) saturate(100%) invert(47%) sepia(54%) saturate(494%) hue-rotate(62deg) brightness(103%) contrast(86%);
}
</style>