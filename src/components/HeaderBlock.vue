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
            <li class="header__list-item-hide"><router-link to="/it-innovations">IT</router-link></li>
            <li class="header__list-item-hide"><router-link to="/news">Пресс-центр</router-link></li>
            <li> <router-link to="/contact">Контакты</router-link></li>
          </ul>
        </nav>
        <div class="header__dropmenu nout-hide" :class="{open: catalogMenuIsOpen}" id="headerDropmenu">
          <div class="header__dropmenu-row">
            <div class="header__dropmenu-col">
              <div class="header__dropmenu-title">Категории магазина</div>
              <router-link
                v-for="(category, index) in catalogDropdownCategories"
                :key="`catalog-category-${category.id || index}`"
                class="header__dropmenu-item"
                :to="shopCategoryRoute(category)"
              >
                <div class="header__dropmenu-img"> <img :src="categoryCardImage(category, index)" :alt="category.title || 'Категория магазина'"></div>
                <div class="header__dropmenu-subtitle">{{ category.title || 'Категория' }}<span>Shop</span></div>
                <div class="header__dropmenu-text">{{ categoryCardDescription(category, index) }}</div>
              </router-link>
            </div>
            <div class="header__dropmenu-col">
              <div class="header__dropmenu-title">Товары</div>
              <div
                v-for="(group, groupIndex) in catalogDropdownProductGroups"
                :key="`catalog-products-group-${groupIndex}`"
                class="header__dropmenu-block"
              >
                <div class="header__dropmenu-name">{{ productGroupTitle(groupIndex) }}</div>
                <router-link
                  v-for="product in group"
                  :key="`catalog-product-${product.id}`"
                  class="header__dropmenu-item2"
                  :to="shopProductRoute(product)"
                >
                  <div class="header__dropmenu-img2"> <img :src="productCardImage(product)" :alt="product.name || 'Товар магазина'"></div>
                  <div class="header__dropmenu-content">
                    <div class="header__dropmenu-subtitle2">{{ product.name || 'Товар' }}</div>
                    <div class="header__dropmenu-text2">{{ productCardMeta(product) }}</div>
                  </div>
                  <div class="header__dropmenu-colors">
                    <div class="header__dropmenu-color header__dropmenu-color--grey"></div>
                    <div class="header__dropmenu-color header__dropmenu-color--red"></div>
                  </div>
                </router-link>
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
          <p> <a :href="mainOfficePhoneHref">{{ mainOfficePhone }}</a></p>
          <p><span class="header__telback modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">Обратный звонок  </span></p>
        </div>
        <router-link
          v-if="showMobileCartButton"
          class="header__cartbtn nout-visible"
          to="/shop/cart"
          aria-label="Cart"
        >
          <img src="/images/icons/cart.svg" width="22" height="22" alt="" />
        </router-link>
        <div class="header__auth-mobile d-xl-none">
          <template v-if="!isLoggedIn">
            <router-link class="header__auth-mobile-link" to="/login">Вход</router-link>
            <router-link class="header__auth-mobile-link header__auth-mobile-link--dark" to="/registration">Регистрация</router-link>
          </template>
          <router-link v-else class="header__auth-mobile-link" to="/panel">Панель</router-link>
        </div>
        <div class="header__regbuttons">
          <router-link v-if="!isLoggedIn" class="btn btn--white" to="/login">Вход</router-link>
          <router-link v-else class="btn btn--white" to="/panel">Личный кабинет</router-link>
          <router-link v-if="!isLoggedIn" class="btn btn--black" to="/registration">Регистрация</router-link>
          <router-link
            class="header__regicon"
            :to="isLoggedIn ? '/panel' : '/login'"
            :aria-label="isLoggedIn ? 'Панель' : 'Вход'"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H15" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M10 17L15 12L10 7" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              <path d="M15 12H3" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </router-link>
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
              <li><router-link to="/it-innovations">ИТ услуги</router-link></li>
              <li><router-link to="/gallery">Галерея</router-link></li>
              <li><router-link to="/news">Новости</router-link></li>
              <li><router-link to="/dealers">Дилеры</router-link></li>
              <li><router-link to="/contact">Контакты</router-link></li>
            </ul>
          </div>
          <div class="col-md-7 offset-md-1">
            <div class="menu__row">
              <div class="menu__buttons"> <router-link class="menu__btn" to="/contact">
                  <div class="menu__btn-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M2.4001 0.800049C2.18792 0.800049 1.98444 0.884334 1.83441 1.03436C1.68438 1.18439 1.6001 1.38788 1.6001 1.60005C1.6001 1.81222 1.68438 2.01571 1.83441 2.16573C1.98444 2.31576 2.18792 2.40005 2.4001 2.40005H3.3761L3.6201 3.37765C3.62252 3.38891 3.62519 3.40011 3.6281 3.41125L4.7145 7.75525L4.0001 8.46885C2.9921 9.47685 3.7057 11.2 5.1313 11.2H12.0001C12.2123 11.2 12.4158 11.1158 12.5658 10.9657C12.7158 10.8157 12.8001 10.6122 12.8001 10.4C12.8001 10.1879 12.7158 9.98439 12.5658 9.83436C12.4158 9.68433 12.2123 9.60005 12.0001 9.60005H5.1313L5.9313 8.80005H11.2001C11.3486 8.79997 11.4942 8.75854 11.6205 8.68041C11.7468 8.60227 11.8489 8.49051 11.9153 8.35765L14.3153 3.55765C14.3762 3.43571 14.405 3.30023 14.3989 3.16405C14.3927 3.02788 14.3519 2.89553 14.2803 2.77956C14.2086 2.6636 14.1085 2.56786 13.9895 2.50144C13.8704 2.43502 13.7364 2.40012 13.6001 2.40005H5.0241L4.7761 1.40565C4.73276 1.23265 4.63286 1.0791 4.49226 0.969373C4.35167 0.859651 4.17844 0.800054 4.0001 0.800049H2.4001ZM12.8001 13.2C12.8001 13.5183 12.6737 13.8235 12.4486 14.0486C12.2236 14.2736 11.9184 14.4 11.6001 14.4C11.2818 14.4 10.9766 14.2736 10.7516 14.0486C10.5265 13.8235 10.4001 13.5183 10.4001 13.2C10.4001 12.8818 10.5265 12.5766 10.7516 12.3515C10.9766 12.1265 11.2818 12 11.6001 12C11.9184 12 12.2236 12.1265 12.4486 12.3515C12.6737 12.5766 12.8001 12.8818 12.8001 13.2ZM5.2001 14.4C5.51836 14.4 5.82358 14.2736 6.04863 14.0486C6.27367 13.8235 6.4001 13.5183 6.4001 13.2C6.4001 12.8818 6.27367 12.5766 6.04863 12.3515C5.82358 12.1265 5.51836 12 5.2001 12C4.88184 12 4.57661 12.1265 4.35157 12.3515C4.12653 12.5766 4.0001 12.8818 4.0001 13.2C4.0001 13.5183 4.12653 13.8235 4.35157 14.0486C4.57661 14.2736 4.88184 14.4 5.2001 14.4Z"></path>
                    </svg>
                  </div>
                  <div class="menu__btn-content">
                    <div class="menu__btn-title">Где купить?</div>
                    <div class="menu__btn-text">Места продаж нашей продукции</div>
                  </div></router-link><router-link class="menu__btn" to="/dealers">
                  <div class="menu__btn-icon">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.3998 4.7999C10.3998 5.43642 10.1469 6.04687 9.69686 6.49696C9.24677 6.94705 8.63632 7.1999 7.9998 7.1999C7.36329 7.1999 6.75284 6.94705 6.30275 6.49696C5.85266 6.04687 5.5998 5.43642 5.5998 4.7999C5.5998 4.16338 5.85266 3.55293 6.30275 3.10285C6.75284 2.65276 7.36329 2.3999 7.9998 2.3999C8.63632 2.3999 9.24677 2.65276 9.69686 3.10285C10.1469 3.55293 10.3998 4.16338 10.3998 4.7999ZM14.3998 6.3999C14.3998 6.82425 14.2312 7.23121 13.9312 7.53127C13.6311 7.83133 13.2241 7.9999 12.7998 7.9999C12.3755 7.9999 11.9685 7.83133 11.6684 7.53127C11.3684 7.23121 11.1998 6.82425 11.1998 6.3999C11.1998 5.97556 11.3684 5.56859 11.6684 5.26853C11.9685 4.96847 12.3755 4.7999 12.7998 4.7999C13.2241 4.7999 13.6311 4.96847 13.9312 5.26853C14.2312 5.56859 14.3998 5.97556 14.3998 6.3999ZM11.1998 11.9999C11.1998 11.1512 10.8627 10.3373 10.2625 9.73716C9.66243 9.13704 8.8485 8.7999 7.9998 8.7999C7.15111 8.7999 6.33718 9.13704 5.73706 9.73716C5.13695 10.3373 4.7998 11.1512 4.7998 11.9999V13.3999C4.7998 13.9522 5.24752 14.3999 5.7998 14.3999H10.1998C10.7521 14.3999 11.1998 13.9522 11.1998 13.3999V11.9999ZM4.7998 6.3999C4.7998 6.82425 4.63123 7.23121 4.33118 7.53127C4.03112 7.83133 3.62415 7.9999 3.1998 7.9999C2.77546 7.9999 2.36849 7.83133 2.06843 7.53127C1.76838 7.23121 1.5998 6.82425 1.5998 6.3999C1.5998 5.97556 1.76838 5.56859 2.06843 5.26853C2.36849 4.96847 2.77546 4.7999 3.1998 4.7999C3.62415 4.7999 4.03112 4.96847 4.33118 5.26853C4.63123 5.56859 4.7998 5.97556 4.7998 6.3999ZM13.7998 14.3999C13.2475 14.3999 12.7998 13.9522 12.7998 13.3999V11.9999C12.801 11.1865 12.5944 10.3863 12.1998 9.6751C12.5545 9.58434 12.9252 9.57578 13.2837 9.65008C13.6422 9.72438 13.979 9.87958 14.2684 10.1038C14.5577 10.3281 14.7921 10.6155 14.9535 10.9441C15.1149 11.2727 15.1992 11.6338 15.1998 11.9999V13.3999C15.1998 13.9522 14.7521 14.3999 14.1998 14.3999H13.7998ZM3.7998 9.6751C3.4052 10.3863 3.19868 11.1865 3.1998 11.9999V13.3999C3.1998 13.9522 2.75209 14.3999 2.1998 14.3999H1.7998C1.24752 14.3999 0.799805 13.9522 0.799805 13.3999V11.9999C0.799651 11.6335 0.883375 11.272 1.04456 10.943C1.20575 10.614 1.44012 10.3262 1.72971 10.1018C2.0193 9.87742 2.35643 9.72228 2.71525 9.64832C3.07408 9.57435 3.44507 9.58351 3.7998 9.6751Z"></path>
                    </svg>
                  </div>
                  <div class="menu__btn-content">
                    <div class="menu__btn-title">Стать дилером</div>
                    <div class="menu__btn-text">Присоединяйтесь к нам</div>
                  </div></router-link></div>
            </div>
            <div class="menu__row">
              <div class="menu__title">Телефон:</div>
              <div class="menu__tel"> <a :href="mainOfficePhoneHref">{{ mainOfficePhone }}</a></div>
              <div class="btn btn--red modal-trigger" data-bs-toggle="modal" data-bs-target="#modalCallback">Перезвоните мне</div>
            </div>
            <div class="menu__row">
              <div class="menu__title">Подпишитесь на нас:</div>
              <div class="d-flex justify-content-between">
                <div class="menu__social">
                  <a href="https://vk.com/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="VK">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="10" font-family="Arial, sans-serif" font-weight="700" fill="#232629">VK</text>
                    </svg>
                  </a>
                  <a href="https://dzen.ru/gorky_liquid" target="_blank" rel="noopener noreferrer" aria-label="Dzen">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">DZ</text>
                    </svg>
                  </a>
                  <a href="https://ok.ru/group/70000046325756" target="_blank" rel="noopener noreferrer" aria-label="Odnoklassniki">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="16" cy="16" r="16" fill="#EFEFF0"></circle>
                      <text x="16" y="20" text-anchor="middle" font-size="9" font-family="Arial, sans-serif" font-weight="700" fill="#232629">OK</text>
                    </svg>
                  </a>
                </div>
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
import { fetchShopCategories, fetchShopProducts } from '@/services/catalog.service'
import { DEFAULT_MAIN_OFFICE_PHONE, getContactOfficesData, phoneToTelHref } from '@/services/contact-office.service'
import printerFallbackOne from '@/assets/img/printer_1.png'
import printerFallbackTwo from '@/assets/img/printer_2.png'
import productFallbackImage from '@/assets/img/polymer.png'

export default {
  created () {
    this.loadMainOfficePhone()
    this.loadCatalogDropdownData()
  },
  data () {
    return {
      mainMenuIsOpen: false,
      catalogMenuIsOpen: false,
      languageMenuIsOpen: false,
      mainOfficePhone: DEFAULT_MAIN_OFFICE_PHONE,
      catalogCategories: [],
      catalogProducts: [],
      catalogFallbackCategories: [
        {
          id: null,
          title: 'Материалы для печати',
          description: 'Подбор ассортимента материалов для производственных и лабораторных задач.'
        },
        {
          id: null,
          title: 'Оборудование и комплектующие',
          description: 'Позиции каталога для запуска и развития аддитивного производства.'
        }
      ],
      catalogFallbackProducts: [
        { id: 9001, name: 'Товар каталога', article: '', price: '', category: null, photo: null },
        { id: 9002, name: 'Позиция магазина', article: '', price: '', category: null, photo: null },
        { id: 9003, name: 'Рекомендованный товар', article: '', price: '', category: null, photo: null },
        { id: 9004, name: 'Материал для печати', article: '', price: '', category: null, photo: null },
        { id: 9005, name: 'Сервисная позиция', article: '', price: '', category: null, photo: null },
        { id: 9006, name: 'Новая позиция', article: '', price: '', category: null, photo: null }
      ]
    }
  },
  computed: {
    isLoggedIn () {
      return this.$store?.state?.auth?.status?.loggedIn === true
    },
    showMobileCartButton () {
      const hiddenRoutes = ['Cart', 'ShopOrder']
      return !hiddenRoutes.includes(this.$route?.name)
    },
    mainOfficePhoneHref () {
      return phoneToTelHref(this.mainOfficePhone)
    },
    catalogDropdownCategories () {
      return this.catalogCategories.length ? this.catalogCategories : this.catalogFallbackCategories
    },
    catalogDropdownProducts () {
      return this.catalogProducts.length ? this.catalogProducts : this.catalogFallbackProducts
    },
    catalogDropdownProductGroups () {
      const items = this.catalogDropdownProducts
      const groups = []
      for (let index = 0; index < items.length; index += 2) {
        groups.push(items.slice(index, index + 2))
      }
      return groups
    }
  },
  methods: {
    async loadMainOfficePhone () {
      try {
        const payload = await getContactOfficesData()
        const phone = String(payload?.main_office_phone || '').trim()
        if (phone) {
          this.mainOfficePhone = phone
        }
      } catch (error) {
        // keep default phone when contact offices API is unavailable
      }
    },
    async loadCatalogDropdownData () {
      try {
        const [categoriesResponse, productsResponse] = await Promise.all([
          fetchShopCategories(),
          fetchShopProducts()
        ])

        const categories = Array.isArray(categoriesResponse?.data)
          ? categoriesResponse.data.filter((item) => item && item.id && item.title)
          : []
        const products = Array.isArray(productsResponse?.data)
          ? productsResponse.data.filter((item) => item && item.id && item.name)
          : []

        this.catalogCategories = this.sampleItems(categories, 2)
        this.catalogProducts = this.sampleItems(products, 6)
      } catch (error) {
        this.catalogCategories = []
        this.catalogProducts = []
      }
    },
    sampleItems (items, count) {
      const list = Array.isArray(items) ? [...items] : []
      for (let index = list.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1))
        const temporary = list[index]
        list[index] = list[swapIndex]
        list[swapIndex] = temporary
      }
      return list.slice(0, Math.min(count, list.length))
    },
    resolveMediaUrl (path, fallback = '') {
      const raw = String(path || '').trim()
      if (!raw) {
        return fallback
      }
      if (raw.startsWith('http://') || raw.startsWith('https://')) {
        return raw
      }
      const base = String(process.env.VUE_APP_API_BASE || '').trim().replace(/\/+$/, '')
      if (!base) {
        return raw.startsWith('/') ? raw : `/${raw}`
      }
      return raw.startsWith('/') ? `${base}${raw}` : `${base}/${raw}`
    },
    shopCategoryRoute (category) {
      const categoryId = Number(category?.id || 0)
      if (!categoryId) {
        return '/shop'
      }
      return `/shop/categories/${categoryId}/showcase`
    },
    shopProductRoute (product) {
      const productId = Number(product?.id || 0)
      const categoryId = Number(product?.category || 0)
      if (!productId || !categoryId) {
        return '/shop'
      }
      return `/shop/categories/${categoryId}/${productId}`
    },
    categoryCardImage (category, index) {
      const fallback = index % 2 === 0 ? printerFallbackOne : printerFallbackTwo
      return this.resolveMediaUrl(category?.photo, fallback)
    },
    productCardImage (product) {
      return this.resolveMediaUrl(product?.photo, productFallbackImage)
    },
    categoryCardDescription (category, index) {
      const description = String(category?.description || '').trim()
      if (description) {
        return description.length > 110 ? `${description.slice(0, 107)}...` : description
      }
      if (index === 0) {
        return 'Подбор решений и материалов для производственных задач.'
      }
      return 'Позиции каталога для поставок и комплексного сопровождения.'
    },
    productCardMeta (product) {
      const article = String(product?.article || '').trim()
      const price = this.productPrice(product?.price)
      if (article && price) {
        return `Артикул ${article} · ${price}`
      }
      if (article) {
        return `Артикул ${article}`
      }
      if (price) {
        return price
      }
      return 'Товар из каталога магазина'
    },
    productPrice (raw) {
      const value = Number(raw)
      if (!Number.isFinite(value)) {
        return ''
      }
      return `${value.toLocaleString('ru-RU')} руб.`
    },
    productGroupTitle (groupIndex) {
      const titles = ['Рекомендованные товары', 'Популярные позиции', 'Новые поступления']
      return titles[groupIndex] || 'Позиции каталога'
    },
    openMainMenu () {
      this.mainMenuIsOpen = !this.mainMenuIsOpen
      this.catalogMenuIsOpen = false
      this.languageMenuIsOpen = false
    },
    openCatalogMenu () {
      this.catalogMenuIsOpen = !this.catalogMenuIsOpen
      this.languageMenuIsOpen = false
      this.mainMenuIsOpen = false
    },
    openLanguageMenu () {
      this.languageMenuIsOpen = !this.languageMenuIsOpen
      this.catalogMenuIsOpen = false
      this.mainMenuIsOpen = false
    }
  }
}
</script>

<style scoped>
.header__cartbtn {
  width: 42px;
  height: 42px;
  margin-right: 12px;
  border-radius: 50%;
  border: 1px solid #d2d3d4;
  background: #f4f7f9;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.header__cartbtn img {
  display: block;
}

.header__auth-mobile {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-right: 12px;
}

.header__auth-mobile-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 34px;
  padding: 0 12px;
  border-radius: 18px;
  border: 1px solid #d2d3d4;
  background: #f4f7f9;
  color: #111;
  font-size: 13px;
  line-height: 1;
  white-space: nowrap;
}

.header__auth-mobile-link--dark {
  background: #111;
  border-color: #111;
  color: #fff;
}
</style>
