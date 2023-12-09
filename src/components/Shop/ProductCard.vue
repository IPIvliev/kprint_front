<template>
    <div class='col-xxl-3 col-lg-4 col-md-6'>
          <!-- article-->
          <router-link class="article" :to = "linkOpen">
            <div class="article__img"> <img :src="product.photo" alt="{{ product.name }}"></div>
            
            <div class="article__content"> 
              <h3 class="article__title">{{ product.name }}</h3>
              <p class="article__text">{{ product.description.replace(/<\/?[^>]+(>|$)/g, "").slice(-150) }}...</p>
            </div>
            <ul class="article__list">
              <li>12 сентября, 2021</li>
              <li>Статьи</li>
            </ul>
          </router-link>
          <!--	/article-->
    </div>
</template>

<script>
export default {
  props: ['product'],
  data() {
    return {
      image: this.product.photo,
    }
  },
  computed: {
      linkOpen () {
          return `/news/${this.product.id}`;
      }
  }
}
</script>
