<template>
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
  <!--	/welcomeabout-->
  <!-- about-->
  <div class="about">
    <div class="container"> 
      <div class="row"> 
        <div class="col-xxl-5 col-lg-6"> 
          <div id="aboutBlockFrom">
            <div class="about__blockrow" id="aboutBlockReplace">
              <div class="about__block about__block--1">
                <div class="about__blcoktitle"> <span>2 </span>модели</div>
                <div class="about__blocktext">выпущены в 2022 году</div>
              </div>
              <div class="about__block about__block--2">
                <div class="about__blcoktitle"> <span>16 </span>сотрудников</div>
                <div class="about__blocktext">в штате нашей компании</div>
              </div>
              <div class="about__block about__block--3">
                <div class="about__blcoktitle"> <span>3 </span>года</div>
                <div class="about__blocktext">на рынке</div>
              </div>
              <div class="about__block about__block--4">
                <div class="about__blcoktitle"> <span>200+ </span>дилеров</div>
                <div class="about__blocktext">продукции по всему миру</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xxl-6 col-lg-6">
          <h2 class="about__title">Расширяем доступ к цифровому производству</h2>
          <div id="aboutBlockTo"></div>
          <div class="about__text">Мы уже давно прошли век корпораций и крупных фабрик, владеющих всеми производственными ресурсами. Возможность купить 3D принтер позволяет нам с вами производить свои собственные изделия в любом количестве и в любом месте.</div>
          <div class="about__items">
            <div class="about__itemsrow">
              <div class="about__item">
                <div class="about__icon"> <img src="img/tooth.svg" alt=""></div>
                <div class="about__itemtitle">Стоматология</div>
                <div class="about__itemtext">Производите стоматологические продукты наивысшего нового стандарта качества, избежав при этом  значительных затрат.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"> <img src="img/car.svg" alt=""></div>
                <div class="about__itemtitle">Автомобилестроение</div>
                <div class="about__itemtext">Используйте на этапе разработки и создавайте изделия более высокого качества дешевле и быстрее.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"> <img src="img/box.svg" alt=""></div>
                <div class="about__itemtitle">Прототипирование</div>
                <div class="about__itemtext">Перед запуском нового изделия в производство проводят тестирование опытного прототипа.</div>
              </div>
              <div class="about__item">
                <div class="about__icon"> <img src="img/design.svg" alt=""></div>
                <div class="about__itemtitle">Дизайн</div>
                <div class="about__itemtext">В архитектуре и дизайне трехмерные принтеры успешно применяются в основном для создания архитектурных макетов.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--	/about-->
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
  <!--	/halfitems-->
  <!-- callback-->
  <callback-window />
  <!--	/callback-->
</div>
</template>

<script>
import CallbackWindow from "./elements/CallbackWindow.vue"

export default {
  name: 'AboutPage',
  components: {CallbackWindow},
}
</script>