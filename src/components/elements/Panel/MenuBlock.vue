<template>
							<div class="col-xxl-3 col-xl-4 d-none d-xl-block">
								<div class="panel__block panel__block--1">
									<div class="panel__head"><router-link class="panel__profile" to="/panel/edit">
											<div class="panel__profile-img"> <img src="@/assets/img/user.webp" alt=""></div>
											<div class="panel__profile-content">
												<div class="panel__profile-title">{{ currentUser.username }}</div>
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
                        <router-link to="/panel" class="panel__menu-link"><span class="panel__menu-icon">
														<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
															<path d="M6.75 15.7501H11.25M6.75 15.7501H5.25C3.59314 15.7501 2.25 14.4069 2.25 12.7501V8.0308C2.25 6.98175 2.79796 6.00891 3.69509 5.46519L7.44509 3.19246C8.40083 2.61325 9.59918 2.61325 10.5549 3.19246L14.3049 5.46519C15.2021 6.00891 15.75 6.98175 15.75 8.0308V12.7501C15.75 14.4069 14.4068 15.7501 12.75 15.7501H11.25H6.75ZM6.75 15.7501V12.7501C6.75 11.5074 7.75732 10.5001 9 10.5001C10.2427 10.5001 11.25 11.5074 11.25 12.7501V15.7501H6.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
														</svg></span>Покупатель</router-link></li>
											<li>
                        <router-link class="panel__menu-link" to="/panel/shop">
                          <span class="panel__menu-icon">
							  <img src="@/assets/img/ShoppingCart.svg" alt="">
                            </span>
                            Заказы в магазине<span class="panel__menu-num">2</span>
                        </router-link>
                      </li>
											<li>
                        <router-link class="panel__menu-link" to="/panel/models">
                          <span class="panel__menu-icon">
							<img src="@/assets/img/PuzzlePiece.svg" alt="">
                          </span>
                          Заказы на 3Д печать<span class="panel__menu-num">46</span>
                        </router-link>
                      </li>
					<li>
                        <router-link class="panel__menu-link" to="/panel/study">
                          	<span class="panel__menu-icon">
								<img src="@/assets/img/GraduationCap.svg" alt="">
                          	</span>
                          	Обучение<span class="panel__menu-num">46</span>
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
                    <ul v-else class="panel__menu">
                      <li>
                        <router-link to="/panel/news" class="panel__menu-link">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/PuzzlePiece.svg" alt="">
                          </span>
                          Новости
                        </router-link>
                      </li>
                      <li>
                        <router-link class="panel__menu-link" to="/study">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/GraduationCap.svg" alt="">
                          </span>
                          Обучение
                        </router-link>
                      </li>
                      <li>
                        <router-link class="panel__menu-link" to="/shop">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/ShoppingCart.svg" alt="">
                          </span>
                          Магазин
                        </router-link>
                      </li>
                      <li>
                        <router-link class="panel__menu-link" to="/panel/models">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/PuzzlePiece.svg" alt="">
                          </span>
                          Заказы на печать
                        </router-link>
                      </li>
                      <li>
                        <a class="panel__menu-link" :href="telegramBotUrl" target="_blank" rel="noopener">
                          <span class="panel__menu-icon">
                            <img src="@/assets/img/Headset.svg" alt="">
                          </span>
                          Телеграм бот
                        </a>
                      </li>
                    </ul>
									</div>

									<div class="panel__footer"> <a class="panel__back" href="#">
											<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
												<g clip-path="url(#clip0_78_6362)">
													<path fill-rule="evenodd" clip-rule="evenodd" d="M15.334 7.99992C15.334 12.0499 12.0507 15.3333 8.00065 15.3333C3.95065 15.3333 0.667318 12.0499 0.667318 7.99992C0.667318 3.94992 3.95065 0.666584 8.00065 0.666585C12.0507 0.666585 15.334 3.94992 15.334 7.99992ZM9.50049 10.1333C9.50158 10.2279 9.47776 10.3211 9.43142 10.4036C9.38508 10.4861 9.31785 10.555 9.23649 10.6033C9.15745 10.6487 9.06695 10.6704 8.97589 10.6657C8.88482 10.6609 8.79706 10.63 8.72315 10.5766L5.72315 8.44325C5.65351 8.39234 5.59699 8.32557 5.55827 8.24848C5.51955 8.17139 5.49974 8.08619 5.50049 7.99992C5.49964 7.91354 5.51939 7.8282 5.55812 7.75098C5.59684 7.67377 5.65342 7.6069 5.72315 7.55592L8.72315 5.42258C8.79706 5.36916 8.88482 5.33823 8.97589 5.3335C9.06695 5.32877 9.15745 5.35044 9.23649 5.39592C9.31795 5.44427 9.38524 5.51323 9.43159 5.59586C9.47793 5.67848 9.5017 5.77186 9.50049 5.86658L9.50049 10.1333Z" fill="#D83A56"></path>
												</g>
												<defs>
													<clipPath>
														<rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
													</clipPath>
												</defs>
											</svg>вернуться на сайт</a></div>
								</div>
							</div>
</template>

<script>
export default {
  data() {
    return {
      panelMode: 'user',
      telegramBotUrl: process.env.VUE_APP_TELEGRAM_BOT_URL || '#',
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    isManager() {
      const user = this.currentUser;
      if (!user) {
        return false;
      }
      if (user.is_manager === true || user.isManager === true) {
        return true;
      }
      const groups = user.groups || user.group || user.roles || user.role || user.groups_names || user.groups_list;
      if (!groups) {
        return false;
      }
      const isManagerName = (value) => {
        if (!value) {
          return false;
        }
        const name = String(value).toLowerCase();
        return name === 'менеджер' || name === 'manager';
      };
      if (Array.isArray(groups)) {
        return groups.some((item) => {
          if (typeof item === 'string') {
            return isManagerName(item);
          }
          if (item && typeof item === 'object') {
            return isManagerName(item.name || item.title || item.label);
          }
          return false;
        });
      }
      if (typeof groups === 'string') {
        return isManagerName(groups);
      }
      if (groups && typeof groups === 'object') {
        return isManagerName(groups.name || groups.title || groups.label);
      }
      return false;
    },
    panelModeSafe() {
      return this.isManager ? this.panelMode : 'user';
    },
  },
  methods: {
    setPanelMode(mode) {
      const normalized = mode === 'manager' ? 'manager' : 'user';
      if (normalized === 'manager' && !this.isManager) {
        return;
      }
      this.panelMode = normalized;
      localStorage.setItem('panelMode', normalized);
    },
  },
  mounted() {
    const stored = localStorage.getItem('panelMode');
    if (stored === 'manager' && this.isManager) {
      this.panelMode = 'manager';
    } else {
      this.panelMode = 'user';
    }
  },
}
</script>
