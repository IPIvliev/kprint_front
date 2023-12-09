<template>
    <div>
          <!-- article-->
          <router-link class="article" :to = "linkOpen">
            <div class="article__img"> <img :src="image" alt="{{ article.title }}"></div>
            <!-- <div class="article__img"> <img src="@/assets/img/article_2.webp" alt="{{ article.title }}"></div> -->
            <div class="article__content"> 
              <h3 class="article__title">{{ article.title }}</h3>
              <p class="article__text">{{ article.body.replace(/<\/?[^>]+(>|$)/g, "") }}...</p>
            </div>
            <ul class="article__list">
              <li>12 сентября, 2021</li>
              <li>Статьи</li>
            </ul></router-link>
          <!--	/article-->
    </div>
</template>

<script>
export default {
  props: ['article'],
  data() {
    return {
      image: this.article.article_image,
    }
  },
  computed: {
      linkOpen () {
          return `/news/${this.article.id}`;
      }
  }
}
</script>
