<template>
<div class="page">
  <header-block/>
  <div class="content">
    <!-- innovation-->
    <div class="innovation">
      <div class="container">
        <h1 class="title">Дилеры</h1>
        <p class="innovation__text">
          Мы всегда рады новым знакомствам. Присоединяйтесь к команде дилеров фотополимерных материалов, образовательных услуг и 3D-печати на заказ.
        </p>
      </div>
    </div>
    <!--  /innovation-->
    <!-- advantages-->
    <advantages-block />
    <!--  /advantages-->
    <!-- halfitems-->
    <div class="halfitems">
      <div class="container">
        <h2 class="halfitems__title1">Перспективные технологии, над которыми мы работаем</h2>
        <div class="row gy-4">
          <div class="col-lg-6"><a class="halfitems__item" href="#">
              <div class="halfitems__content">
                <div class="halfitems__title">Печать без подготовки в 1 клик</div>
                <div class="halfitems__text">Больше не нужно подготавливать модель вручную. Наша система позволит печатать модели в один клик вне зависимости от навыков и умений оператора.</div>
              </div>
              <div class="halfitems__img"> <img src="../assets/img/halfitems_3.webp" alt=""></div></a></div>
          <div class="col-lg-6"><a class="halfitems__item" href="#">
              <div class="halfitems__content">
                <div class="halfitems__title">Система блокчейн-контрактов</div>
                <div class="halfitems__text">Система для обмена, продажи, а также печати в один клик трехмерных моделей на платформе крипто токенов Ethereum.</div>
              </div>
              <div class="halfitems__img"> <img src="../assets/img/halfitems_4.webp" alt=""></div>
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
    <partners-block
      title="Наши дилеры"
      category="dealers"
      fallback-category-title="Наши дилеры"
      :fallback-to-all="true"
    />
    <!-- callback-->
    <callback-window />
    <!--  /callback-->
  </div>
  <footer-block/>
</div>
</template>

<script>
// @ is an alias to /src
import HeaderBlock from '../components/HeaderBlock.vue'
import FooterBlock from '../components/FooterBlock.vue'
import CallbackWindow from '../components/elements/CallbackWindow.vue'
import AdvantagesBlock from '../components/AdvantagesBlock.vue'
import PartnersBlock from '@/components/elements/PartnersBlock.vue'

export default {
  name: 'DealersPageView',
  components: {
    FooterBlock,
    HeaderBlock,
    CallbackWindow,
    AdvantagesBlock,
    PartnersBlock
  }
}
</script>
