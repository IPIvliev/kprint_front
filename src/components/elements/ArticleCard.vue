<template>
  <div :class="class">
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
</template>

<script>
export default {
  props: ['class']
}
</script>
