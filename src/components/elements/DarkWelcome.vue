<template>
  <div class="main-welcome">
        <img class="pattern-main-welcome" src="../../assets/img/white_pattern.svg" />
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-1.png" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">Магазин</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-2.png" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">Обучение</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
        <div class="item-main-welcome">
          <img class="img-main-item" src="../../assets/img/welcome-img-3.png" />
          <div class="frame-main-item">
            <div class="text-wrapper-main-item">3D печать на заказ</div>
            <img class="icons-large-main-item" src="../../assets/img/Large.svg" />
          </div>
        </div>
      </div>
</template>
<style scoped>
.main-welcome {
  display: flex;
  width: 1920px;
  align-items: center;
  gap: 40px;
  padding: 80px 320px 80px 320px;
  position: relative;
  background-color: var(--bs-footer);
  /* background-color: var(--fillssecondary); */
  /* border-radius: 0px 0px 80px 80px; */
  overflow: hidden;
}

.pattern-main-welcome {
  position: absolute;
  width: 1920px;
  height: 2011px;
  top: -910;
  left: 0;
}

.item-main-welcome {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  padding: 24px 32px 40px 32px;
  position: relative;
  flex: 1;
  flex-grow: 1;
  background-color: #34373a80;
  border-radius: 40px;
  /* border: 1px solid; */
  /* border-color: #ffffff; */
  /* box-shadow: 0px 8px 12px #dde2e533, -10px 34px 34px #0000000f; */
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
  position: relative;
  width: 260px;
  height: 260px;
  object-fit: cover;
}

.frame-main-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  position: relative;
  flex: 0 0 auto;
}

.button-main-item {
  display: flex;
  width: 220px;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 10px var(--tokens-4xl);
  position: relative;
  background-color: var(--graysblack);
  border-radius: var(--tokens-l);
}

.text-wrapper-main-item {
  position: relative;
  width: fit-content;
  font-weight: bold;
  color: var(--grayswhite);

}

.icons-large-main-item {
  position: relative;
  width: 24px;
  height: 24px;
}
</style>