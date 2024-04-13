<template>
    <!-- video-->
    <div class="white_block" :class="background">
      <div class="container"> 
        <div class="row gy-1">
          <div class="col-lg-6">
            <h1 class="title">Почему 3D-печать заказывают у нас?</h1>
            <p class="innovation__text" style="margin-top: 30px;">
              Богатый опыт в области 3Д-печати, профессиональная команда и собственный корпоративны университет позволяют нам проводить обучение 3Д печати.
              Лицензия на предоставление образовательных услуг гарантирует, что студенты не только получат знания, но также имеют возможность получить диплом государственного образца.
            </p>
          </div>
          <div class="col-lg-6" style="text-align: center;" >
            <img src="@/assets/img/whyweprint.png">
          </div>
        </div>
        <div class="row gy-1" style="margin-top: 30px;">
          <div class="col-lg-3"><img src="@/assets/img/whywe-card.png"></div>
          <div class="col-lg-3"><img src="@/assets/img/whywe-card.png"></div>
          <div class="col-lg-3"><img src="@/assets/img/whywe-card.png"></div>
          <div class="col-lg-3"><img src="@/assets/img/whywe-card.png"></div>
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
<style scoped>

</style>