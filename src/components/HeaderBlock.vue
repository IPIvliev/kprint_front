<template>
<!-- header-->
<header class="header" id="header">
  <div class="header__container" :class="{open: mainMenuIsOpen}">
    <div class="container d-flex">
      <div class="header__col">
        <div class="header__btn js-menu-btn" :class="{active: mainMenuIsOpen}" data-drop="menuDrop" @click="openMainMenu"></div>
        <nav class="header__menu nout-hide">
          <ul class="header__list"> 
            <li> <router-link to="/">Главная</router-link></li>
            <li class="header__childin" :class="{active: catalogMenuIsOpen}" @click="openCatalogMenu"><a href="#">Каталог
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00033 0.666748C3.95033 0.666748 0.666992 3.95008 0.666992 8.00008C0.666992 12.0501 3.95033 15.3334 8.00033 15.3334C12.0503 15.3334 15.3337 12.0501 15.3337 8.00008C15.3337 3.95008 12.0503 0.666748 8.00033 0.666748ZM5.86699 6.50024C5.77238 6.49915 5.67914 6.52297 5.59664 6.56931C5.51415 6.61565 5.44529 6.68288 5.39699 6.76424C5.35152 6.84329 5.32984 6.93378 5.33457 7.02485C5.3393 7.11591 5.37024 7.20367 5.42366 7.27758L7.55699 10.2776C7.6079 10.3472 7.67467 10.4037 7.75176 10.4425C7.82885 10.4812 7.91406 10.501 8.00033 10.5002C8.0867 10.5011 8.17204 10.4813 8.24926 10.4426C8.32648 10.4039 8.39335 10.3473 8.44433 10.2776L10.5777 7.27758C10.6311 7.20367 10.662 7.11591 10.6667 7.02485C10.6715 6.93378 10.6498 6.84329 10.6043 6.76424C10.556 6.68278 10.487 6.61549 10.4044 6.56914C10.3218 6.5228 10.2284 6.49904 10.1337 6.50024H5.86699Z"></path>
                </svg></a></li>
            <li class="header__list-item-hide"><router-link to="/news">Пресс-центр</router-link></li>
            <li> <router-link to="/contact">Контакты</router-link></li>
          </ul>
        </nav>
        <div class="header__dropmenu nout-hide" :class="{open: catalogMenuIsOpen}" id="headerDropmenu">
          <div class="header__dropmenu-row">
            <div class="header__dropmenu-col"> 
              <div class="header__dropmenu-title">Принтеры</div><a class="header__dropmenu-item" href="#">
                <div class="header__dropmenu-img"> <img src="../assets/img/printer_1.png" alt=""></div>
                <div class="header__dropmenu-subtitle">Kulibin Print<span>Pro1</span></div>
                <div class="header__dropmenu-text">Универсальная модель отличающаяся простой сборкой с помощью модульной конструкции</div></a><a class="header__dropmenu-item" href="#">
                <div class="header__dropmenu-img"> <img src="../assets/img/printer_2.png" alt=""></div>
                <div class="header__dropmenu-subtitle">Kulibin Print<span>Dental</span></div>
                <div class="header__dropmenu-text">Для применения в медицине, стоматологии и множестве других сфер.</div></a>
            </div>
            <div class="header__dropmenu-col"> 
              <div class="header__dropmenu-title">Фотополимеры</div>
              <div class="header__dropmenu-block"> 
                <div class="header__dropmenu-name">Для Стоматологии</div><a class="header__dropmenu-item2" href="#"> 
                  <div class="header__dropmenu-img2"> <img src="../assets/img/polymer.png" alt=""></div>
                  <div class="header__dropmenu-content"> 
                    <div class="header__dropmenu-subtitle2">«Dental FL»</div>
                    <div class="header__dropmenu-text2">Фотополимерная смола  ·  1 кг.</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--grey"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--red"></div>
                  </div></a><a class="header__dropmenu-item2" href="#"> 
                  <div class="header__dropmenu-img2"> <img src="../assets/img/polymer.png" alt=""></div>
                  <div class="header__dropmenu-content"> 
                    <div class="header__dropmenu-subtitle2">«Flex LCD»</div>
                    <div class="header__dropmenu-text2">Фотополимерная смола  ·  1 кг.</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--grey"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--red"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--blue"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--black"></div>
                  </div></a>
              </div>
              <div class="header__dropmenu-block"> 
                <div class="header__dropmenu-name">Конструкторская</div><a class="header__dropmenu-item2" href="#"> 
                  <div class="header__dropmenu-img2"> <img src="../assets/img/polymer.png" alt=""></div>
                  <div class="header__dropmenu-content"> 
                    <div class="header__dropmenu-subtitle2">«Reactive»</div>
                    <div class="header__dropmenu-text2">Фотополимерная смола  ·  1 кг.</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--grey"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--green"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--violet"></div>
                    <div class="header__dropmenu-color">+5</div>
                  </div></a>
              </div>
              <div class="header__dropmenu-block"> 
                <div class="header__dropmenu-name">Специальная</div><a class="header__dropmenu-item2" href="#"> 
                  <div class="header__dropmenu-img2"> <img src="../assets/img/polymer.png" alt=""></div>
                  <div class="header__dropmenu-content"> 
                    <div class="header__dropmenu-subtitle2">«Castable LCD»</div>
                    <div class="header__dropmenu-text2">Фотополимерная смола  ·  1 кг.</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--brown"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--black"></div>
                  </div></a><a class="header__dropmenu-item2" href="#"> 
                  <div class="header__dropmenu-img2"> <img src="../assets/img/polymer.png" alt=""></div>
                  <div class="header__dropmenu-content"> 
                    <div class="header__dropmenu-subtitle2">«Model FL»</div>
                    <div class="header__dropmenu-text2">Фотополимерная смола  ·  1 кг.</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--grey"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--brown"></div>
                  </div></a>
              </div>
            </div>
          </div>
          <div class="header__dropmenu-close js-drop-close" data-drop="headerDropmenu" @click="openCatalogMenu"></div>
        </div>
      </div>
      <div class="header__col"><router-link to="/" class="header__logo"> <img src="../assets/img/logo.svg" alt=""></router-link></div>
      <div class="header__col">
        <div class="header__lang nout-hide">
          <div class="header__langbtn" :class="{active: languageMenuIsOpen}" @click="openLanguageMenu">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_78_1856)">
                <path d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18Z" fill="#F0F0F0"></path>
                <path d="M0.559793 12.1305C0.198 11.1555 0 10.1009 0 9.00005C0 7.89916 0.198 6.84462 0.559793 5.86963H17.4402C17.802 6.84462 18 7.89916 18 9.00005C18 10.1009 17.802 11.1555 17.4402 12.1305L9 12.9131L0.559793 12.1305Z" fill="#0052B4"></path>
                <path d="M8.99973 18C5.13005 18 1.83116 15.5576 0.559528 12.1304H17.4399C16.1683 15.5576 12.8694 18 8.99973 18Z" fill="#D80027"></path>
              </g>
              <defs>
                <clipPath>
                  <rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"></rect>
                </clipPath>
              </defs>
            </svg>RU
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00033 0.666748C3.95033 0.666748 0.666992 3.95008 0.666992 8.00008C0.666992 12.0501 3.95033 15.3334 8.00033 15.3334C12.0503 15.3334 15.3337 12.0501 15.3337 8.00008C15.3337 3.95008 12.0503 0.666748 8.00033 0.666748ZM5.86699 6.50024C5.77238 6.49915 5.67914 6.52297 5.59664 6.56931C5.51415 6.61565 5.44529 6.68288 5.39699 6.76424C5.35152 6.84329 5.32984 6.93378 5.33457 7.02485C5.3393 7.11591 5.37024 7.20367 5.42366 7.27758L7.55699 10.2776C7.6079 10.3472 7.67467 10.4037 7.75176 10.4425C7.82885 10.4812 7.91406 10.501 8.00033 10.5002C8.0867 10.5011 8.17204 10.4813 8.24926 10.4426C8.32648 10.4039 8.39335 10.3473 8.44433 10.2776L10.5777 7.27758C10.6311 7.20367 10.662 7.11591 10.6667 7.02485C10.6715 6.93378 10.6498 6.84329 10.6043 6.76424C10.556 6.68278 10.487 6.61549 10.4044 6.56914C10.3218 6.5228 10.2284 6.49904 10.1337 6.50024H5.86699Z"></path>
            </svg>
          </div>
          <div class="header__langdrop" :class="{open: languageMenuIsOpen}" id="lang"> 
            <ul class="header__langlist"> 
              <li> <a href="#"> 
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_78_1856)">
                      <path d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18Z" fill="#F0F0F0"></path>
                      <path d="M0.559793 12.1305C0.198 11.1555 0 10.1009 0 9.00005C0 7.89916 0.198 6.84462 0.559793 5.86963H17.4402C17.802 6.84462 18 7.89916 18 9.00005C18 10.1009 17.802 11.1555 17.4402 12.1305L9 12.9131L0.559793 12.1305Z" fill="#0052B4"></path>
                      <path d="M8.99973 18C5.13005 18 1.83116 15.5576 0.559528 12.1304H17.4399C16.1683 15.5576 12.8694 18 8.99973 18Z" fill="#D80027"></path>
                    </g>
                    <defs>
                      <clipPath>
                        <rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"></rect>
                      </clipPath>
                    </defs>
                  </svg>Русский</a></li>
              <li> <a href="#"> 
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_78_1898)">
                      <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#F0F0F0"></path>
                      <path d="M8.60889 9.00018H18.0002C18.0002 8.18786 17.8919 7.40092 17.6901 6.65234H8.60889V9.00018Z" fill="#D80027"></path>
                      <path d="M8.60889 4.30438H16.6792C16.1283 3.40537 15.4239 2.61073 14.6025 1.95654H8.60889V4.30438Z" fill="#D80027"></path>
                      <path d="M9.00031 18C11.1184 18 13.0653 17.2679 14.6027 16.0435H3.39795C4.93533 17.2679 6.88218 18 9.00031 18Z" fill="#D80027"></path>
                      <path d="M1.32147 13.696H16.6795C17.1218 12.9743 17.4649 12.1854 17.6905 11.3481H0.310547C0.536145 12.1854 0.879164 12.9743 1.32147 13.696Z" fill="#D80027"></path>
                      <path d="M4.16897 1.40548H4.98913L4.22624 1.95971L4.51765 2.85652L3.75479 2.30228L2.99194 2.85652L3.24366 2.08178C2.57196 2.64129 1.98323 3.29681 1.49808 4.02722H1.76087L1.27526 4.38001C1.1996 4.50622 1.12704 4.63444 1.0575 4.76455L1.28939 5.47826L0.856758 5.16393C0.749215 5.39177 0.650848 5.62475 0.56243 5.86259L0.81791 6.64896H1.76087L0.99798 7.2032L1.28939 8.1L0.526535 7.54576L0.0695742 7.87778C0.0238359 8.24544 0 8.61993 0 9H9C9 4.02947 9 3.44348 9 0C7.22208 0 5.56471 0.515742 4.16897 1.40548ZM4.51765 8.1L3.75479 7.54576L2.99194 8.1L3.28335 7.2032L2.52046 6.64896H3.46342L3.75479 5.75216L4.04617 6.64896H4.98913L4.22624 7.2032L4.51765 8.1ZM4.22624 4.58146L4.51765 5.47826L3.75479 4.92402L2.99194 5.47826L3.28335 4.58146L2.52046 4.02722H3.46342L3.75479 3.13042L4.04617 4.02722H4.98913L4.22624 4.58146ZM7.74591 8.1L6.98305 7.54576L6.22019 8.1L6.51161 7.2032L5.74871 6.64896H6.69168L6.98305 5.75216L7.27443 6.64896H8.21739L7.4545 7.2032L7.74591 8.1ZM7.4545 4.58146L7.74591 5.47826L6.98305 4.92402L6.22019 5.47826L6.51161 4.58146L5.74871 4.02722H6.69168L6.98305 3.13042L7.27443 4.02722H8.21739L7.4545 4.58146ZM7.4545 1.95971L7.74591 2.85652L6.98305 2.30228L6.22019 2.85652L6.51161 1.95971L5.74871 1.40548H6.69168L6.98305 0.508676L7.27443 1.40548H8.21739L7.4545 1.95971Z" fill="#0052B4"></path>
                    </g>
                    <defs>
                      <clipPath>
                        <rect width="18" height="18" fill="white"></rect>
                      </clipPath>
                    </defs>
                  </svg>English</a></li>
            </ul>
          </div>
        </div>
        <div class="header__tel nout-hide">
          <p> <a href="tel:+79601863596">+7 960 186–35–96</a></p>
          <p><span class="header__telback modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">Обратный звонок	</span></p>
        </div>
        <div class="header__regbuttons">
          <router-link class="btn btn--white" to="/login">Вход</router-link>
          <router-link class="btn btn--black" to="/registration">Регистрация</router-link>
          <div class="header__regicon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M10 17L15 12L10 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M15 12H3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </div>
        </div>
      </div>
      <!-- <div class="header__line"></div> -->
    </div>
  </div>
  <!-- menu-->
  <div class="menu" :class="{open: mainMenuIsOpen}" id="menuDrop">
    <nav class="menu__nav">
      <div class="container">
        <div class="row"> 
          <div class="col-md-4">
            <ul class="menu__list">
              <li><router-link to="/">Главная</router-link></li>
              <li><router-link to="/about">О проекте</router-link></li>
              <li><router-link to="/shop">Магазин</router-link></li>
              <li><router-link to="/study">Корпоративный университет</router-link></li>
              <li><router-link to="/print">3D печать на заказ</router-link></li>
              <li><router-link to="/innovations">ИТ услуги</router-link></li>
              <li><router-link to="/gallery">Галерея</router-link></li>
              <li><router-link to="/news">Новости</router-link></li>
              <li><router-link to="/dealers">Дилеры</router-link></li>
              <li><router-link to="/contact">Контакты</router-link></li>
            </ul>
          </div>
          <div class="col-md-7 offset-md-1">
            <div class="menu__row">
              <div class="menu__buttons"> <a class="menu__btn" href="#">
                  <div class="menu__btn-icon"> 
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                    </svg>
                  </div>
                  <div class="menu__btn-content">
                    <div class="menu__btn-title">Где купить?</div>
                    <div class="menu__btn-text">Места продаж нашей продукции</div>
                  </div></a><a class="menu__btn" href="#">
                  <div class="menu__btn-icon"> 
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3998 4.7999C10.3998 5.43642 10.1469 6.04687 9.69686 6.49696C9.24677 6.94705 8.63632 7.1999 7.9998 7.1999C7.36329 7.1999 6.75284 6.94705 6.30275 6.49696C5.85266 6.04687 5.5998 5.43642 5.5998 4.7999C5.5998 4.16338 5.85266 3.55293 6.30275 3.10285C6.75284 2.65276 7.36329 2.3999 7.9998 2.3999C8.63632 2.3999 9.24677 2.65276 9.69686 3.10285C10.1469 3.55293 10.3998 4.16338 10.3998 4.7999ZM14.3998 6.3999C14.3998 6.82425 14.2312 7.23121 13.9312 7.53127C13.6311 7.83133 13.2241 7.9999 12.7998 7.9999C12.3755 7.9999 11.9685 7.83133 11.6684 7.53127C11.3684 7.23121 11.1998 6.82425 11.1998 6.3999C11.1998 5.97556 11.3684 5.56859 11.6684 5.26853C11.9685 4.96847 12.3755 4.7999 12.7998 4.7999C13.2241 4.7999 13.6311 4.96847 13.9312 5.26853C14.2312 5.56859 14.3998 5.97556 14.3998 6.3999ZM11.1998 11.9999C11.1998 11.1512 10.8627 10.3373 10.2625 9.73716C9.66243 9.13704 8.8485 8.7999 7.9998 8.7999C7.15111 8.7999 6.33718 9.13704 5.73706 9.73716C5.13695 10.3373 4.7998 11.1512 4.7998 11.9999V13.3999C4.7998 13.9522 5.24752 14.3999 5.7998 14.3999H10.1998C10.7521 14.3999 11.1998 13.9522 11.1998 13.3999V11.9999ZM4.7998 6.3999C4.7998 6.82425 4.63123 7.23121 4.33118 7.53127C4.03112 7.83133 3.62415 7.9999 3.1998 7.9999C2.77546 7.9999 2.36849 7.83133 2.06843 7.53127C1.76838 7.23121 1.5998 6.82425 1.5998 6.3999C1.5998 5.97556 1.76838 5.56859 2.06843 5.26853C2.36849 4.96847 2.77546 4.7999 3.1998 4.7999C3.62415 4.7999 4.03112 4.96847 4.33118 5.26853C4.63123 5.56859 4.7998 5.97556 4.7998 6.3999ZM13.7998 14.3999C13.2475 14.3999 12.7998 13.9522 12.7998 13.3999V11.9999C12.801 11.1865 12.5944 10.3863 12.1998 9.6751C12.5545 9.58434 12.9252 9.57578 13.2837 9.65008C13.6422 9.72438 13.979 9.87958 14.2684 10.1038C14.5577 10.3281 14.7921 10.6155 14.9535 10.9441C15.1149 11.2727 15.1992 11.6338 15.1998 11.9999V13.3999C15.1998 13.9522 14.7521 14.3999 14.1998 14.3999H13.7998ZM3.7998 9.6751C3.4052 10.3863 3.19868 11.1865 3.1998 11.9999V13.3999C3.1998 13.9522 2.75209 14.3999 2.1998 14.3999H1.7998C1.24752 14.3999 0.799805 13.9522 0.799805 13.3999V11.9999C0.799651 11.6335 0.883375 11.272 1.04456 10.943C1.20575 10.614 1.44012 10.3262 1.72971 10.1018C2.0193 9.87742 2.35643 9.72228 2.71525 9.64832C3.07408 9.57435 3.44507 9.58351 3.7998 9.6751Z"></path>
                    </svg>
                  </div>
                  <div class="menu__btn-content">
                    <div class="menu__btn-title">Стать дилером</div>
                    <div class="menu__btn-text">Присоединяйтесь к нам</div>
                  </div></a></div>
            </div>
            <div class="menu__row">
              <div class="menu__title">Телефон:</div>
              <div class="menu__tel"> <a href="tel:+79601863596">+7 960 186–35–96</a></div>
              <div class="btn btn--red modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">Перезвоните мне</div>
            </div>
            <div class="menu__row">
              <div class="menu__title">Подпишитесь на нас:</div>
              <div class="d-flex justify-content-between">
                <div class="menu__social"> <a href="#"> 
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.6677 16.7028V25.4076H14.0661V16.7031H12.2667V13.7034H14.0661V11.9024C14.0661 9.45519 15.0821 8 17.9688 8H20.3721V11.0001H18.8699C17.7462 11.0001 17.6718 11.4193 17.6718 12.2017L17.6677 13.7031H20.3891L20.0707 16.7028H17.6677Z"></path>
                    </svg></a><a href="#"> 
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.3027 21.0508C17.1449 21.2171 16.8369 21.2507 16.8369 21.2507H15.8169C15.8169 21.2507 13.5665 21.3835 11.584 19.358C9.42202 17.1481 7.51299 12.7637 7.51299 12.7637C7.51299 12.7637 7.4028 12.4761 7.52217 12.3376C7.65656 12.1811 8.02301 12.1713 8.02301 12.1713L10.4613 12.1557C10.4613 12.1557 10.6908 12.1926 10.8553 12.3114C10.9913 12.4097 11.0673 12.5924 11.0673 12.5924C11.0673 12.5924 11.4613 13.5708 11.983 14.4557C13.0022 16.1837 13.4763 16.5615 13.8219 16.3763C14.3261 16.1067 14.175 13.9338 14.175 13.9338C14.175 13.9338 14.1842 13.1455 13.9212 12.794C13.7175 12.522 13.3336 12.4425 13.1641 12.4204C13.0264 12.4024 13.2518 12.0894 13.5439 11.9492C13.983 11.7387 14.7576 11.7264 15.6733 11.7354C16.387 11.7428 16.5924 11.7862 16.8712 11.8526C17.5182 12.0058 17.498 12.497 17.4544 13.5571C17.4414 13.8742 17.4263 14.2421 17.4263 14.6671C17.4263 14.7626 17.4234 14.8644 17.4205 14.9691C17.4054 15.5122 17.388 16.1342 17.7526 16.3656C17.9396 16.4836 18.3962 16.3828 19.539 14.4786C20.0807 13.5757 20.4864 12.5146 20.4864 12.5146C20.4864 12.5146 20.5757 12.3253 20.7134 12.2442C20.8545 12.1615 21.0448 12.1869 21.0448 12.1869L23.6108 12.1713C23.6108 12.1713 24.3821 12.0803 24.5064 12.4228C24.6375 12.7809 24.2185 13.6183 23.17 14.9899C22.1755 16.2914 21.6915 16.7706 21.736 17.1943C21.7684 17.504 22.083 17.7841 22.6867 18.3338C23.947 19.4823 24.2848 20.0866 24.366 20.2318C24.3727 20.2438 24.3777 20.2527 24.3812 20.2585C24.9463 21.1786 23.7543 21.2507 23.7543 21.2507L21.4747 21.2819C21.4747 21.2819 20.9855 21.3769 20.3411 20.9426C20.0036 20.7154 19.6737 20.3441 19.3595 19.9905C18.8797 19.4506 18.4365 18.9517 18.0581 19.0696C17.4229 19.2678 17.4421 20.6108 17.4421 20.6108C17.4421 20.6108 17.4471 20.8984 17.3027 21.0508Z"></path>
                    </svg></a><a href="#"> 
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM22.6677 10.4995C23.402 10.7011 23.9804 11.2948 24.1766 12.0488C24.5333 13.4154 24.5333 16.2667 24.5333 16.2667C24.5333 16.2667 24.5333 19.1179 24.1766 20.4845C23.9804 21.2385 23.402 21.8323 22.6677 22.0339C21.3369 22.4 16 22.4 16 22.4C16 22.4 10.663 22.4 9.33213 22.0339C8.59778 21.8323 8.01945 21.2385 7.82319 20.4845C7.46663 19.1179 7.46663 16.2667 7.46663 16.2667C7.46663 16.2667 7.46663 13.4154 7.82319 12.0488C8.01945 11.2948 8.59778 10.7011 9.33213 10.4995C10.663 10.1333 16 10.1333 16 10.1333C16 10.1333 21.3369 10.1333 22.6677 10.4995Z"></path>
                      <path d="M14.3999 19.2V13.8667L18.6666 16.5335L14.3999 19.2Z"></path>
                    </svg></a></div>
                <div class="header__lang nout-visible">
                  <div class="header__langbtn js-drop-btn" data-drop="langMob">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clip-path="url(#clip0_78_1856)">
                        <path d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18Z" fill="#F0F0F0"></path>
                        <path d="M0.559793 12.1305C0.198 11.1555 0 10.1009 0 9.00005C0 7.89916 0.198 6.84462 0.559793 5.86963H17.4402C17.802 6.84462 18 7.89916 18 9.00005C18 10.1009 17.802 11.1555 17.4402 12.1305L9 12.9131L0.559793 12.1305Z" fill="#0052B4"></path>
                        <path d="M8.99973 18C5.13005 18 1.83116 15.5576 0.559528 12.1304H17.4399C16.1683 15.5576 12.8694 18 8.99973 18Z" fill="#D80027"></path>
                      </g>
                      <defs>
                        <clipPath>
                          <rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"></rect>
                        </clipPath>
                      </defs>
                    </svg>RU
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00033 0.666748C3.95033 0.666748 0.666992 3.95008 0.666992 8.00008C0.666992 12.0501 3.95033 15.3334 8.00033 15.3334C12.0503 15.3334 15.3337 12.0501 15.3337 8.00008C15.3337 3.95008 12.0503 0.666748 8.00033 0.666748ZM5.86699 6.50024C5.77238 6.49915 5.67914 6.52297 5.59664 6.56931C5.51415 6.61565 5.44529 6.68288 5.39699 6.76424C5.35152 6.84329 5.32984 6.93378 5.33457 7.02485C5.3393 7.11591 5.37024 7.20367 5.42366 7.27758L7.55699 10.2776C7.6079 10.3472 7.67467 10.4037 7.75176 10.4425C7.82885 10.4812 7.91406 10.501 8.00033 10.5002C8.0867 10.5011 8.17204 10.4813 8.24926 10.4426C8.32648 10.4039 8.39335 10.3473 8.44433 10.2776L10.5777 7.27758C10.6311 7.20367 10.662 7.11591 10.6667 7.02485C10.6715 6.93378 10.6498 6.84329 10.6043 6.76424C10.556 6.68278 10.487 6.61549 10.4044 6.56914C10.3218 6.5228 10.2284 6.49904 10.1337 6.50024H5.86699Z"></path>
                    </svg>
                  </div>
                  <div class="header__langdrop" id="langMob"> 
                    <ul class="header__langlist"> 
                        <li>
                          <a href="#"> 
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_78_1856)">
                                <path d="M9 18C4.02944 18 0 13.9706 0 9C0 4.02944 4.02944 0 9 0C13.9706 0 18 4.02944 18 9C18 13.9706 13.9706 18 9 18Z" fill="#F0F0F0"></path>
                                <path d="M0.559793 12.1305C0.198 11.1555 0 10.1009 0 9.00005C0 7.89916 0.198 6.84462 0.559793 5.86963H17.4402C17.802 6.84462 18 7.89916 18 9.00005C18 10.1009 17.802 11.1555 17.4402 12.1305L9 12.9131L0.559793 12.1305Z" fill="#0052B4"></path>
                                <path d="M8.99973 18C5.13005 18 1.83116 15.5576 0.559528 12.1304H17.4399C16.1683 15.5576 12.8694 18 8.99973 18Z" fill="#D80027"></path>
                              </g>
                              <defs>
                                <clipPath>
                                  <rect width="18" height="18" fill="white" transform="matrix(-1 0 0 1 18 0)"></rect>
                                </clipPath>
                              </defs>
                            </svg>
                            Русский
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clip-path="url(#clip0_78_1898)">
                                <path d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18Z" fill="#F0F0F0"/>
                                <path d="M8.60889 9.00018H18.0002C18.0002 8.18786 17.8919 7.40092 17.6901 6.65234H8.60889V9.00018Z" fill="#D80027"/>
                                <path d="M8.60889 4.30438H16.6792C16.1283 3.40537 15.4239 2.61073 14.6025 1.95654H8.60889V4.30438Z" fill="#D80027"/>
                                <path d="M9.00031 18C11.1184 18 13.0653 17.2679 14.6027 16.0435H3.39795C4.93533 17.2679 6.88218 18 9.00031 18Z" fill="#D80027"/>
                                <path d="M1.32147 13.696H16.6795C17.1218 12.9743 17.4649 12.1854 17.6905 11.3481H0.310547C0.536145 12.1854 0.879164 12.9743 1.32147 13.696Z" fill="#D80027"/>
                                <path d="M4.16897 1.40548H4.98913L4.22624 1.95971L4.51765 2.85652L3.75479 2.30228L2.99194 2.85652L3.24366 2.08178C2.57196 2.64129 1.98323 3.29681 1.49808 4.02722H1.76087L1.27526 4.38001C1.1996 4.50622 1.12704 4.63444 1.0575 4.76455L1.28939 5.47826L0.856758 5.16393C0.749215 5.39177 0.650848 5.62475 0.56243 5.86259L0.81791 6.64896H1.76087L0.99798 7.2032L1.28939 8.1L0.526535 7.54576L0.0695742 7.87778C0.0238359 8.24544 0 8.61993 0 9H9C9 4.02947 9 3.44348 9 0C7.22208 0 5.56471 0.515742 4.16897 1.40548ZM4.51765 8.1L3.75479 7.54576L2.99194 8.1L3.28335 7.2032L2.52046 6.64896H3.46342L3.75479 5.75216L4.04617 6.64896H4.98913L4.22624 7.2032L4.51765 8.1ZM4.22624 4.58146L4.51765 5.47826L3.75479 4.92402L2.99194 5.47826L3.28335 4.58146L2.52046 4.02722H3.46342L3.75479 3.13042L4.04617 4.02722H4.98913L4.22624 4.58146ZM7.74591 8.1L6.98305 7.54576L6.22019 8.1L6.51161 7.2032L5.74871 6.64896H6.69168L6.98305 5.75216L7.27443 6.64896H8.21739L7.4545 7.2032L7.74591 8.1ZM7.4545 4.58146L7.74591 5.47826L6.98305 4.92402L6.22019 5.47826L6.51161 4.58146L5.74871 4.02722H6.69168L6.98305 3.13042L7.27443 4.02722H8.21739L7.4545 4.58146ZM7.4545 1.95971L7.74591 2.85652L6.98305 2.30228L6.22019 2.85652L6.51161 1.95971L5.74871 1.40548H6.69168L6.98305 0.508676L7.27443 1.40548H8.21739L7.4545 1.95971Z" fill="#0052B4"/>
                              </g>
                              <defs>
                                <clipPath>
                                <rect width="18" height="18" fill="white"/>
                                </clipPath>
                              </defs>
                            </svg>
                            English
                          </a>
                        </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <div class="menu__over" id="menu-over"></div>
  </div>
  <!-- /menu-->
</header>
<!-- /header-->
</template>

<script>

export default {
  data() {
    return {
      mainMenuIsOpen: false,
      catalogMenuIsOpen: false,
      languageMenuIsOpen: false
    }
  },
  methods: {
    openMainMenu() {
      this.mainMenuIsOpen =! this.mainMenuIsOpen
      this.catalogMenuIsOpen = false
      this.languageMenuIsOpen = false
    },
    openCatalogMenu() {
      this.catalogMenuIsOpen =! this.catalogMenuIsOpen
      this.languageMenuIsOpen = false
      this.mainMenuIsOpen = false
    },
    openLanguageMenu() {
      this.languageMenuIsOpen =! this.languageMenuIsOpen
      this.catalogMenuIsOpen = false
      this.mainMenuIsOpen = false
    },
  }
}
</script>
