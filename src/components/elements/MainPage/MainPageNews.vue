<template>
      <!-- slider-->
      <div class="slider">
        <div class="container"> 
          <div class="block-header">
            <div class="block-header__block">
              <h2 class="title">Статьи и пресс–релизы</h2>
              <div class="block-header__num">+19</div>
            </div>
            <router-link to="/news"><div class="btn btn--black">Все новости</div></router-link>
          </div>
          <!-- <div class="slider__slider"> -->
            <!-- <div id="sliderArticles">
              <div class="swiper-wrapper"> -->
                <swiper
      :slidesPerView="4"
      :spaceBetween="30"
      :pagination="{
        clickable: true,
      }"
      :modules="modules"

    >
                  <!-- <article-card v-for="article in 6" :key="article">
                  </article-card> -->
                  <swiper-slide>
                        <div>
                          <!-- article-->
                          <router-link class="article" to="/news/1">
                            <div class="article__img"> <img src="@/assets/img/article_2.webp" alt=""></div>
                            <div class="article__content"> 
                              <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                              <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                            </div>
                            <ul class="article__list">
                              <li>12 сентября, 2021</li>
                              <li>Статьи</li>
                            </ul></router-link>
                          <!--	/article-->
                        </div>
                  </swiper-slide>
                  <swiper-slide>
                        <div>
                          <!-- article-->
                          <router-link class="article" to="/news/1">
                            <div class="article__img"> <img src="@/assets/img/article_2.webp" alt=""></div>
                            <div class="article__content"> 
                              <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                              <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                            </div>
                            <ul class="article__list">
                              <li>12 сентября, 2021</li>
                              <li>Статьи</li>
                            </ul></router-link>
                          <!--	/article-->
                        </div>
                  </swiper-slide>
                  <swiper-slide>
                        <div>
                          <!-- article-->
                          <router-link class="article" to="/news/1">
                            <div class="article__img"> <img src="@/assets/img/article_2.webp" alt=""></div>
                            <div class="article__content"> 
                              <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                              <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                            </div>
                            <ul class="article__list">
                              <li>12 сентября, 2021</li>
                              <li>Статьи</li>
                            </ul></router-link>
                          <!--	/article-->
                        </div>
                  </swiper-slide>
                  <swiper-slide>
                        <div>
                          <!-- article-->
                          <router-link class="article" to="/news/1">
                            <div class="article__img"> <img src="@/assets/img/article_2.webp" alt=""></div>
                            <div class="article__content"> 
                              <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                              <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                            </div>
                            <ul class="article__list">
                              <li>12 сентября, 2021</li>
                              <li>Статьи</li>
                            </ul></router-link>
                          <!--	/article-->
                        </div>
                  </swiper-slide>
                  <swiper-slide>
                        <div>
                          <!-- article-->
                          <router-link class="article" to="/news/1">
                            <div class="article__img"> <img src="@/assets/img/article_2.webp" alt=""></div>
                            <div class="article__content"> 
                              <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                              <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                            </div>
                            <ul class="article__list">
                              <li>12 сентября, 2021</li>
                              <li>Статьи</li>
                            </ul></router-link>
                          <!--	/article-->
                        </div>
                  </swiper-slide>
                </swiper>
              <!-- </div>
            </div> -->
          <!-- </div> -->
        </div>
      </div>
      <!--	/slider-->
</template>
<script>
    import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
    import SwiperClass, { Pagination } from 'swiper'

    import 'swiper/css'
    import 'swiper/css/pagination'


    export default {
        components: {Swiper, SwiperSlide},

        setup() {
            return {
            modules: [Pagination]
            }
        },
    }
</script>