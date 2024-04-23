<template>
  <div :class="columns" v-for="product in products" :key="product.id" >
    <div class="item-card-shop">
      <div class="div-shop-item">
        <div class="img-shop-item"><img class="img-2-shop-item" :src="product.photo" height="262"/></div>
        <div class="div-shop-item">
          <div class="rating-stock-m-shop-item">
            <div class="rating-shop-item">
              <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
              <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
              <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
              <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
              <img class="icons-small-shop-item" src="@/assets/img/icon_Star.svg" />
            </div>
            <div class="stock-shop-item">
              <img class="icons-small-shop-item" src="@/assets/img/icon_V.svg" />
              <div class="name-shop-item">42 шт. в наличии</div>
            </div>
          </div>
          <div class="item-shop-item">
            <div class="description-shop-item">Специальные смолы</div>
            <p class="text-wrapper-shop-item">
              {{ product.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="footer-shop-item">
        <div class="price-shop-item">
          <!-- <div class="before-shop-item">
            <div class="overlap-group-shop-item">
              <div class="before-2-shop-item">3 000 ₽</div>
              <div class="rectangle-shop-item"></div>
            </div>
          </div> -->
          <div class="now-shop-item">8 000 ₽</div>
        </div>
        <div class="buttons-shop-item">
          <div class="item-card-button-m-shop-item"><img class="icons-medium-shop-item" src="@/assets/img/medium.svg" /></div>
          <div class="item-card-button-m-2-shop-item">
            <img class="icons-small-2-shop-item" src="@/assets/img/small-5.svg" />
            <div class="text-wrapper-2-shop-item">В корзину</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['products', 'columns'],
  data() {
    return {

    }
  },
  computed: {

  }
}
</script>

<style scoped>
.item-card-shop {
  margin: 10px 0;
  gap: var(--tokens-3xl);
  padding: var(--tokens-m) var(--tokens-m) var(--tokens-xl) var(--tokens-m);
  background-color: var(--grayswhite);
  border-radius: var(--tokens-xl);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.item-card-shop:hover {
	-moz-box-shadow: 0 0 10px #000;
	-webkit-box-shadow: 0 0 10px #000;
	box-shadow:0 0 10px var(--bs-gray-dark); 
	-webkit-transition: all 0.5s ease;
	-moz-transition: all 0.5s ease;
	transition: all 0.5s ease;
  
}

.div-shop-item {
  gap: var(--tokens-xl);
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}



.img-shop-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--tokens-l);
  position: relative;
  align-self: stretch;
  width: 100%;
}

.img-2-shop-item {
  width: 100%;
  border-radius: 14px;
  object-fit: cover;
  object-position: 50% 50%;
}

.rating-stock-m-shop-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px var(--tokens-2xs) 0px var(--tokens-2xs);
  position: relative;
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
}

.rating-shop-item {
  display: inline-flex;
  align-items: center;
  gap: var(--tokens-2xs);
  position: relative;
  flex: 0 0 auto;
}

.icons-small-shop-item {
  position: relative;
  width: 12px;
  height: 12px;
}

.stock-shop-item {
  display: inline-flex;
  align-items: center;
  gap: var(--tokens-xs);
  position: relative;
  flex: 0 0 auto;
}

.name-shop-item {
  width: fit-content;
  font-family: "RF Dewi-Regular", Helvetica;
  color: var(--textsecondary);
  font-size: 13px;
  letter-spacing: -0.26px;
  line-height: 18px;
  white-space: nowrap;
  position: relative;
  font-weight: 400;
}

.item-shop-item {
  gap: var(--tokens-xl);
  padding: 0px var(--tokens-2xs) 0px var(--tokens-2xs);
  align-self: stretch;
  width: 100%;
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
}

.description-shop-item {
  position: relative;
  width: 234px;
  height: 9px;
  margin-top: -1px;
  font-family: var(--caption-1-semibold-font-family);
  font-weight: var(--caption-1-semibold-font-weight);
  color: var(--textsecondary);
  font-size: var(--caption-1-semibold-font-size);
  letter-spacing: var(--caption-1-semibold-letter-spacing);
  line-height: var(--caption-1-semibold-line-height);
  white-space: nowrap;
  font-style: var(--caption-1-semibold-font-style);
}

.text-wrapper-shop-item {
  align-self: stretch;
  /* height: 43px; */
  color: var(--textprimary);
  font-size: var(--body-semibold-font-size);
  letter-spacing: var(--body-semibold-letter-spacing);
  line-height: var(--body-semibold-line-height);
  /* overflow: hidden; */
  /* text-overflow: ellipsis; */
  /* display: -webkit-box; */
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  position: relative;
  font-weight: 500;
  font-style: normal;
}

.footer-shop-item {
  display: flex;
  height: 48px;
  align-items: center;
  justify-content: space-between;
  padding: 0px var(--tokens-2xs) 0px var(--tokens-2xs);
  position: relative;
  align-self: stretch;
  width: 100%;
}

.price-shop-item {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: var(--tokens-s);
  padding: var(--tokens-3xs) 0px var(--tokens-3xs) 0px;
  position: relative;
  flex: 1;
  align-self: stretch;
  flex-grow: 1;
}

.before-shop-item {
  position: relative;
  width: 45px;
  height: 9px;
}

.overlap-group-shop-item {
  position: relative;
  width: 47px;
  height: 10px;
  top: -1px;
  left: -1px;
}

.before-2-shop-item {
  position: absolute;
  top: 0;
  left: 1px;
  font-family: "RF Dewi-Semibold", Helvetica;
  font-weight: 400;
  color: var(--textsecondary);
  font-size: 13px;
  letter-spacing: -0.26px;
  line-height: 18px;
  white-space: nowrap;
}

.rectangle-shop-item {
  position: absolute;
  width: 47px;
  height: 3px;
  top: 4px;
  left: 0;
  background-color: var(--textsecondary);
  border-radius: 30px;
  border: 1px solid;
  border-color: var(--grayswhite);
  transform: rotate(-6deg);
}

.now-shop-item {
  position: relative;
  width: fit-content;
  font-family: var(--subhead-2-semibold-font-family);
  font-weight: var(--subhead-2-semibold-font-weight);
  color: var(--textprimary);
  font-size: var(--subhead-2-semibold-font-size);
  letter-spacing: var(--subhead-2-semibold-letter-spacing);
  line-height: var(--subhead-2-semibold-line-height);
  white-space: nowrap;
  font-style: var(--subhead-2-semibold-font-style);
}


.buttons-shop-item {
  display: inline-flex;
  align-items: center;
  gap: var(--tokens-s);
  position: relative;
  flex: 0 0 auto;
}

.item-card-button-m-shop-item {
  display: flex;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  /* padding: 10px var(--tokens-4xl) 10px var(--tokens-4xl); */
  position: relative;
  border-radius: var(--tokens-m);
  border: 1px solid;
  border-color: var(--graysgray-10);
}

.icons-medium-shop-item {
  position: relative;
  width: 14px;
  height: 14px;
  margin-left: -25px;
  margin-right: -25px;
}

.item-card-button-m-2-shop-item {
  display: flex;
  width: 120px;
  height: 44px;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 10px var(--tokens-l) 10px var(--tokens-l);
  position: relative;
  background-color: var(--colorsdark-red);
  border-radius: var(--tokens-m);
}

.icons-small-2-shop-item {
  position: relative;
  width: 14px;
  height: 14px;
}

.text-wrapper-2-shop-item {
  position: relative;
  width: fit-content;
  font-family: var(--caption-2-semibold-font-family);
  font-weight: var(--caption-2-semibold-font-weight);
  color: var(--text-ivertedprimary);
  font-size: var(--caption-2-semibold-font-size);
  letter-spacing: var(--caption-2-semibold-letter-spacing);
  line-height: var(--caption-2-semibold-line-height);
  white-space: nowrap;
  font-style: var(--caption-2-semibold-font-style);
}

.img-3-shop-item {
  flex: 1;
  flex-grow: 1;
  position: relative;
  align-self: stretch;
  width: 100%;
}
</style>
