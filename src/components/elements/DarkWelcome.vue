<template>
  <div class="main-welcome cmp-components-elements-darkwelcome">
        <router-link class="darkwelcome-link" to="/shop">
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-1.webp" loading="lazy" decoding="async" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">Магазин</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
        </router-link>
        <router-link class="darkwelcome-link" to="/study">
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-2.webp" loading="lazy" decoding="async" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">Обучение</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
        </router-link>
        <router-link class="darkwelcome-link" to="/print">
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-3.webp" loading="lazy" decoding="async" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">3D печать на заказ</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
        </router-link>
      </div>
</template>

<style src="@/assets/css/components/elements/DarkWelcome.css"></style>
