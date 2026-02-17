<template>
  <div class="callback" style="padding-bottom: 120px;">
    <div class="container">
      <div
        class="callback__block modal-trigger"
        data-bs-toggle="modal"
        data-bs-target="#modalCallback"
      >
        <div class="callback__img">
          <img src="@/assets/img/callback.webp" alt="">
        </div>
        <div class="callback__content">
          <h2 class="callback__title">Хотите узнать больше о наших принтерах или материалах?</h2>
          <p class="callback__text">Укажите свои контактные данные и наш менеджер свяжется с вами для консультации</p>
          <div class="callback__form">
            <button type="button" class="btn btn--red btn--big">Перезвоните мне</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.callback__block {
  cursor: pointer;
}
</style>
