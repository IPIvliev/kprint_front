<template>
    <!-- video-->
    <div class="white_block" :class="background">
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
          <div class="col-lg-3 whywe_card">
            <h4 class="whywe_card_title">Богатый опыт</h4>
            <p class="whywe_card_text">Мы занимаемся фотополимерной печатью с 2019 года.</p>
          </div>
          <div class="col-lg-3 whywe_card">

            <i class=""></i>sss
          </div>
          <div class="col-lg-3 whywe_card">

            <i class=""></i>sss
          </div>
          <div class="col-lg-3 whywe_card">

            <i class=""></i>sss
          </div>
        </div>
      </div>
    </div>
    <!--	/video-->
</template>
<script>
export default {
  props: ['background'],
}
</script>
