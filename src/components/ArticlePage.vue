<template>

<div class="content">
  <!-- teaser-->
  <div class="teaser">
    <div class="teaser__img"><img :src="image" alt=""></div>
  </div>
  <!--	/teaser-->
  <!-- post-->
  <div class="post">
    <div class="container"> 
      <div class="row"> 
        <div class="col-lg-3 nout-hide">
          <div class="post__sidebar"> <router-link class="post__link" to="/news"> 
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clip-path="url(#clip0_78_2225)">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3333 7.99992C15.3333 12.0499 12.0499 15.3333 7.99992 15.3333C3.94992 15.3333 0.666585 12.0499 0.666585 7.99992C0.666585 3.94992 3.94992 0.666584 7.99992 0.666585C12.0499 0.666585 15.3333 3.94992 15.3333 7.99992ZM9.49976 10.1333C9.50085 10.2279 9.47703 10.3211 9.43069 10.4036C9.38435 10.4861 9.31712 10.555 9.23576 10.6033C9.15672 10.6487 9.06622 10.6704 8.97515 10.6657C8.88409 10.6609 8.79633 10.63 8.72242 10.5766L5.72242 8.44325C5.65278 8.39234 5.59626 8.32557 5.55754 8.24848C5.51882 8.17139 5.49901 8.08619 5.49976 7.99992C5.4989 7.91354 5.51866 7.8282 5.55738 7.75098C5.59611 7.67377 5.65268 7.6069 5.72242 7.55592L8.72242 5.42258C8.79633 5.36916 8.88409 5.33823 8.97515 5.3335C9.06622 5.32877 9.15672 5.35044 9.23576 5.39592C9.31722 5.44427 9.38451 5.51323 9.43086 5.59586C9.4772 5.67848 9.50097 5.77186 9.49976 5.86658L9.49976 10.1333Z" fill="#D83A56"></path>
                </g>
                <defs>
                  <clipPath>
                    <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
                  </clipPath>
                </defs>
              </svg>вернуться к публикациям</router-link>
            <div class="post__dateblock"> 
              <div class="post__daterow">
                <div class="post__datetitle">Дата публикации:</div>
                <div class="post__datetext">{{ articleDate }}</div>
              </div>
              <div class="post__daterow">
                <div class="post__datetitle">Тип публикации:</div>
                <div class="post__datetext">
                  <router-link
                    v-if="articleCategory.slug"
                    class="post__type-link"
                    :to="categoryLink(articleCategory.slug)"
                  >
                    {{ articleCategory.title }}
                  </router-link>
                  <span v-else>{{ articleCategory.title }}</span>
                </div>
              </div>
            </div>
            <div class="post__social"> 
              <div class="post__socialtitle">Поделиться публикацией:</div>
              <ul class="post__sociallist"> 
                <li> <a href="#"> 
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.3027 21.0508C17.1449 21.2171 16.8369 21.2507 16.8369 21.2507H15.8169C15.8169 21.2507 13.5665 21.3835 11.584 19.358C9.42202 17.1481 7.51299 12.7637 7.51299 12.7637C7.51299 12.7637 7.4028 12.4761 7.52217 12.3376C7.65656 12.1811 8.02301 12.1713 8.02301 12.1713L10.4613 12.1557C10.4613 12.1557 10.6908 12.1926 10.8553 12.3114C10.9913 12.4097 11.0673 12.5924 11.0673 12.5924C11.0673 12.5924 11.4613 13.5708 11.983 14.4557C13.0022 16.1837 13.4763 16.5615 13.8219 16.3763C14.3261 16.1067 14.175 13.9338 14.175 13.9338C14.175 13.9338 14.1842 13.1455 13.9212 12.794C13.7175 12.522 13.3336 12.4425 13.1641 12.4204C13.0264 12.4024 13.2518 12.0894 13.5439 11.9492C13.983 11.7387 14.7576 11.7264 15.6733 11.7354C16.387 11.7428 16.5924 11.7862 16.8712 11.8526C17.5182 12.0058 17.498 12.497 17.4544 13.5571C17.4414 13.8742 17.4263 14.2421 17.4263 14.6671C17.4263 14.7626 17.4234 14.8644 17.4205 14.9691C17.4054 15.5122 17.388 16.1342 17.7526 16.3656C17.9396 16.4836 18.3962 16.3828 19.539 14.4786C20.0807 13.5757 20.4864 12.5146 20.4864 12.5146C20.4864 12.5146 20.5757 12.3253 20.7134 12.2442C20.8545 12.1615 21.0448 12.1869 21.0448 12.1869L23.6108 12.1713C23.6108 12.1713 24.3821 12.0803 24.5064 12.4228C24.6375 12.7809 24.2185 13.6183 23.17 14.9899C22.1755 16.2914 21.6915 16.7706 21.736 17.1943C21.7684 17.504 22.083 17.7841 22.6867 18.3338C23.947 19.4823 24.2848 20.0866 24.366 20.2318C24.3727 20.2438 24.3777 20.2527 24.3812 20.2585C24.9463 21.1786 23.7543 21.2507 23.7543 21.2507L21.4747 21.2819C21.4747 21.2819 20.9855 21.3769 20.3411 20.9426C20.0036 20.7154 19.6737 20.3441 19.3595 19.9905C18.8797 19.4506 18.4365 18.9517 18.0581 19.0696C17.4229 19.2678 17.4421 20.6108 17.4421 20.6108C17.4421 20.6108 17.4471 20.8984 17.3027 21.0508Z"></path>
                    </svg></a></li>
                <li> <a href="#"> 
                    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14ZM13.9906 14.2248C16.0551 14.2248 17.7332 12.6046 17.7332 10.6129C17.7332 8.62056 16.0551 7 13.9906 7C11.9266 7 10.248 8.62056 10.248 10.6129C10.248 12.6046 11.9266 14.2248 13.9906 14.2248ZM17.6876 16.3048C17.0109 16.715 16.2762 17.006 15.5144 17.1735L17.6066 19.1933C18.0352 19.6062 18.0352 20.2767 17.6066 20.69C17.1784 21.1033 16.4844 21.1033 16.0567 20.69L13.9997 18.7052L11.9444 20.69C11.7301 20.8965 11.4493 20.9998 11.1684 20.9998C10.8881 20.9998 10.6077 20.8965 10.3934 20.69C9.96525 20.2767 9.96525 19.6066 10.393 19.1933L12.4854 17.1735C11.7236 17.006 10.9889 16.7146 10.3121 16.3048C9.79998 15.9931 9.64614 15.34 9.96883 14.8452C10.2906 14.3498 10.9674 14.2006 11.4804 14.5123C13.0126 15.4427 14.9863 15.4429 16.5194 14.5123C17.0324 14.2006 17.7089 14.3498 18.0314 14.8452C18.3541 15.3396 18.1998 15.9931 17.6876 16.3048Z"></path>
                      <path d="M13.9905 9.11719C14.8451 9.11719 15.5402 9.78794 15.5402 10.6128C15.5402 11.437 14.8451 12.1082 13.9905 12.1082C13.1367 12.1082 12.4409 11.437 12.4409 10.6128C12.4409 9.78794 13.1367 9.11719 13.9905 9.11719Z"></path>
                    </svg></a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-9">
          <h1 class="post__title">{{ article.title }}</h1>
          <div class="post__dateblock nout-visible">
            <div class="post__daterow">
              <div class="post__datetitle">Дата публикации:</div>
              <div class="post__datetext">{{ articleDate }}</div>
            </div>
            <div class="post__daterow">
              <div class="post__datetitle">Тип публикации:</div>
              <div class="post__datetext">
                <router-link
                  v-if="articleCategory.slug"
                  class="post__type-link"
                  :to="categoryLink(articleCategory.slug)"
                >
                  {{ articleCategory.title }}
                </router-link>
                <span v-else>{{ articleCategory.title }}</span>
              </div>
            </div>
          </div>
          <div class="post__content" v-if="articleBody" v-html="articleBody"></div>
          <div class="post__content" v-else>
            <p>Текст статьи отсутствует.</p>
          </div>
          <ul v-if="articleTags.length" class="post__hashtags"> 
            <li v-for="tag in articleTags" :key="tag.id || tag.title">
              <router-link :to="tagLink(tag)">{{ tag.title }}</router-link>
            </li>
          </ul>
          <div class="post__social nout-visible">
            <div class="post__socialtitle">Поделиться публикацией:</div>
            <ul class="post__sociallist"> 
              <li> <a href="#"> 
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.6677 16.7028V25.4076H14.0661V16.7031H12.2667V13.7034H14.0661V11.9024C14.0661 9.45519 15.0821 8 17.9688 8H20.3721V11.0001H18.8699C17.7462 11.0001 17.6718 11.4193 17.6718 12.2017L17.6677 13.7031H20.3891L20.0707 16.7028H17.6677Z"></path>
                  </svg></a></li>
              <li> <a href="#"> 
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16 0ZM17.3027 21.0508C17.1449 21.2171 16.8369 21.2507 16.8369 21.2507H15.8169C15.8169 21.2507 13.5665 21.3835 11.584 19.358C9.42202 17.1481 7.51299 12.7637 7.51299 12.7637C7.51299 12.7637 7.4028 12.4761 7.52217 12.3376C7.65656 12.1811 8.02301 12.1713 8.02301 12.1713L10.4613 12.1557C10.4613 12.1557 10.6908 12.1926 10.8553 12.3114C10.9913 12.4097 11.0673 12.5924 11.0673 12.5924C11.0673 12.5924 11.4613 13.5708 11.983 14.4557C13.0022 16.1837 13.4763 16.5615 13.8219 16.3763C14.3261 16.1067 14.175 13.9338 14.175 13.9338C14.175 13.9338 14.1842 13.1455 13.9212 12.794C13.7175 12.522 13.3336 12.4425 13.1641 12.4204C13.0264 12.4024 13.2518 12.0894 13.5439 11.9492C13.983 11.7387 14.7576 11.7264 15.6733 11.7354C16.387 11.7428 16.5924 11.7862 16.8712 11.8526C17.5182 12.0058 17.498 12.497 17.4544 13.5571C17.4414 13.8742 17.4263 14.2421 17.4263 14.6671C17.4263 14.7626 17.4234 14.8644 17.4205 14.9691C17.4054 15.5122 17.388 16.1342 17.7526 16.3656C17.9396 16.4836 18.3962 16.3828 19.539 14.4786C20.0807 13.5757 20.4864 12.5146 20.4864 12.5146C20.4864 12.5146 20.5757 12.3253 20.7134 12.2442C20.8545 12.1615 21.0448 12.1869 21.0448 12.1869L23.6108 12.1713C23.6108 12.1713 24.3821 12.0803 24.5064 12.4228C24.6375 12.7809 24.2185 13.6183 23.17 14.9899C22.1755 16.2914 21.6915 16.7706 21.736 17.1943C21.7684 17.504 22.083 17.7841 22.6867 18.3338C23.947 19.4823 24.2848 20.0866 24.366 20.2318C24.3727 20.2438 24.3777 20.2527 24.3812 20.2585C24.9463 21.1786 23.7543 21.2507 23.7543 21.2507L21.4747 21.2819C21.4747 21.2819 20.9855 21.3769 20.3411 20.9426C20.0036 20.7154 19.6737 20.3441 19.3595 19.9905C18.8797 19.4506 18.4365 18.9517 18.0581 19.0696C17.4229 19.2678 17.4421 20.6108 17.4421 20.6108C17.4421 20.6108 17.4471 20.8984 17.3027 21.0508Z"></path>
                  </svg></a></li>
              <li> <a href="#"> 
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0ZM13.6101 11.8638L13.5807 11.3794C13.4926 10.1238 14.2662 8.97701 15.4903 8.53212C15.9407 8.37394 16.7046 8.35417 17.204 8.49258C17.3999 8.5519 17.772 8.74962 18.0364 8.92758L18.5162 9.25383L19.045 9.08576C19.3388 8.99678 19.7305 8.84849 19.9068 8.74962C20.0733 8.66065 20.2202 8.61121 20.2202 8.64087C20.2202 8.80894 19.8578 9.38235 19.5543 9.69871C19.143 10.1436 19.2605 10.1831 20.0929 9.88655C20.5923 9.71849 20.6021 9.71849 20.5041 9.90633C20.4454 10.0052 20.1418 10.3512 19.8187 10.6676C19.2703 11.2113 19.2409 11.2706 19.2409 11.7254C19.2409 12.4273 18.9079 13.8905 18.575 14.6913C17.958 16.1941 16.636 17.7462 15.314 18.5272C13.4534 19.6246 10.9758 19.9014 8.88999 19.2588C8.19471 19.0413 7 18.4877 7 18.3888C7 18.3592 7.36233 18.3196 7.803 18.3097C8.72352 18.29 9.64403 18.0329 10.4274 17.5781L10.9563 17.2618L10.3491 17.0542C9.48735 16.7576 8.71372 16.0754 8.51787 15.4328C8.45911 15.2252 8.4787 15.2153 9.02709 15.2153L9.59507 15.2054L9.11522 14.978C8.54725 14.6913 8.02823 14.2069 7.77362 13.7126C7.58756 13.3567 7.35254 12.457 7.42109 12.3878C7.44067 12.3581 7.64632 12.4175 7.88134 12.4966C8.55704 12.7437 8.64517 12.6844 8.25347 12.2692C7.51901 11.5178 7.29378 10.4006 7.64632 9.3428L7.81279 8.86826L8.45911 9.51087C9.78113 10.806 11.3382 11.5771 13.1204 11.8045L13.6101 11.8638Z"></path>
                  </svg></a></li>
              <li> <a href="#"> 
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M0 14C0 6.26801 6.26801 0 14 0C21.732 0 28 6.26801 28 14C28 21.732 21.732 28 14 28C6.26801 28 0 21.732 0 14ZM13.9906 14.2248C16.0551 14.2248 17.7332 12.6046 17.7332 10.6129C17.7332 8.62056 16.0551 7 13.9906 7C11.9266 7 10.248 8.62056 10.248 10.6129C10.248 12.6046 11.9266 14.2248 13.9906 14.2248ZM17.6876 16.3048C17.0109 16.715 16.2762 17.006 15.5144 17.1735L17.6066 19.1933C18.0352 19.6062 18.0352 20.2767 17.6066 20.69C17.1784 21.1033 16.4844 21.1033 16.0567 20.69L13.9997 18.7052L11.9444 20.69C11.7301 20.8965 11.4493 20.9998 11.1684 20.9998C10.8881 20.9998 10.6077 20.8965 10.3934 20.69C9.96525 20.2767 9.96525 19.6066 10.393 19.1933L12.4854 17.1735C11.7236 17.006 10.9889 16.7146 10.3121 16.3048C9.79998 15.9931 9.64614 15.34 9.96883 14.8452C10.2906 14.3498 10.9674 14.2006 11.4804 14.5123C13.0126 15.4427 14.9863 15.4429 16.5194 14.5123C17.0324 14.2006 17.7089 14.3498 18.0314 14.8452C18.3541 15.3396 18.1998 15.9931 17.6876 16.3048Z"></path>
                    <path d="M13.9905 9.11719C14.8451 9.11719 15.5402 9.78794 15.5402 10.6128C15.5402 11.437 14.8451 12.1082 13.9905 12.1082C13.1367 12.1082 12.4409 11.437 12.4409 10.6128C12.4409 9.78794 13.1367 9.11719 13.9905 9.11719Z"></path>
                  </svg></a></li>
            </ul>
          </div><router-link class="post__link nout-visible" to="/news">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_78_2225)">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.3333 7.99992C15.3333 12.0499 12.0499 15.3333 7.99992 15.3333C3.94992 15.3333 0.666585 12.0499 0.666585 7.99992C0.666585 3.94992 3.94992 0.666584 7.99992 0.666585C12.0499 0.666585 15.3333 3.94992 15.3333 7.99992ZM9.49976 10.1333C9.50085 10.2279 9.47703 10.3211 9.43069 10.4036C9.38435 10.4861 9.31712 10.555 9.23576 10.6033C9.15672 10.6487 9.06622 10.6704 8.97515 10.6657C8.88409 10.6609 8.79633 10.63 8.72242 10.5766L5.72242 8.44325C5.65278 8.39234 5.59626 8.32557 5.55754 8.24848C5.51882 8.17139 5.49901 8.08619 5.49976 7.99992C5.4989 7.91354 5.51866 7.8282 5.55738 7.75098C5.59611 7.67377 5.65268 7.6069 5.72242 7.55592L8.72242 5.42258C8.79633 5.36916 8.88409 5.33823 8.97515 5.3335C9.06622 5.32877 9.15672 5.35044 9.23576 5.39592C9.31722 5.44427 9.38451 5.51323 9.43086 5.59586C9.4772 5.67848 9.50097 5.77186 9.49976 5.86658L9.49976 10.1333Z" fill="#D83A56"></path>
              </g>
              <defs>
                <clipPath>
                  <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
                </clipPath>
              </defs>
            </svg>вернуться к публикациям</router-link>
        </div>
      </div>
    </div>
  </div>
  <!--	/post-->
  <!-- callback-->
  <div class="callback">
    <div class="container"> 
      <div class="callback__block">
        <div class="callback__img"><img src="../assets/img/callback.webp" alt=""></div>
        <div class="callback__content"> 
          <h2 class="callback__title">Хотите узнать больше о наших принтерах или материалах?</h2>
          <p class="callback__text">Укажите свои контактные данные и наш менеджер свяжется с вами для консультации</p>
          <form class="callback__form" action="#">
            <div class="callback__input"> 
              <input type="text" placeholder="Введите номер телефона">
            </div>
            <button class="btn btn--red btn--big" type="submit">Отправить заявку</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!--	/callback-->
  <!-- slider-->
  <div class="slider">
    <div class="container"> 
      <div class="block-header">
        <div class="block-header__block">
          <h2 class="title">Другие публикации</h2>
          <div class="block-header__num">+19</div>
        </div>
        <div class="btn btn--black">Все новости</div>
      </div>
      <div class="slider__slider">
        <div id="sliderArticles">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_1.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">Обзор полимеров для трехмерной печати</h3>
                      <p class="article__text">Прочный, красивый, качественный и чрезвычайно простой в печати, но имеет невысокую температу...</p>
                    </div>
                    <ul class="article__list">
                      <li>28 ноября, 2021</li>
                      <li>База знаний</li>
                    </ul></a>
                  <!--	/article-->
            </div>
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_2.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                      <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                    </div>
                    <ul class="article__list">
                      <li>12 сентября, 2021</li>
                      <li>Статьи</li>
                    </ul></a>
                  <!--	/article-->
            </div>
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_3.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">3D-печать: основные проблемы и способы...</h3>
                      <p class="article__text">Предлагаем вашему вниманию руководство, с помощью которого можно решить основные пробл...</p>
                    </div>
                    <ul class="article__list">
                      <li>9 августа, 2021</li>
                      <li>Пресс-релизы</li>
                    </ul></a>
                  <!--	/article-->
            </div>
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_4.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">Прототипы для функциональных тестов</h3>
                      <p class="article__text">Как 3D-печать используется для изготовления прототипов, предназначенных для тестирования.</p>
                    </div>
                    <ul class="article__list">
                      <li>25 июля, 2021</li>
                      <li>База знаний</li>
                    </ul></a>
                  <!--	/article-->
            </div>
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_1.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">Обзор полимеров для трехмерной печати</h3>
                      <p class="article__text">Прочный, красивый, качественный и чрезвычайно простой в печати, но имеет невысокую температу...</p>
                    </div>
                    <ul class="article__list">
                      <li>28 ноября, 2021</li>
                      <li>База знаний</li>
                    </ul></a>
                  <!--	/article-->
            </div>
            <div class="swiper-slide">
                  <!-- article--><a class="article" href="#">
                    <div class="article__img"> <img src="../assets/img/article_2.webp" alt=""></div>
                    <div class="article__content"> 
                      <h3 class="article__title">Как используются 3D технологии в обучении</h3>
                      <p class="article__text">3D-принтеры перестают быть уделом только профессионало или любителей, но и активно проникают в образоват...</p>
                    </div>
                    <ul class="article__list">
                      <li>12 сентября, 2021</li>
                      <li>Статьи</li>
                    </ul></a>
                  <!--	/article-->
            </div>
          </div>
          <div class="swiper-pagination slider__pagination"></div>
        </div>
      </div>
    </div>
  </div>
  <!--	/slider-->
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
import { publicApi } from '@/services/http'
export default {
  name: 'ArticlePage',
  data() {
    return {
      id: Number(this.$route.params.id),
      article: {},
    }
  },
  computed: {
    image() {
      return this.article.article_image || ''
    },
    articleCategory() {
      const category = this.article.category_detail || {}
      const title = category.title || this.article.category_title || '—'
      const slug = category.slug || this.article.category_slug || ''
      return { title, slug }
    },
    articleTags() {
      if (!Array.isArray(this.article.tags)) {
        return []
      }
      return this.article.tags
        .map((tag) => {
          if (tag && typeof tag === 'object') {
            return {
              id: tag.id,
              title: tag.title || tag.name || '',
              slug: tag.slug || '',
            }
          }
          return { id: tag, title: String(tag || ''), slug: '' }
        })
        .filter((tag) => tag.title)
    },
    articleBody() {
      return this.sanitizeHtml(this.article.body || '')
    },
    articleDate() {
      return this.formatDate(
        this.article.publish_iso || this.article.publish || this.article.created || this.article.updated,
      )
    },
  },
  watch: {
    '$route.params.id'(nextId) {
      this.id = Number(nextId)
      this.loadArticle()
    },
  },
  mounted() {
    this.loadArticle()
  },
  methods: {
    async loadArticle() {
      const response = await publicApi.get(`/api/articles/${this.id}/`)
      this.article = response.data || {}
    },
    tagLink(tag) {
      if (!tag || !tag.slug) {
        return '/news'
      }
      return `/news/tag/${tag.slug}`
    },
    categoryLink(slug) {
      if (!slug) {
        return '/news'
      }
      return `/news/category/${slug}`
    },
    formatDate(value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return '-'
      }
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) {
        return raw
      }
      const parsed = new Date(raw)
      if (Number.isNaN(parsed.getTime())) {
        return raw
      }
      const pad = (num) => String(num).padStart(2, '0')
      return `${pad(parsed.getDate())}.${pad(parsed.getMonth() + 1)}.${parsed.getFullYear()}`
    },
    sanitizeHtml(html) {
      if (!html) {
        return ''
      }
      const container = document.createElement('div')
      container.innerHTML = String(html)
      const blockedSelectors = 'script,style,iframe,object,embed,link,meta'
      container.querySelectorAll(blockedSelectors).forEach((el) => el.remove())

      container.querySelectorAll('*').forEach((el) => {
        Array.from(el.attributes).forEach((attr) => {
          const name = attr.name.toLowerCase()
          const value = String(attr.value || '').trim().toLowerCase()
          if (name.startsWith('on')) {
            el.removeAttribute(attr.name)
            return
          }
          if ((name === 'href' || name === 'src') && value.startsWith('javascript:')) {
            el.removeAttribute(attr.name)
          }
        })
      })
      return container.innerHTML
    },
  }
}
</script>

<style scoped>
.post__type-link {
  color: inherit;
  text-decoration: underline;
}
</style>
