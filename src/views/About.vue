<template>
<div class="page">
  <header-block />

  <div class="content">
  <!-- welcomeabout-->
  <div class="welcomeabout">
    <div class="container">
      <div class="welcomeabout__content">
        <div class="welcomeabout__desc">О проекте</div>
        <h1 class="welcomeabout__title">Проектируем и разрабатываем продукты в области <span>аддитивного производства </span>отличающиеся простотой и эффективностью</h1>
      </div>
      <div class="welcomeabout__img">
        <picture>
          <source media="(max-width: 758px)" srcset="img/about_sm.svg"><img src="img/about.webp" alt="">
        </picture>
      </div>
      <div class="welcomeabout__line"></div>
    </div>
  </div>
  <!--  /welcomeabout-->
  <MainPageAbout/>
  <!-- halfitems-->
  <div class="halfitems">
    <div class="container">
      <div class="row gy-4">
        <div class="col-lg-6"><a class="halfitems__item" href="#">
            <div class="halfitems__content">
              <div class="halfitems__title">Наличие испытательной и исследовательской лаборатории</div>
              <div class="halfitems__text">Все продукты проходят лабораторные испытания и постоянно совершенствуются, так же разрабатываются новые модели.</div>
            </div>
            <div class="halfitems__img"> <img src="img/halfitems_1.webp" alt=""></div></a></div>
        <div class="col-lg-6"><a class="halfitems__item" href="#">
            <div class="halfitems__content">
              <div class="halfitems__title">Собственное производство</div>
              <div class="halfitems__text">Собственное производство позволяет нам не только сохранять отличное качество продукции, но и обеспечивать доступные цены.</div>
            </div>
            <div class="halfitems__img"> <img src="img/halfitems_2.webp" alt=""></div>
            <div class="halfitems__circle">
              <svg width="216" height="174" viewBox="0 0 216 174" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_78_5977)">
                  <circle cx="119" cy="132" r="119" fill="#D83A56"></circle>
                </g>
                <defs>
                  <clipPath>
                    <path d="M0 0H216V158C216 166.837 208.837 174 200 174H0V0Z" fill="white"></path>
                  </clipPath>
                </defs>
              </svg>
            </div></a></div>
      </div>
    </div>
  </div>
  <!--  /halfitems-->

  <PartnersBlock/>
  <!--  /callback-->
  <DarkWelcome/>
</div>

  <footer-block />
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '@/components/HeaderBlock.vue'
import MainPageAbout from '@/components/elements/MainPage/MainPageAbout.vue'
import PartnersBlock from '@/components/elements/PartnersBlock.vue'
import DarkWelcome from '@/components/elements/DarkWelcome.vue'
import FooterBlock from '@/components/FooterBlock.vue'

export default {
  name: 'AboutPageView',
  components: {
    FooterBlock,
    MainPageAbout,
    PartnersBlock,
    DarkWelcome,
    HeaderBlock
  }
}
</script>
