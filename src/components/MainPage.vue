<template>
  <div class="content">
    <!-- welcome-->
    <div class="welcome">
      <div class="container">
        <div class="welcome__content">
          <div class="shop inline">
            <a class="menu__btn menu__btn--red" href="#" style="margin-top: 300px; position: relative;">
              <div class="menu__btn-icon"> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                </svg>
              </div>
              <div class="menu__btn-content">
                <div class="menu__btn-title">Магазин</div>
                <div class="menu__btn-text">Места продаж нашей продукции</div>
              </div>
            </a>
          </div>
          <div class="print inline">
            <a class="menu__btn menu__btn--red" href="#" style="margin-top: 300px; position: relative;">
              <div class="menu__btn-icon"> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                </svg>
              </div>
              <div class="menu__btn-content">
                <div class="menu__btn-title">Заказать 3D печать</div>
                <div class="menu__btn-text">Места продаж нашей продукции</div>
              </div>
            </a>
          </div>
          <div class="study inline">
            <a class="menu__btn menu__btn--red" href="#" style="margin-top: 300px; position: relative;">
              <div class="menu__btn-icon"> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                </svg>
              </div>
              <div class="menu__btn-content">
                <div class="menu__btn-title">пройти обучение</div>
                <div class="menu__btn-text">Места продаж нашей продукции</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

          <!-- <div><div><div>
          <div class="test_fon"></div>
          <h1 class="welcome__title">Производство фотополимерных 3D принтеров для решения любых задач</h1>
          <p class="welcome__text">Современные высокопроизводительные модели отличающиеся простой сборкой с помощью модульной конструкции</p>
          <div class="welcome__buttons">
            <a class="menu__btn menu__btn--red" href="#">
              <div class="menu__btn-icon"> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                </svg>
              </div>
              <div class="menu__btn-content">
                <div class="menu__btn-title">Где купить?</div>
                <div class="menu__btn-text">Места продаж нашей продукции</div>
              </div>
            </a>
            <router-link to="/dealers" class="menu__btn">
              <div class="menu__btn-icon"> 
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.3998 4.7999C10.3998 5.43642 10.1469 6.04687 9.69686 6.49696C9.24677 6.94705 8.63632 7.1999 7.9998 7.1999C7.36329 7.1999 6.75284 6.94705 6.30275 6.49696C5.85266 6.04687 5.5998 5.43642 5.5998 4.7999C5.5998 4.16338 5.85266 3.55293 6.30275 3.10285C6.75284 2.65276 7.36329 2.3999 7.9998 2.3999C8.63632 2.3999 9.24677 2.65276 9.69686 3.10285C10.1469 3.55293 10.3998 4.16338 10.3998 4.7999ZM14.3998 6.3999C14.3998 6.82425 14.2312 7.23121 13.9312 7.53127C13.6311 7.83133 13.2241 7.9999 12.7998 7.9999C12.3755 7.9999 11.9685 7.83133 11.6684 7.53127C11.3684 7.23121 11.1998 6.82425 11.1998 6.3999C11.1998 5.97556 11.3684 5.56859 11.6684 5.26853C11.9685 4.96847 12.3755 4.7999 12.7998 4.7999C13.2241 4.7999 13.6311 4.96847 13.9312 5.26853C14.2312 5.56859 14.3998 5.97556 14.3998 6.3999ZM11.1998 11.9999C11.1998 11.1512 10.8627 10.3373 10.2625 9.73716C9.66243 9.13704 8.8485 8.7999 7.9998 8.7999C7.15111 8.7999 6.33718 9.13704 5.73706 9.73716C5.13695 10.3373 4.7998 11.1512 4.7998 11.9999V13.3999C4.7998 13.9522 5.24752 14.3999 5.7998 14.3999H10.1998C10.7521 14.3999 11.1998 13.9522 11.1998 13.3999V11.9999ZM4.7998 6.3999C4.7998 6.82425 4.63123 7.23121 4.33118 7.53127C4.03112 7.83133 3.62415 7.9999 3.1998 7.9999C2.77546 7.9999 2.36849 7.83133 2.06843 7.53127C1.76838 7.23121 1.5998 6.82425 1.5998 6.3999C1.5998 5.97556 1.76838 5.56859 2.06843 5.26853C2.36849 4.96847 2.77546 4.7999 3.1998 4.7999C3.62415 4.7999 4.03112 4.96847 4.33118 5.26853C4.63123 5.56859 4.7998 5.97556 4.7998 6.3999ZM13.7998 14.3999C13.2475 14.3999 12.7998 13.9522 12.7998 13.3999V11.9999C12.801 11.1865 12.5944 10.3863 12.1998 9.6751C12.5545 9.58434 12.9252 9.57578 13.2837 9.65008C13.6422 9.72438 13.979 9.87958 14.2684 10.1038C14.5577 10.3281 14.7921 10.6155 14.9535 10.9441C15.1149 11.2727 15.1992 11.6338 15.1998 11.9999V13.3999C15.1998 13.9522 14.7521 14.3999 14.1998 14.3999H13.7998ZM3.7998 9.6751C3.4052 10.3863 3.19868 11.1865 3.1998 11.9999V13.3999C3.1998 13.9522 2.75209 14.3999 2.1998 14.3999H1.7998C1.24752 14.3999 0.799805 13.9522 0.799805 13.3999V11.9999C0.799651 11.6335 0.883375 11.272 1.04456 10.943C1.20575 10.614 1.44012 10.3262 1.72971 10.1018C2.0193 9.87742 2.35643 9.72228 2.71525 9.64832C3.07408 9.57435 3.44507 9.58351 3.7998 9.6751Z"></path>
                </svg>
              </div>
              <div class="menu__btn-content">
                <div class="menu__btn-title">Стать дилером</div>
                <div class="menu__btn-text">Присоединяйтесь к нам</div>
              </div>
            </router-link>
          </div>
        </div>

        <div class="welcome__img"> 
          <picture> 
            <source media="(max-width: 768px)" srcset="../assets/img/welcome_sm.webp"><img src="../assets/img/welcome.webp" alt="">
          </picture>
        </div>
      </div>
    </div> -->
    <!--	/welcome-->
    <!-- video-->
    <div class="video">
      <div class="container"> 
        <div class="video__block js_youtube" id="X8Z8okhkjv8">
          <div class="video__frame"><img src="../assets/img/video-prev.webp" alt=""></div>
          <div class="video__play">
            <svg width="26" height="38" viewBox="0 0 26 38" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.75293 37.5194V0.480469L25.714 18.9999L0.75293 37.5194Z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <!--	/video-->
    <!-- advantages-->
    <advantages-block />
    <!--	/advantages-->
    <!-- productlines-->
    <div class="productlines">
      <div class="container"> 
        <h2 class="title title--white">Линейка принтеров</h2>
        <p class="productlines__text">С полученными знаниями и опытом мы продолжаем улучшать наши модели принтеров и постоянно ведем работу над новыми продуктами.</p>
        <div class="productlines__item"> 
          <h3 class="productlines__title">Kulibin Print<span>Pro1</span></h3>
          <p class="productlines__subtext">Современная модель отличающаяся простой сборкой с помощью модульной конструкции</p>
          <div class="productlines__row"> <a class="productlines__images" href="#">
              <div class="productlines__imagebig"> <img src="../assets/img/gallery_1.webp" alt=""></div>
              <div class="productlines__imagessmall">
                <div class="productlines__imgsmall"><img src="../assets/img/gallery_4.webp" alt=""></div>
                <div class="productlines__imgsmall"><img src="../assets/img/welcome_sm.webp" alt=""></div>
                <div class="productlines__imgsmall"><img src="../assets/img/welcome_sm.webp" alt=""></div>
                <div class="productlines__count">+12</div>
              </div></a>
            <div id="propertyTo"></div>
            <div class="productlines__content"> 
              <div class="productlines__subtitle">Особенности</div>
              <ul class="productlines__list"> 
                <li>Современная модель отличающаяся простой сборкой с помощью модульной конструкции</li>
                <li>Качество печати не ухудшается в зависимости от времени работы принтера.</li>
                <li>Изоляция блока нагрева, регулировка прижимающего механизма под разные типы пластиков</li>
              </ul>
            </div>
          </div>
          <div id="propertyFrom">
            <div class="productlines__property" id="propertyReplace">
              <div class="productlines__property-row">
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.00039 15L4.40039 21M5.00039 15L5.95078 4.54568C5.97888 4.23663 6.238 4 6.54832 4H20.3434C20.6962 4 20.9729 4.30295 20.9409 4.65432L20.05 14.4543C20.0219 14.7634 19.7628 15 19.4525 15H5.00039Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 7.5L16 11.5" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Скорость печати</div>
                    <div class="productlines__property-text">До 90 см3 в час</div>
                  </div>
                </div>
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.6667 20H7.33333C6.04467 20 5 18.9927 5 17.75V16.25C5 15.0073 6.04467 14 7.33333 14H16.6667C17.9554 14 19 15.0073 19 16.25V17.75C19 18.9927 17.9554 20 16.6667 20Z" stroke="#71797D" stroke-width="1.5"/>
  <path d="M5 8V6.66667C5 5.19391 6.39289 4 8.11111 4H15.8889C17.6071 4 19 5.19391 19 6.66667V8" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 8L15 10.25M12 14V8V14ZM12 8L9 10.25L12 8Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Регулируемая платформа</div>
                    <div class="productlines__property-text">Не требует доп. настроек</div>
                  </div>
                </div>
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.8785 7.69671L15.9998 9.81803C16.3904 10.2085 16.3904 10.8417 15.9998 11.2322L8.36312 18.869C8.26977 18.9623 8.15885 19.0363 8.03677 19.0866L5.54014 20.1146C4.30723 20.6222 3.07433 19.3893 3.58199 18.1564L4.61002 15.6598C4.66029 15.5377 4.73423 15.4268 4.82759 15.3335L12.4643 7.69671C12.8548 7.30618 13.488 7.30618 13.8785 7.69671Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.0003 5.57542L18.1216 7.69674M13.8789 3.4541L16.0003 5.57542L13.8789 3.4541ZM20.2429 9.81806L18.1216 7.69674L20.2429 9.81806ZM16.0003 5.57542L17.4145 4.16121C17.805 3.77069 18.4382 3.77069 18.8287 4.16121L19.5358 4.86832C19.9263 5.25884 19.9263 5.89201 19.5358 6.28253L18.1216 7.69674L16.0003 5.57542Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Автоматический долив</div>
                    <div class="productlines__property-text">Не требует постоянного контроля</div>
                  </div>
                </div>
              </div>
            </div>
          </div><a class="btn btn--red btn--big" href="#">Узнать подробнее</a>
        </div>
        <div class="productlines__item"> 
          <h3 class="productlines__title">Kulibin Print<span>Dental<img src="../assets/img/tooth.webp" alt=""></span></h3>
          <p class="productlines__subtext">Благодаря своим широким возможностям можно с успехом применять в медицине, стоматологии и множестве других сфер.</p>
          <div class="productlines__row"> <a class="productlines__images" href="#">
              <div class="productlines__imagebig"> <img src="../assets/img/welcome_sm.webp" alt=""></div>
              <div class="productlines__imagessmall">
                <div class="productlines__imgsmall"><img src="../assets/img/gallery_6.webp" alt=""></div>
                <div class="productlines__imgsmall"><img src="../assets/img/welcome_sm.webp" alt=""></div>
                <div class="productlines__imgsmall"><img src="../assets/img/welcome_sm.webp" alt=""></div>
                <div class="productlines__count">+12</div>
              </div></a>
            <div id="propertyTo2"></div>
            <div class="productlines__content"> 
              <div class="productlines__subtitle">Особенности</div>
              <ul class="productlines__list"> 
                <li>Современная модель отличающаяся простой сборкой с помощью модульной конструкции</li>
                <li>Качество печати не ухудшается в зависимости от времени работы принтера.</li>
                <li>Изоляция блока нагрева, регулировка прижимающего механизма под разные типы пластиков</li>
              </ul>
            </div>
          </div>
          <div id="propertyFrom2">
            <div class="productlines__property" id="propertyReplace2">
              <div class="productlines__property-row">
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M5.00039 15L4.40039 21M5.00039 15L5.95078 4.54568C5.97888 4.23663 6.238 4 6.54832 4H20.3434C20.6962 4 20.9729 4.30295 20.9409 4.65432L20.05 14.4543C20.0219 14.7634 19.7628 15 19.4525 15H5.00039Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 7.5L16 11.5" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Скорость печати</div>
                    <div class="productlines__property-text">До 90 см3 в час</div>
                  </div>
                </div>
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M16.6667 20H7.33333C6.04467 20 5 18.9927 5 17.75V16.25C5 15.0073 6.04467 14 7.33333 14H16.6667C17.9554 14 19 15.0073 19 16.25V17.75C19 18.9927 17.9554 20 16.6667 20Z" stroke="#71797D" stroke-width="1.5"/>
  <path d="M5 8V6.66667C5 5.19391 6.39289 4 8.11111 4H15.8889C17.6071 4 19 5.19391 19 6.66667V8" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 8L15 10.25M12 14V8V14ZM12 8L9 10.25L12 8Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Регулируемая платформа</div>
                    <div class="productlines__property-text">Не требует доп. настроек</div>
                  </div>
                </div>
                <div class="productlines__property-item">
                  <div class="productlines__property-img">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13.8785 7.69671L15.9998 9.81803C16.3904 10.2085 16.3904 10.8417 15.9998 11.2322L8.36312 18.869C8.26977 18.9623 8.15885 19.0363 8.03677 19.0866L5.54014 20.1146C4.30723 20.6222 3.07433 19.3893 3.58199 18.1564L4.61002 15.6598C4.66029 15.5377 4.73423 15.4268 4.82759 15.3335L12.4643 7.69671C12.8548 7.30618 13.488 7.30618 13.8785 7.69671Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16.0003 5.57542L18.1216 7.69674M13.8789 3.4541L16.0003 5.57542L13.8789 3.4541ZM20.2429 9.81806L18.1216 7.69674L20.2429 9.81806ZM16.0003 5.57542L17.4145 4.16121C17.805 3.77069 18.4382 3.77069 18.8287 4.16121L19.5358 4.86832C19.9263 5.25884 19.9263 5.89201 19.5358 6.28253L18.1216 7.69674L16.0003 5.57542Z" stroke="#71797D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
                  </div>
                  <div class="productlines__property-content"> 
                    <div class="productlines__property-title">Автоматический долив</div>
                    <div class="productlines__property-text">Не требует постоянного контроля</div>
                  </div>
                </div>
              </div>
            </div>
          </div><a class="btn btn--red btn--big" href="#">Узнать подробнее</a>
        </div>
      </div>
    </div>
    <!--	/productlines-->
    <!-- usage-->
    <div class="usage">
      <div class="container">
        <h2 class="title">Сферы применения</h2>
        <div class="row gy-1">
          <div class="col-xxl-3">
            <div class="usage__item usage__item--1">
              <div class="usage__img"> <img src="../assets/img/usage_1.webp" alt=""></div>
              <div class="usage__content"> 
                <h3 class="usage__title">Стоматология</h3>
                <p class="usage__text">Печать позволяет производить стоматологические продукты наивысшего нового стандарта качества, избежав при этом  значительных затрат.</p>
                <ul class="usage__list">
                  <li>зубные протезы</li>
                  <li>виниры</li>
                  <li>временные мосты и коронки</li>
                  <li>хирургические шаблоны</li>
                  <li>элайнеры</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xxl-9">
            <div class="row gy-1">
              <div class="col-12">
                <div class="usage__item usage__item--2">
                  <div class="usage__content"> 
                    <h3 class="usage__title mobile-hide">Автомобилестроение</h3>
                    <h3 class="usage__title mobile-visible">Автомобиле-<br>строение</h3>
                    <p class="usage__text">Использование трехмерной печати на этапе разработки или в технологическом процессе позволяет создавать изделия более высокого качества дешевле и быстрее.</p>
                    <ul class="usage__list">
                      <li>технологическая оснастка</li>
                      <li>формы для литья</li>
                      <li>концепты</li>
                      <li>детали</li>
                      <li>запасные части и механизмы</li>
                      <li>пресс-формы</li>
                    </ul>
                  </div>
                  <div class="usage__img"> <img src="../assets/img/usage_2.webp" alt=""></div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="usage__item usage__item--3">
                  <div class="usage__img"> <img src="../assets/img/usage_3.webp" alt=""></div>
                  <div class="usage__content"> 
                    <h3 class="usage__title">Прототипирование</h3>
                    <p class="usage__text">Перед запуском нового изделия в производство  проводят тестирование опытного прототипа. 3D печать поможет снизить расходы и затраты времени на это.</p>
                    <ul class="usage__list">
                      <li>макеты</li>
                      <li>образцы продукции</li>
                      <li>мастер-модели</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-lg-6">
                <div class="usage__item usage__item--4">
                  <div class="usage__img"> <img src="../assets/img/usage_4.webp" alt=""></div>
                  <div class="usage__content"> 
                    <h3 class="usage__title">Дизайн</h3>
                    <p class="usage__text">В архитектуре и дизайне трехмерные принтеры успешно применяются в основном для создания архитектурных макетов.</p>
                    <ul class="usage__list">
                      <li>макет здания</li>
                      <li>ландшафт</li>
                      <li>элементы интерьера</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--	/usage-->
    <!-- slider-->
    <div class="slider">
      <div class="container"> 
        <div class="block-header">
          <div class="block-header__block">
            <h2 class="title">Статьи и пресс–релизы</h2>
            <div class="block-header__num">+19</div>
          </div>
          <router-link to="/news"><div class="btn btn--black">Все новости</div></router-link>
        </div>
        <!-- <div class="slider__slider"> -->
          <!-- <div id="sliderArticles">
            <div class="swiper-wrapper"> -->
              <swiper
    :slidesPerView="4"
    :spaceBetween="30"
    :pagination="{
      clickable: true,
    }"
    :modules="modules"

  >
                <!-- <article-card v-for="article in 6" :key="article">
                </article-card> -->
                <swiper-slide>
                      <div>
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
                </swiper-slide>
                <swiper-slide>
                      <div>
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
                </swiper-slide>
                <swiper-slide>
                      <div>
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
                </swiper-slide>
                <swiper-slide>
                      <div>
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
                </swiper-slide>
                <swiper-slide>
                      <div>
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
                </swiper-slide>
              </swiper>
            <!-- </div>
          </div> -->
        <!-- </div> -->
      </div>
    </div>
    <!--	/slider-->
    <!-- callback-->
    <callback-window />
    <!--	/callback-->
  </div>
  <!-- modal bootstrap-->
  <div class="modal fade" id="modalCallback">
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" action="#">
        <div class="modal__title">Обратный звонок</div>
        <div class="modal__text">Укажите ваш номер и наш менеджер свяжется с вами для консультации</div>
        <div class="input input--label">
          <input type="text" name="tel">
          <div class="input__label">Ваш номер</div>
        </div>
        <button class="btn btn--red btn--big" type="submit">Отправить заявку</button>
        <div class="modal_close" data-bs-dismiss="modal"></div>
      </form>
    </div>
  </div>
  <!-- /modal bootstrap-->
</template>

<script>
import ArticleCard from "./News/ArticleCard.vue"
import AdvantagesBlock from "./AdvantagesBlock.vue"
import CallbackWindow from "./elements/CallbackWindow.vue"
import SwiperClass, { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

import 'swiper/css'
import 'swiper/css/pagination'

export default {
  name: 'MainPage',
  components: {ArticleCard, AdvantagesBlock, CallbackWindow, Swiper, SwiperSlide },
  props: {
    msg: String
  },
  setup() {
    return {
      modules: [Pagination]
    }
  }
}
</script>
<style scoped>
.inline {
  display: inline-block;
  padding: 10px;
}
.shop {
  height: 480px;
  width: 33%;
  background-image: url(../assets/img/0_2.png);
  background-size: 100% auto;
}
.print {
  height: 480px;
  width: 33%;
  background-image: url(../assets/img/0_1.png);
  background-size: 100% auto;
}
.study {
  height: 480px;
  width: 33%;
  background-image: url(../assets/img/0_3.png);
  background-size: 100% auto;
}
.test_fon {
  height: 200px;
  background-color: rgb(20,203,194);
  background-image: linear-gradient(to top left, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0) calc(50% + 1px));
  background-size: 100% 100%, 50px 50px;
  background-position: left top, left bottom;
  background-repeat: no-repeat;
}
</style>
