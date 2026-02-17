<template lang="pug">
<div class="content">
  <!-- contact-->
  <div class="contact">
    <div class="container">
      <h1 class="title">Контакты</h1>
      <div class="row gy-2">
        <div class="col-lg-6 col-xxl-5">
          <div class="contact__title">Адрес:</div>
          <div class="contact__text">
            <p>194100, Российская Федерация,</p>
            <p>г. Москва, Кочновский проезд, д.4, корп. 3</p>
          </div>
          <div class="contact__table">
            <table>
              <tr>
                <td>ОРГН:</td>
                <td> <span class="contact__copy copy-text"> 142300400410</span></td>
              </tr>
              <tr>
                <td>Расчетный счет:</td>
                <td> <span class="contact__copy copy-text">40702810300000001034</span></td>
              </tr>
              <tr>
                <td>ИНН:</td>
                <td> <span class="contact__copy copy-text">74806200522</span></td>
              </tr>
              <tr>
                <td>КПП:</td>
                <td> <span class="contact__copy copy-text">770901001</span></td>
              </tr>
            </table>
          </div>
        </div>
        <div class="col-lg-6 col-xxl-5">
          <div class="contact__row">
            <div class="contact__block">
              <div class="contact__title">Почта для связи с нами:</div>
              <div class="contact__link"><a href="mailto:info@kprint.ru">info@kprint.ru</a></div>
            </div>
            <div class="contact__block">
              <div class="contact__title">Телефон:</div>
              <div class="contact__link"><a href="tel:+79601863596">+7 960 186–35–96</a></div>
              <div class="contact__btn" data-bs-toggle="modal" data-bs-target="#modalCallback">Перезвоните мне</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  /contact-->
  <!-- map-->
  <div class="map">
    <div class="container">
      <div class="map__map" id="googleMap"></div>
    </div>
  </div>
  <!--  /map-->
  <!-- dillers-->
  <div class="dillers">
    <div class="container">
      <div class="dillers__head">
        <h2 class="title">Дилеры</h2>
        <div class="header__lang">
          <div class="header__langbtn js-drop-btn" data-drop="country">
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
            </svg>Россия
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M8.00033 0.666748C3.95033 0.666748 0.666992 3.95008 0.666992 8.00008C0.666992 12.0501 3.95033 15.3334 8.00033 15.3334C12.0503 15.3334 15.3337 12.0501 15.3337 8.00008C15.3337 3.95008 12.0503 0.666748 8.00033 0.666748ZM5.86699 6.50024C5.77238 6.49915 5.67914 6.52297 5.59664 6.56931C5.51415 6.61565 5.44529 6.68288 5.39699 6.76424C5.35152 6.84329 5.32984 6.93378 5.33457 7.02485C5.3393 7.11591 5.37024 7.20367 5.42366 7.27758L7.55699 10.2776C7.6079 10.3472 7.67467 10.4037 7.75176 10.4425C7.82885 10.4812 7.91406 10.501 8.00033 10.5002C8.0867 10.5011 8.17204 10.4813 8.24926 10.4426C8.32648 10.4039 8.39335 10.3473 8.44433 10.2776L10.5777 7.27758C10.6311 7.20367 10.662 7.11591 10.6667 7.02485C10.6715 6.93378 10.6498 6.84329 10.6043 6.76424C10.556 6.68278 10.487 6.61549 10.4044 6.56914C10.3218 6.5228 10.2284 6.49904 10.1337 6.50024H5.86699Z"></path>
            </svg>
          </div>
          <div class="header__langdrop" id="country">
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
                  </svg>Россия</a></li>
              <li> <a href="#">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
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
                  </svg>США</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p class="dillers__text">Cотрудничаем с большим количеством дилеров, которые предлагают наши продукты клиентам по всему миру. </p>
      <div class="row">
        <div class="col-xxl-3 col-lg-4 col-md-6">
          <div class="select select--label">
            <select name="#">
              <option value="#">Москва</option>
              <option value="#">Санкт-Петербург</option>
              <option value="#">Казань</option>
              <option value="#">Екатеринбург</option>
              <option value="#">Ростов</option>
              <option value="#">Пермь</option>
              <option value="#">Махачкала</option>
              <option value="#">Новгород</option>
              <option value="#">Киров</option>
              <option value="#">Москва</option>
              <option value="#">Санкт-Петербург</option>
              <option value="#">Казань</option>
              <option value="#">Екатеринбург</option>
              <option value="#">Ростов</option>
              <option value="#">Пермь</option>
              <option value="#">Махачкала</option>
              <option value="#">Новгород</option>
              <option value="#">Киров</option>
            </select>
            <div class="select__label">Город</div>
          </div>
        </div>
      </div>
      <div class="dillers__slider">
        <div id="sliderDillers">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <!-- dillercard-->
              <div class="dillercard">
                <div class="dillercard__content">
                  <div class="dillercard__title">«DNS»</div>
                  <div class="dillercard__text">г. Москва, ул. Ленинградская, дом 22, корп. 3, строение 2</div>
                  <div class="dillercard__btn"> <span>Найти на карте</span></div>
                </div>
                <div class="dillercard__info">
                  <div class="dillercard__row">
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Телефон:</div><a class="dillercard__link" href="tel:+79601863596">+7 960 186–35–96</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Электронная почта:</div><a class="dillercard__link" href="mailto:partners@dns-shop.ru">partners@dns-shop.ru</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Сайт:</div><a class="dillercard__link" href="https://dns-shop.ru">dns-shop.ru</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--  /dillercard-->
            </div>
            <div class="swiper-slide">
              <!-- dillercard-->
              <div class="dillercard">
                <div class="dillercard__content">
                  <div class="dillercard__title">«Ситилинк»</div>
                  <div class="dillercard__text">г. Москва, Щелковское шоссе, д. 7, стр. 1, этаж 1, пом. 1</div>
                  <div class="dillercard__btn"> <span>Найти на карте</span></div>
                </div>
                <div class="dillercard__info">
                  <div class="dillercard__row">
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Телефон:</div><a class="dillercard__link" href="tel:+78905762286">+7 890 576–22–86</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Электронная почта:</div><a class="dillercard__link" href="mailto:partners@citilink.ru">partners@citilink.ru</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Сайт:</div><a class="dillercard__link" href="https://citilink.ru">citilink.ru</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--  /dillercard-->
            </div>
            <div class="swiper-slide">
              <!-- dillercard-->
              <div class="dillercard">
                <div class="dillercard__content">
                  <div class="dillercard__title">«DNS»</div>
                  <div class="dillercard__text">г. Москва, ул. Ленинградская, дом 22, корп. 3, строение 2</div>
                  <div class="dillercard__btn"> <span>Найти на карте</span></div>
                </div>
                <div class="dillercard__info">
                  <div class="dillercard__row">
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Телефон:</div><a class="dillercard__link" href="tel:+79601863596">+7 960 186–35–96</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Электронная почта:</div><a class="dillercard__link" href="mailto:partners@dns-shop.ru">partners@dns-shop.ru</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Сайт:</div><a class="dillercard__link" href="https://dns-shop.ru">dns-shop.ru</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--  /dillercard-->
            </div>
            <div class="swiper-slide">
              <!-- dillercard-->
              <div class="dillercard">
                <div class="dillercard__content">
                  <div class="dillercard__title">«Ситилинк»</div>
                  <div class="dillercard__text">г. Москва, Щелковское шоссе, д. 7, стр. 1, этаж 1, пом. 1</div>
                  <div class="dillercard__btn"> <span>Найти на карте</span></div>
                </div>
                <div class="dillercard__info">
                  <div class="dillercard__row">
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Телефон:</div><a class="dillercard__link" href="tel:+78905762286">+7 890 576–22–86</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Электронная почта:</div><a class="dillercard__link" href="mailto:partners@citilink.ru">partners@citilink.ru</a>
                    </div>
                    <div class="dillercard__infoblock">
                      <div class="dillercard__name">Сайт:</div><a class="dillercard__link" href="https://citilink.ru">citilink.ru</a>
                    </div>
                  </div>
                </div>
              </div>
              <!--  /dillercard-->
            </div>
          </div>
          <div class="swiper-pagination dillers__pagination"></div>
        </div>
      </div><a class="btn btn--red" href="#">Стать дилером</a>
    </div>
  </div>
  <!--  /dillers-->
  <!-- callback-->
  callback-window
  <!--  /callback-->
</div>

</template>

<script>
import CallbackWindow from './elements/CallbackWindow.vue'

export default {
  name: 'ContactPage',
  components: { CallbackWindow }
}
</script>
