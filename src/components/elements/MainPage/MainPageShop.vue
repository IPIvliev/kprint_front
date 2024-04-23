<template>
    <div class="white_block" :class="background">
      <div class="container"> 
        <h2 class="title">Купить фотополимерные материалы <br />и оборудование для 3Д-печати</h2>
      

        <div class="row gy-1 shop">

            <ProductCard :products="ProductsList" columns="col-xl-3 col-lg-4 col-md-6" />


        </div>
        <div class="row">
          <div class="button-center">
            <div class="button-l-shop"><div class="lable-shop">Посмотреть весь каталог</div></div>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import ProductCard from "@/components/elements/Shop/Showcase/ProductCard.vue"

export default {
  props: ['background'],
  components: {ProductCard},
  created() {
        this.$store.dispatch("fetchProducts");
    },
  computed: {
    ProductsList () {
      return this.$store.state.products
    },  
  }  
}
</script>
<style scoped>

.shop {
margin-top: 40px;
}

.button-center {
  align-items: center;
  text-align: center;
}

.button-l-shop {
  display: flex;
  margin-top: 40px;
  text-align: center;
  width: 280px;
  height: 62px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px var(--tokens-4xl) 10px var(--tokens-4xl);

  background-color: var(--graysblack);
  border-radius: var(--tokens-l);
}

.lable-shop {
  display: inline-block;
  position: relative;
  width: fit-content;
  margin-left: -3.5px;
  margin-right: -3.5px;
  font-family: var(--body-semibold-font-family);
  font-weight: var(--body-semibold-font-weight);
  color: var(--borderprimary);
  font-size: var(--body-semibold-font-size);
  letter-spacing: var(--body-semibold-letter-spacing);
  line-height: var(--body-semibold-line-height);
  white-space: nowrap;
  font-style: var(--body-semibold-font-style);
}



</style>