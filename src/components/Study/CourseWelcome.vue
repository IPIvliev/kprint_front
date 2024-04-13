<template>
  <div class="main-welcome" >
    <router-link to="/shop">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-1.png" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">Магазин</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>
    <router-link to="/study">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-2.png" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">Обучение</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>
    <router-link to="/print">
      <div class="item-main-welcome">
        <img class="img-main-item" src="../../assets/img/welcome-img-3.png" />
        <div class="frame-main-item">
          <div class="text-wrapper-main-item">3D печать на заказ</div>
          <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
        </div>
      </div>
    </router-link>
  </div>
</template>

<style scoped>
  .main-welcome {
    text-align: center;
    background-color: var(--fillsprimary);
    background-image: url("../../assets/img/pattern.svg");
    border-radius: 0px 0px 80px 80px;
    padding: 40px 0;
    
  }


  .item-main-welcome {
    display: inline-block;
    padding: 24px 32px 40px 32px;
    margin: 20px 40px;
    text-align: center;
    background-color: #ffffffb2;
    border-radius: 40px;
    border: 1px solid;
    border-color: #ffffff;
    box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f;
    backdrop-filter: blur(8px) brightness(100%);
    -webkit-backdrop-filter: blur(8px) brightness(100%); 
  }

  .item-main-welcome:hover {
    -moz-box-shadow: 0 0 10px #000;
    -webkit-box-shadow: 0 0 10px #000;
    box-shadow:0 0 10px var(--bs-gray-dark); 
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    transition: all 0.5s ease;
    cursor: pointer;
  }

  .img-main-item {
    width: 260px;
    height: 260px;
  }

  .frame-main-item {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .text-wrapper-main-item {
    font-weight: bold;
    color: rgba(34, 37, 45, 1);
  }

  .icons-large-main-item {
    width: 24px;
    height: 24px;
    margin-left: 5px;
  }
</style>