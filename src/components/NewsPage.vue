<template>
  <div class="content cmp-components-newspage">
    <!-- news-->
    <div class="news">
      <div class="container">
        <h1 class="title">Статьи и пресс–релизы</h1>
        <p class="news__text">В данном разделе мы делимся актуальными новостями об аддитивных технологиях, советами и знаниями.</p>
        <!-- <div class="row"> 
          <div class="col-xxl-6 col-lg-8">
            <div class="row"> 
              <div class="col-md-12">
                <div class="select mb-1">
                  <select name="#" data-placeholder="Тип публикации">
                    <option label="#"></option>
                    <option value="#">База знаний</option>
                    <option value="#">Статьи</option>
                    <option value="#">Пресс-релизы</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div> -->
        <div class="row gy-1">
          <article-card v-for="article in articles" :key="article.id" v-bind:article="article" :class="'col-xxl-3 col-lg-4 col-md-6'">
          </article-card>
        </div>
        <div class="news__pagination"> 
          <ul class="news__list"> 
            <li> <a href="#">1</a></li>
            <li> <a class="active" href="#">2</a></li>
            <li> <a href="#">3</a></li>
            <li> <span> ...</span></li>
            <li> <a href="#">12</a></li>
            <li class="news__next"><a href="#">Дальше
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_78_8940)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0.75 9C0.75 13.5562 4.44375 17.25 9 17.25C13.5562 17.25 17.25 13.5562 17.25 9C17.25 4.44375 13.5562 0.749999 9 0.75C4.44375 0.75 0.749999 4.44375 0.75 9ZM7.5 11.4C7.49877 11.5064 7.52557 11.6113 7.5777 11.7041C7.62983 11.797 7.70546 11.8744 7.797 11.9287C7.88592 11.9799 7.98773 12.0043 8.09018 11.999C8.19263 11.9936 8.29136 11.9588 8.3745 11.8987L11.7495 9.49875C11.8279 9.44147 11.8914 9.36636 11.935 9.27963C11.9786 9.1929 12.0008 9.09705 12 9C12.001 8.90282 11.9787 8.80682 11.9352 8.71995C11.8916 8.63308 11.828 8.55785 11.7495 8.5005L8.3745 6.1005C8.29136 6.0404 8.19263 6.0056 8.09018 6.00028C7.98773 5.99495 7.88592 6.01934 7.797 6.0705C7.70535 6.1249 7.62965 6.20248 7.57751 6.29543C7.52537 6.38839 7.49864 6.49343 7.5 6.6L7.5 11.4Z"></path>
                  </g>
                  <defs>
                    <clipPath>
                      <rect width="18" height="18" fill="white" transform="translate(0 18) rotate(-90)"></rect>
                    </clipPath>
                  </defs>
                </svg></a></li>
          </ul>
        </div>
      </div>
    </div>
    <!--	/news-->
    <!-- callback-->
    <callback-window />
    <!--	/callback-->
  </div>
</template>

<script>
import CallbackWindow from "./elements/CallbackWindow.vue"
import ArticleCard from "./News/ArticleCard.vue"
import { api } from '@/services/http'
export default {
  name: 'NewsPage',
  data() {
    return {
      articles: []
    }
  },
  components: {CallbackWindow, ArticleCard},
  mounted() {
  api
    .get('/api/articles/')
    .then(response => (this.articles = response.data))
  }
}
</script>


