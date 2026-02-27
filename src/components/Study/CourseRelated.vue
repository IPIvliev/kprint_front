<template>
    <!-- video-->
    <div class="white_block cmp-components-study-courserelated" :class="background">
      <div class="container">
        <h1 class="title">Похожие курсы</h1>
      </div>
      <div class="container-fluid">
        <div class="row">
          <swiper
            :spaceBetween="30"
            :slidesPerView="2"
            :freeMode="true"

            class="mySwiper"
          >
            <swiper-slide v-for="course in related" :key="course.id">
              <router-link :to="{path: '/study/course/' + (course.slug || course.id) }">
                <div class="cource">
                  <div class="row">
                    <div class="col-lg-3">
                      <img class="course_photo" :src="course.photo" width="340" height="200">
                    </div>
                    <div class="col-lg-9">
                      <div class="row">
                        <h3 style="margin-bottom: 10px;"> {{ course.name }} </h3>
                      </div>
                      <div class="row">
                        <p> {{ course.description }} </p>
                      </div>
                      <div class="row cource_footer">
                        <div class="col-lg-3">
                          <span class="period"> {{ course.duration }} </span>
                        </div>
                        <div class="col-lg-9">
                          <p>
                            {{ course.lessons_number }} уроков
                            <img class="icon-ellipse" src="@/assets/img/Ellipse.svg" />
                            {{ course.teachers_number }} преподавателя
                            <img class="icon-ellipse" src="@/assets/img/Ellipse.svg" />
                            20 часов</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
    <!--  /video-->
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  props: ['background', 'related'],
  components: { Swiper, SwiperSlide }
}
</script>
