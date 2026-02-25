<template>
<div class="page">
  <header-block />

  <div class="content">
  <!-- welcomeabout-->
  <div class="welcomeabout">
    <div class="container">
      <div class="welcomeabout__content">
        <div class="welcomeabout__desc">О компании</div>
        <h1 class="welcomeabout__title">
          ООО «НПП "3Д Аддитивные Технологии"»
          <span>создаёт продукты и сервисы для аддитивного производства</span>
        </h1>
        <p class="welcomeabout__subtitle">
          С 2019 года мы объединяем исследования, разработку ПО, производство материалов и услуги 3D-печати в единую технологическую экосистему.
        </p>
        <div class="welcomeabout__chips">
          <div class="welcomeabout__chip">R&amp;D в аддитивных технологиях</div>
          <div class="welcomeabout__chip">Собственное ПО и материалы</div>
          <div class="welcomeabout__chip">Производство и обучение</div>
        </div>
        <div class="welcomeabout__actions">
          <router-link class="btn btn--black" to="/contact">Обсудить проект</router-link>
          <router-link class="btn btn--grayborder" to="/study">Посмотреть обучение</router-link>
        </div>
      </div>
      <div class="welcomeabout__img">
        <picture>
          <source media="(max-width: 758px)" srcset="img/about_sm.svg"><img src="img/about.webp" alt="О компании 3Д Аддитивные Технологии">
        </picture>
      </div>
      <div class="welcomeabout__line"></div>
    </div>
  </div>
  <!--  /welcomeabout-->
  <MainPageAbout/>
  <!-- halfitems-->
  <div class="halfitems halfitems--about">
    <div class="container">
      <h2 class="halfitems__title1">Ключевые направления работы</h2>
      <div class="row gy-4">
        <div class="col-lg-6">
          <div class="halfitems__item">
            <div class="halfitems__content">
              <div class="halfitems__title">Разработка программного обеспечения</div>
              <div class="halfitems__text">
                Создаём специализированное ПО для аддитивных технологий:
                от высокоскоростных фотополимерных принтеров до отраслевых цифровых платформ.
              </div>
            </div>
            <div class="halfitems__img"><img src="img/halfitems_1.webp" alt="Разработка ПО для аддитивных технологий"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="halfitems__item">
            <div class="halfitems__content">
              <div class="halfitems__title">Материалы и филамент собственного производства</div>
              <div class="halfitems__text">
                Разрабатываем, производим и поставляем фотополимерные материалы и филаменты для 3D-печати.
              </div>
            </div>
            <div class="halfitems__img"><img src="img/halfitems_2.webp" alt="Фотополимеры и филаменты собственного производства"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="halfitems__item">
            <div class="halfitems__content">
              <div class="halfitems__title">Ферма 3D-принтеров и выпуск изделий под заказ</div>
              <div class="halfitems__text">
                Производим изделия по техническому заданию клиента: от прототипов до серийных партий.
              </div>
            </div>
            <div class="halfitems__img"><img src="img/halfitems_3.webp" alt="Ферма 3D-принтеров"></div>
          </div>
        </div>
        <div class="col-lg-6">
          <div class="halfitems__item">
            <div class="halfitems__content">
              <div class="halfitems__title">Обучение 3D-печати и 3D-сканированию</div>
              <div class="halfitems__text">
                Проводим практико-ориентированные программы для специалистов, команд и производственных подразделений.
              </div>
            </div>
            <div class="halfitems__img"><img src="img/halfitems_4.webp" alt="Обучение 3D-печати и 3D-сканированию"></div>
          </div>
        </div>
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

<style scoped>
.welcomeabout__subtitle {
  max-width: 840px;
  margin: 22px 0 0;
  font-size: 19px;
  line-height: 1.6;
  color: #4f5254;
}

.welcomeabout__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 26px;
}

.welcomeabout__chip {
  padding: 10px 14px;
  border-radius: 999px;
  background: #f2f3f3;
  font-size: 14px;
  line-height: 1.2;
  color: #2f3234;
}

.welcomeabout__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.halfitems--about .halfitems__item {
  height: 100%;
}

@media (max-width: 991.98px) {
  .welcomeabout__subtitle {
    font-size: 16px;
    line-height: 1.5;
  }
}
</style>
