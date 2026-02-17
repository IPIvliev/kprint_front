<template>
<div class="content">
  <!-- block404-->
  <div class="block404">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-7">
          <div class="block404__img"> <img src="../assets/img/404.webp" alt=""></div>
        </div>
        <div class="col-lg-5">
          <div class="block404__content">
            <div class="block404__title">Страница не найдена</div>
            <div class="block404__text">Запрашиваемая страница недоступна. Возможно она была удалена или её адрес был указан неверно.</div>
            <router-link class="btn btn--red btn--big" to="/">Вернуться на главную</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  /block404-->
</div>
</template>

<script>
export default {
  name: 'NotFoundBlock'
}
</script>
