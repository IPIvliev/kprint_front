<template>
              <div class="col-xxl-3 col-xl-4 d-none d-xl-block">
                <div class="panel__block panel__block--1" :class="{ 'panel__block--menu-open': newsOpen || galleryOpen || companyOpen || studyOpen || shopOpen || filterOpen || deliveryOpen || printOpen }">
                  <div class="panel__head"><router-link class="panel__profile" to="/panel/edit">
                      <div class="panel__profile-img"> <img :src="profileAvatar" alt=""></div>
                      <div class="panel__profile-content">
                        <div class="panel__profile-title">{{ displayName }}</div>
                        <div class="panel__profile-text">Редактировать профиль</div>
                        <div class="panel__profile-icon">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M3 3C2.73478 3 2.48043 3.10536 2.29289 3.29289C2.10536 3.48043 2 3.73478 2 4V16C2 16.2652 2.10536 16.5196 2.29289 16.7071C2.48043 16.8946 2.73478 17 3 17C3.26522 17 3.51957 16.8946 3.70711 16.7071C3.89464 16.5196 4 16.2652 4 16V4C4 3.73478 3.89464 3.48043 3.70711 3.29289C3.51957 3.10536 3.26522 3 3 3ZM13.293 12.293C13.1108 12.4816 13.01 12.7342 13.0123 12.9964C13.0146 13.2586 13.1198 13.5094 13.3052 13.6948C13.4906 13.8802 13.7414 13.9854 14.0036 13.9877C14.2658 13.99 14.5184 13.8892 14.707 13.707L17.707 10.707C17.8945 10.5195 17.9998 10.2652 17.9998 10C17.9998 9.73484 17.8945 9.48053 17.707 9.293L14.707 6.293C14.6148 6.19749 14.5044 6.12131 14.3824 6.0689C14.2604 6.01649 14.1292 5.9889 13.9964 5.98775C13.8636 5.9866 13.7319 6.0119 13.609 6.06218C13.4861 6.11246 13.3745 6.18671 13.2806 6.2806C13.1867 6.3745 13.1125 6.48615 13.0622 6.60905C13.0119 6.73194 12.9866 6.86362 12.9877 6.9964C12.9889 7.12918 13.0165 7.2604 13.0689 7.3824C13.1213 7.50441 13.1975 7.61475 13.293 7.707L14.586 9H7C6.73478 9 6.48043 9.10536 6.29289 9.29289C6.10536 9.48043 6 9.73478 6 10C6 10.2652 6.10536 10.5196 6.29289 10.7071C6.48043 10.8946 6.73478 11 7 11H14.586L13.293 12.293Z"></path>
                          </svg>
                        </div>
                      </div></router-link></div>
                  <div class="panel__body">

                    <div v-if="isManager" class="panel__mode btn-group" role="group" aria-label="Panel mode">
                      <button
                        type="button"
                        class="btn btn--grayborder"
                        :class="{ active: panelModeSafe === 'user' }"
                        @click="setPanelMode('user')"
                      >
                        Пользователь
                      </button>
                      <button
                        type="button"
                        class="btn btn--grayborder"
                        :class="{ active: panelModeSafe === 'manager' }"
                        @click="setPanelMode('manager')"
                      >
                        Менеджер
                      </button>
                    </div>
                    <ul v-if="panelModeSafe === 'user'" class="panel__menu">
                      <li>
                        <router-link :to="isManager ? '/panel/user' : '/panel'" class="panel__menu-link"><span class="panel__menu-icon">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6.75 15.7501H11.25M6.75 15.7501H5.25C3.59314 15.7501 2.25 14.4069 2.25 12.7501V8.0308C2.25 6.98175 2.79796 6.00891 3.69509 5.46519L7.44509 3.19246C8.40083 2.61325 9.59918 2.61325 10.5549 3.19246L14.3049 5.46519C15.2021 6.00891 15.75 6.98175 15.75 8.0308V12.7501C15.75 14.4069 14.4068 15.7501 12.75 15.7501H11.25H6.75ZM6.75 15.7501V12.7501C6.75 11.5074 7.75732 10.5001 9 10.5001C10.2427 10.5001 11.25 11.5074 11.25 12.7501V15.7501H6.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            </svg></span>Дашборд пользователя</router-link></li>
                      <li>
                        <router-link class="panel__menu-link" to="/panel/shop">
                          <span class="panel__menu-icon">
                <img src="@/assets/img/panel-icons/cart.svg" alt="">
                            </span>
                            Заказы в магазине<span v-if="unpaidShopOrdersCount > 0" class="panel__menu-num">{{ unpaidShopOrdersCount }}</span>
                        </router-link>
                      </li>
                      <li>
                        <router-link class="panel__menu-link" to="/panel/models">
                          <span class="panel__menu-icon">
              <img src="@/assets/img/panel-icons/models.svg" alt="">
                          </span>
                          Заказы на 3Д печать<span v-if="pendingPrintOrdersCount > 0" class="panel__menu-num">{{ pendingPrintOrdersCount }}</span>
                        </router-link>
                      </li>
          <li>
                        <router-link class="panel__menu-link" to="/panel/study">
                            <span class="panel__menu-icon">
                <img src="@/assets/img/panel-icons/study.svg" alt="">
                            </span>
                            Обучение<span v-if="incompleteStudyCoursesCount > 0" class="panel__menu-num">{{ incompleteStudyCoursesCount }}</span>
                        </router-link>
                    </li>
          <!-- <li>
                        <router-link class="panel__menu-link" to="/panel/ears">
                            <span class="panel__menu-icon">
                <img src="@/assets/img/Headset.svg" alt="">
                            </span>
                            Сурдология<span class="panel__menu-num">46</span>
                        </router-link>
                    </li> -->
                    </ul>
                    <ul v-else class="panel__menu panel__menu--manager" style="display: flex; flex-direction: column;">
                      <li style="order: 10;">
                        <router-link class="panel__menu-link" to="/panel/manager" active-class="panel__menu-link--active">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/shop.svg" alt="">
                          </span>
                          &#1044;&#1072;&#1096;&#1073;&#1086;&#1088;&#1076; &#1084;&#1077;&#1085;&#1077;&#1076;&#1078;&#1077;&#1088;&#1072;
                        </router-link>
                      </li>
                      <li style="order: 80;">
                        <router-link class="panel__menu-link" to="/panel/callback/requests" active-class="panel__menu-link--active">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/feedback.svg" alt="">
                          </span>
                          Обращения
                        </router-link>
                      </li>
                      <li style="order: 60;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': galleryOpen }"
                          @click="toggleGalleryMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/categories.svg" alt="">
                          </span>
                          Галерея
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': galleryOpen }">▾</span>
                        </button>
                        <ul v-if="galleryOpen" class="panel__menu-sub">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/gallery/categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/gallery/items" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/products.svg" alt="">
                              </span>
                              Изображения
                            </router-link>
                          </li>
                        </ul>
                      </li>
                      <li style="order: 70;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': companyOpen }"
                          @click="toggleCompanyMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/categories.svg" alt="">
                          </span>
                          Компании
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': companyOpen }">▾</span>
                        </button>
                        <ul v-if="companyOpen" class="panel__menu-sub">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/companies/categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/companies/list" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/products.svg" alt="">
                              </span>
                              Компании
                            </router-link>
                          </li>
                        </ul>
                      </li>
                      <li style="order: 20;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': newsOpen }"
                          @click="toggleNewsMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/news.svg" alt="">
                          </span>
                          Новости
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': newsOpen }">▾</span>
                        </button>
                        <ul v-if="newsOpen" class="panel__menu-sub">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/news/categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/news/articles" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/news.svg" alt="">
                              </span>
                              Статьи
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/news/tags" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/filter.svg" alt="">
                              </span>
                              Тэги
                            </router-link>
                          </li>
                        </ul>
                      </li>
                      <li style="order: 30;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': studyOpen }"
                          @click="toggleStudyMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/study.svg" alt="">
                          </span>
                          Обучение
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': studyOpen }">▾</span>
                        </button>
                        <ul v-show="studyOpen" class="panel__menu" style="padding-left: 18px; margin-top: 8px;">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/enrollments" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/orders.svg" alt="">
                              </span>
                              Ученики
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории курсов
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/courses" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/courses.svg" alt="">
                              </span>
                              Курсы
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/lessons" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/lessons.svg" alt="">
                              </span>
                              Уроки
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/exams" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/filter-list.svg" alt="">
                              </span>
                              Экзамены
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/teachers" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/teachers.svg" alt="">
                              </span>
                              Преподаватели
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/prices" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/prices.svg" alt="">
                              </span>
                              Цены
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/study/feedbacks" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/feedback.svg" alt="">
                              </span>
                              Отзывы
                            </router-link>
                          </li>
                        </ul>
                      </li>
                      <li style="order: 40;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': shopOpen }"
                          @click="toggleShopMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/shop.svg" alt="">
                          </span>
                          Магазин
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': shopOpen }">▾</span>
                        </button>
                        <ul v-if="shopOpen" class="panel__menu-sub">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/shop/categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории магазина
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/shop/products" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/products.svg" alt="">
                              </span>
                              Товары
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/shop/orders" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/orders.svg" alt="">
                              </span>
                              Заказы
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/shop/discounts" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/discounts.svg" alt="">
                              </span>
                              Скидки
                            </router-link>
                          </li>
                          <li>
                            <button
                              type="button"
                              class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                              :class="{ 'panel__menu-link--open': filterOpen }"
                              @click="toggleFilterMenu"
                            >
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/filter.svg" alt="">
                              </span>
                              Фильтрация
                              <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': filterOpen }">▾</span>
                            </button>
                            <ul v-if="filterOpen" class="panel__menu-sub">
                              <li>
                                <router-link class="panel__menu-link" to="/panel/shop/filter-attrs" active-class="panel__menu-link--active">
                                  <span class="panel__menu-icon">
                                    <img src="@/assets/img/panel-icons/filter.svg" alt="">
                                  </span>
                                  Фильтры
                                </router-link>
                              </li>
                              <li>
                                <router-link class="panel__menu-link" to="/panel/shop/filter-attr-list-values" active-class="panel__menu-link--active">
                                  <span class="panel__menu-icon">
                                    <img src="@/assets/img/panel-icons/filter-list.svg" alt="">
                                  </span>
                                  Значения фильтров
                                </router-link>
                              </li>
                              <li>
                                <router-link class="panel__menu-link" to="/panel/shop/filter-attr-values" active-class="panel__menu-link--active">
                                  <span class="panel__menu-icon">
                                    <img src="@/assets/img/panel-icons/filter-values.svg" alt="">
                                  </span>
                                  Атрибуты товаров
                                </router-link>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <button
                              type="button"
                              class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                              :class="{ 'panel__menu-link--open': deliveryOpen }"
                              @click="toggleDeliveryMenu"
                            >
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/delivery.svg" alt="">
                              </span>
                              Доставка
                              <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': deliveryOpen }">▾</span>
                            </button>
                            <ul v-if="deliveryOpen" class="panel__menu-sub">
                              <li>
                                <router-link class="panel__menu-link" to="/panel/shop/pochta-settings" active-class="panel__menu-link--active">
                                  <span class="panel__menu-icon">
                                    <img src="@/assets/img/panel-icons/mail.svg" alt="">
                                  </span>
                                  Настройки Почты России
                                </router-link>
                              </li>
                              <li>
                                <router-link class="panel__menu-link" to="/panel/shop/sdek-settings" active-class="panel__menu-link--active">
                                  <span class="panel__menu-icon">
                                    <img src="@/assets/img/panel-icons/sdek.svg" alt="">
                                  </span>
                                  Настройки СДЭК
                                </router-link>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li style="order: 50;">
                        <button
                          type="button"
                          class="panel__menu-link panel__menu-link--toggle panel__menu-link--flat"
                          :class="{ 'panel__menu-link--open': printOpen }"
                          @click="togglePrintMenu"
                        >
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/panel-icons/models.svg" alt="">
                          </span>
                          Заказы на печать
                          <span class="panel__menu-caret" :class="{ 'panel__menu-caret--open': printOpen }">▾</span>
                        </button>
                        <ul v-if="printOpen" class="panel__menu-sub">
                          <li>
                            <router-link class="panel__menu-link" to="/panel/print/orders" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/orders.svg" alt="">
                              </span>
                              Заказы
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/print/material-categories" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/categories.svg" alt="">
                              </span>
                              Категории
                            </router-link>
                          </li>
                          <li>
                            <router-link class="panel__menu-link" to="/panel/print/materials" active-class="panel__menu-link--active">
                              <span class="panel__menu-icon">
                                <img src="@/assets/img/panel-icons/products.svg" alt="">
                              </span>
                              Материалы
                            </router-link>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div class="panel__footer"> <router-link class="panel__back" to="/">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_78_6362)">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M15.334 7.99992C15.334 12.0499 12.0507 15.3333 8.00065 15.3333C3.95065 15.3333 0.667318 12.0499 0.667318 7.99992C0.667318 3.94992 3.95065 0.666584 8.00065 0.666585C12.0507 0.666585 15.334 3.94992 15.334 7.99992ZM9.50049 10.1333C9.50158 10.2279 9.47776 10.3211 9.43142 10.4036C9.38508 10.4861 9.31785 10.555 9.23649 10.6033C9.15745 10.6487 9.06695 10.6704 8.97589 10.6657C8.88482 10.6609 8.79706 10.63 8.72315 10.5766L5.72315 8.44325C5.65351 8.39234 5.59699 8.32557 5.55827 8.24848C5.51955 8.17139 5.49974 8.08619 5.50049 7.99992C5.49964 7.91354 5.51939 7.8282 5.55812 7.75098C5.59684 7.67377 5.65342 7.6069 5.72315 7.55592L8.72315 5.42258C8.79706 5.36916 8.88482 5.33823 8.97589 5.3335C9.06695 5.32877 9.15745 5.35044 9.23649 5.39592C9.31795 5.44427 9.38524 5.51323 9.43159 5.59586C9.47793 5.67848 9.5017 5.77186 9.50049 5.86658L9.50049 10.1333Z" fill="#D83A56"></path>
                        </g>
                        <defs>
                          <clipPath>
                            <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
                          </clipPath>
                        </defs>
                      </svg>вернуться на сайт</router-link></div>
                </div>
              </div>
</template>

<script>
import { defaultAvatarPlaceholder } from '@/constants/avatarPlaceholders'
import { fetchUserShopOrders } from '@/services/panel.service'
import { fetchPrintOrders } from '@/services/print.service'
import { fetchMyStudyEnrollments } from '@/services/study-learning.service'
import {
  getSafePanelMode,
  getStoredPanelMode,
  isManagerUser,
  PANEL_MODE_EVENT,
  setStoredPanelMode
} from '@/utils/panelMode'

export default {
  data () {
    return {
      panelMode: 'user',
      newsOpen: false,
      galleryOpen: false,
      companyOpen: false,
      studyOpen: false,
      shopOpen: false,
      deliveryOpen: false,
      filterOpen: false,
      printOpen: false,
      unpaidShopOrdersCount: 0,
      pendingPrintOrdersCount: 0,
      incompleteStudyCoursesCount: 0
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.auth.user
    },
    displayName () {
      const user = this.currentUser || {}
      return user.full_name || user.username || user.email || 'User'
    },
    profileAvatar () {
      const user = this.currentUser || {}
      const resolved = this.resolveMediaUrl(user.avatar || '')
      return resolved || defaultAvatarPlaceholder
    },
    isManager () {
      return isManagerUser(this.currentUser)
    },
    panelModeSafe () {
      return this.isManager ? this.panelMode : 'user'
    }
  },
  methods: {
    resolveMediaUrl (path) {
      if (!path) {
        return ''
      }
      if (path.startsWith('http://') || path.startsWith('https://')) {
        return path
      }
      const base = (process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return path
      }
      if (path.startsWith('/')) {
        return `${base}${path}`
      }
      return `${base}/${path}`
    },
    setPanelMode (mode) {
      const normalized = mode === 'manager' ? 'manager' : 'user'
      if (normalized === 'manager' && !this.isManager) {
        return
      }
      this.panelMode = setStoredPanelMode(normalized)
      const targetPath = normalized === 'manager'
        ? '/panel/manager'
        : (this.isManager ? '/panel/user' : '/panel')
      const currentPath = this.$route && this.$route.path ? this.$route.path : ''
      if (currentPath !== targetPath) {
        this.$router.replace(targetPath)
      }
    },
    syncPanelMode () {
      this.panelMode = getSafePanelMode(this.currentUser, getStoredPanelMode())
    },
    toggleNewsMenu () {
      this.newsOpen = !this.newsOpen
    },
    toggleGalleryMenu () {
      this.galleryOpen = !this.galleryOpen
    },
    toggleCompanyMenu () {
      this.companyOpen = !this.companyOpen
    },
    toggleStudyMenu () {
      this.studyOpen = !this.studyOpen
    },
    toggleShopMenu () {
      this.shopOpen = !this.shopOpen
    },
    toggleDeliveryMenu () {
      this.deliveryOpen = !this.deliveryOpen
      if (this.deliveryOpen) {
        this.shopOpen = true
      }
    },
    toggleFilterMenu () {
      this.filterOpen = !this.filterOpen
      if (this.filterOpen) {
        this.shopOpen = true
      }
    },
    togglePrintMenu () {
      this.printOpen = !this.printOpen
    },
    async loadUnpaidShopOrdersCount () {
      if (!this.currentUser) {
        this.unpaidShopOrdersCount = 0
        return
      }
      try {
        const response = await fetchUserShopOrders()
        const orders = Array.isArray(response.data) ? response.data : []
        this.unpaidShopOrdersCount = orders.filter(order => !order.is_paid).length
      } catch (error) {
        this.unpaidShopOrdersCount = 0
      }
    },
    async loadPendingPrintOrdersCount () {
      if (!this.currentUser) {
        this.pendingPrintOrdersCount = 0
        return
      }
      try {
        const response = await fetchPrintOrders({ my: 1 })
        const orders = Array.isArray(response.data) ? response.data : []
        this.pendingPrintOrdersCount = orders.filter(order => order.status !== 'RECEIVED').length
      } catch (error) {
        this.pendingPrintOrdersCount = 0
      }
    },
    countIncompleteStudyCourses (enrollments) {
      return (Array.isArray(enrollments) ? enrollments : []).filter((enrollment) => {
        const certificateIssued = String(enrollment?.certificate_status || '').toLowerCase() === 'issued'
        return !certificateIssued
      }).length
    },
    async loadIncompleteStudyCoursesCount () {
      if (!this.currentUser) {
        this.incompleteStudyCoursesCount = 0
        return
      }
      try {
        const response = await fetchMyStudyEnrollments()
        const enrollments = Array.isArray(response.data) ? response.data : []
        this.incompleteStudyCoursesCount = this.countIncompleteStudyCourses(enrollments)
      } catch (error) {
        this.incompleteStudyCoursesCount = 0
      }
    }
  },
  mounted () {
    this.syncPanelMode()
    this.loadUnpaidShopOrdersCount()
    this.loadPendingPrintOrdersCount()
    this.loadIncompleteStudyCoursesCount()
    if (typeof window !== 'undefined') {
      window.addEventListener(PANEL_MODE_EVENT, this.syncPanelMode)
      window.addEventListener('storage', this.syncPanelMode)
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/study')) {
      this.studyOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/news')) {
      this.newsOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/gallery')) {
      this.galleryOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/companies')) {
      this.companyOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/shop')) {
      this.shopOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/shop/pochta-settings')) {
      this.deliveryOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/shop/sdek-settings')) {
      this.deliveryOpen = true
    }
    if (this.$route && this.$route.path && this.$route.path.includes('/panel/shop/filter-')) {
      this.filterOpen = true
    }
    if (this.$route && this.$route.path && (this.$route.path.includes('/panel/print') || this.$route.path.includes('/panel/models'))) {
      this.printOpen = true
    }
  },
  beforeUnmount () {
    if (typeof window !== 'undefined') {
      window.removeEventListener(PANEL_MODE_EVENT, this.syncPanelMode)
      window.removeEventListener('storage', this.syncPanelMode)
    }
  },
  watch: {
    currentUser () {
      this.syncPanelMode()
      this.loadUnpaidShopOrdersCount()
      this.loadPendingPrintOrdersCount()
      this.loadIncompleteStudyCoursesCount()
    }
  }
}
</script>

<style scoped>
.panel__block--1 {
  height: auto;
  max-height: none;
  overflow: visible;
}

.panel__block--1.panel__block--menu-open {
  max-height: none;
}

.panel__block--1 .panel__body {
  overflow: visible;
}

.panel__block--1 .panel__footer {
  margin-top: auto;
  flex-shrink: 0;
}
</style>
