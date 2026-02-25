<template>
    <!-- video-->
    <div class="white_block cmp-components-study-whywestudyblock" :class="background">
      <div class="container">
        <div class="row gy-1">
          <div class="col-lg-4">
            <h1 class="title">Обучение 3D печати</h1>
            <p class="innovation__text" style="margin-top: 30px;">
              Богатый опыт в области 3Д-печати, профессиональная команда и собственный корпоративны университет позволяют нам проводить обучение 3Д печати.
              Лицензия на предоставление образовательных услуг гарантирует, что студенты не только получат знания, но также имеют возможность получить диплом государственного образца.
            </p>
          </div>
          <div class="col-lg-8" style="text-align: center;" >
            <img src="@/assets/img/whywe.png">
          </div>
        </div>
        <div class="row gy-1" style="margin-top: 30px;">
          <div class="col-lg-3">
            <article class="whywe_card whywe_card--highlight">
              <h4 class="whywe_card_title">Богатый опыт</h4>
              <p class="whywe_card_text">Мы занимаемся фотополимерной печатью с 2019 года.</p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_card whywe_card--highlight">
              <h4 class="whywe_card_title">Практика на реальных задачах</h4>
              <p class="whywe_card_text">
                Учим работать с реальными кейсами по 3D-печати, постобработке и подготовке моделей к печати.
              </p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_card whywe_card--highlight">
              <h4 class="whywe_card_title">Онлайн и офлайн форматы</h4>
              <p class="whywe_card_text">
                Доступны дистанционные занятия и очные практикумы в учебном центре под ваши задачи и график.
              </p>
            </article>
          </div>
          <div class="col-lg-3">
            <article class="whywe_card whywe_card--highlight">
              <h4 class="whywe_card_title">Поддержка после обучения</h4>
              <p class="whywe_card_text">
                Помогаем с выбором материалов и оборудования, а также отвечаем на вопросы после прохождения курса.
              </p>
            </article>
          </div>
        </div>
      </div>
    </div>
    <!--  /video-->
</template>
<script>
export default {
  props: ['background']
}
</script>
