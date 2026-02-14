<template>
			<div class="content content--pbn">
				<!-- panel-->
				<div class="panel">
					<div class="container"> 
						<div class="row"> 
              <menu-block/>
							<div class="col-xxl-9 col-xl-8">
								<div class="panel__block">
									<div class="panel__head">
										<div class="panel__title">Редактировать профиль</div>
									</div>
									<div class="panel__body">
										<form class="panel__avatar" action="#"> 
											<div class="panel__avatar-img"> <img :src="avatarSrc" alt=""></div>
											<div class="panel__avatar-content"> 
												<div class="panel__avatar-buttons"> 
													<div class="panel__avatar-btn">
														<input id="avatar" type="file" accept="image/*" @change="onAvatarChange">
														<label class="btn btn--border" for="avatar"> 
															<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M2.40039 13.5999C2.40039 13.3878 2.48468 13.1843 2.63471 13.0342C2.78473 12.8842 2.98822 12.7999 3.20039 12.7999H12.8004C13.0126 12.7999 13.216 12.8842 13.3661 13.0342C13.5161 13.1843 13.6004 13.3878 13.6004 13.5999C13.6004 13.8121 13.5161 14.0156 13.3661 14.1656C13.216 14.3156 13.0126 14.3999 12.8004 14.3999H3.20039C2.98822 14.3999 2.78473 14.3156 2.63471 14.1656C2.48468 14.0156 2.40039 13.8121 2.40039 13.5999ZM5.03479 5.36553C4.88481 5.2155 4.80056 5.01206 4.80056 4.79993C4.80056 4.5878 4.88481 4.38435 5.03479 4.23433L7.43479 1.83433C7.58481 1.68435 7.78826 1.6001 8.00039 1.6001C8.21252 1.6001 8.41597 1.68435 8.56599 1.83433L10.966 4.23433C11.1117 4.38521 11.1924 4.58729 11.1905 4.79705C11.1887 5.0068 11.1046 5.20745 10.9562 5.35578C10.8079 5.50411 10.6073 5.58824 10.3975 5.59007C10.1878 5.59189 9.98567 5.51125 9.83479 5.36553L8.80039 4.33113V10.3999C8.80039 10.6121 8.71611 10.8156 8.56608 10.9656C8.41605 11.1156 8.21256 11.1999 8.00039 11.1999C7.78822 11.1999 7.58473 11.1156 7.43471 10.9656C7.28468 10.8156 7.20039 10.6121 7.20039 10.3999V4.33113L6.16599 5.36553C6.01597 5.5155 5.81252 5.59976 5.60039 5.59976C5.38826 5.59976 5.18481 5.5155 5.03479 5.36553Z"></path>
															</svg>Загрузить аватар
														</label>
													</div>
													<div class="panel__avatar-btn"> 
														<button class="btn btn--border" type="button" @click="clearAvatar"> 
															<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
																<path fill-rule="evenodd" clip-rule="evenodd" d="M7.20039 1.6001C7.05186 1.60018 6.90629 1.6416 6.77997 1.71974C6.65365 1.79787 6.55158 1.90963 6.48519 2.0425L5.90599 3.2001H3.20039C2.98822 3.2001 2.78473 3.28438 2.63471 3.43441C2.48468 3.58444 2.40039 3.78792 2.40039 4.0001C2.40039 4.21227 2.48468 4.41575 2.63471 4.56578C2.78473 4.71581 2.98822 4.8001 3.20039 4.8001V12.8001C3.20039 13.2244 3.36896 13.6314 3.66902 13.9315C3.96908 14.2315 4.37604 14.4001 4.80039 14.4001H11.2004C11.6247 14.4001 12.0317 14.2315 12.3318 13.9315C12.6318 13.6314 12.8004 13.2244 12.8004 12.8001V4.8001C13.0126 4.8001 13.216 4.71581 13.3661 4.56578C13.5161 4.41575 13.6004 4.21227 13.6004 4.0001C13.6004 3.78792 13.5161 3.58444 13.3661 3.43441C13.216 3.28438 13.0126 3.2001 12.8004 3.2001H10.0948L9.51559 2.0425C9.4492 1.90963 9.34713 1.79787 9.22081 1.71974C9.0945 1.6416 8.94892 1.60018 8.80039 1.6001H7.20039ZM5.60039 6.4001C5.60039 6.18792 5.68468 5.98444 5.83471 5.83441C5.98473 5.68438 6.18822 5.6001 6.40039 5.6001C6.61256 5.6001 6.81605 5.68438 6.96608 5.83441C7.11611 5.98444 7.20039 6.18792 7.20039 6.4001V11.2001C7.20039 11.4123 7.11611 11.6158 6.96608 11.7658C6.81605 11.9158 6.61256 12.0001 6.40039 12.0001C6.18822 12.0001 5.98473 11.9158 5.83471 11.7658C5.68468 11.6158 5.60039 11.4123 5.60039 11.2001V6.4001ZM9.60039 5.6001C9.38822 5.6001 9.18473 5.68438 9.03471 5.83441C8.88468 5.98444 8.80039 6.18792 8.80039 6.4001V11.2001C8.80039 11.4123 8.88468 11.6158 9.03471 11.7658C9.18473 11.9158 9.38822 12.0001 9.60039 12.0001C9.81256 12.0001 10.016 11.9158 10.1661 11.7658C10.3161 11.6158 10.4004 11.4123 10.4004 11.2001V6.4001C10.4004 6.18792 10.3161 5.98444 10.1661 5.83441C10.016 5.68438 9.81256 5.6001 9.60039 5.6001Z"></path>
															</svg>Удалить
														</button>
													</div>
												</div>
												<div class="panel__avatar-text">Загружаемое изображение должно весить не более 1 мб.</div>
											</div>
										</form>
										<form class="panel__form" action="#" @submit.prevent="saveProfile">
											<div class="panel__formrow"> 
												<div class="row gy-1">
													<div class="col-md-6">
														<div class="input input--label"> 
															<input type="text" v-model.trim="profile.full_name">
															<div class="input__label">Ваше имя или никнейм</div>
														</div>
													</div>
													</div>
												</div>
												<div class="panel__formrow"> 
													<div class="row gy-1">
														<div class="col-md-6">
															<div class="input input--label"> 
																<input type="text" name="telegram" v-model.trim="profile.telegram">
																<div class="input__label">Telegram</div>
															</div>
														</div>
													</div>
												</div>
												<div class="panel__formrow"> 
												<div class="row gy-1">
													<div class="col-md-6">
														<div class="input input--label"> 
															<input type="text" name="phone" v-model.trim="profile.phone">
															<div class="input__label">Номер телефона</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="input input--label"> 
															<input type="text" name="email" v-model.trim="profile.email">
															<div class="input__label">Ваш e-mail адрес</div>
														</div>
													</div>
												</div>
											</div>
											<div class="panel__formrow"> 
												<div class="row gy-1">
													<div class="col-md-6">
														<div class="input input--label input--password">
															<input :type="oldPasswordFieldType">
															<div class="input__label">Старый пароль</div>
															<div class="input__icon" @click="switchVisibilityOldPassword"> 
																<svg class="input__icon--hide" v-show="oldPasswordVisibleOff" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M16.8164 11.3174L19.5002 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M12 12.875V16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M7.18383 11.3174L4.5 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																</svg>
																<svg class="input__icon--hide" v-show="oldPasswordVisibleOn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M4.5 12.5C7.5 6 16.5 6 19.5 12.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																</svg>
															</div>
														</div>
													</div>
													<div class="col-md-6">
														<div class="input input--label input--password">
															<input :type="newPasswordFieldType">
															<div class="input__label">Новый пароль</div>
															<div class="input__icon" @click="switchVisibilityNewPassword">
																<svg class="input__icon--hide" v-show="newPasswordVisibleOff" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M16.8164 11.3174L19.5002 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M12 12.875V16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M7.18383 11.3174L4.5 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																</svg>
																<svg class="input__icon--hide" v-show="newPasswordVisibleOn" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<path d="M4.5 12.5C7.5 6 16.5 6 19.5 12.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																	<path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
																</svg>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="panel__formrow">
												<div class="row gy-1">
													<div class="col-md-6">
															<button class="btn btn--grayborder" type="button">
																<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
																	<g opacity="0.24">
																		<path d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
																		<path d="M16.5 21.75C18.1569 21.75 19.5 20.4069 19.5 18.75C19.5 17.0931 18.1569 15.75 16.5 15.75C14.8431 15.75 13.5 17.0931 13.5 18.75C13.5 20.4069 14.8431 21.75 16.5 21.75Z" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
																		<path d="M16.5 8.25C18.1569 8.25 19.5 6.90685 19.5 5.25C19.5 3.59315 18.1569 2.25 16.5 2.25C14.8431 2.25 13.5 3.59315 13.5 5.25C13.5 6.90685 14.8431 8.25 16.5 8.25Z" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
																		<path d="M13.9782 6.87183L8.52191 10.3781" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
																		<path d="M8.52191 13.6218L13.9782 17.1281" stroke="#3F3F3F" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
																	</g>
																</svg>
															
															Привязать телеграм для оповещений
														</button>
													</div>
												</div>
											</div>
											<div class="panel__formbtn"> 
												<button class="btn btn--red btn--big" type="submit" :disabled="loading">Сохранить изменения</button>
												<div v-if="errorMessage" style="margin-top:10px;color:#d83a56;">{{ errorMessage }}</div>
												<div v-if="successMessage" style="margin-top:10px;color:#2f8f4e;">{{ successMessage }}</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
						<div class="panel__bottom"> <a class="panel__back" href="#"> 
								<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
									<g clip-path="url(#clip0_78_6362)">
										<path fill-rule="evenodd" clip-rule="evenodd" d="M15.334 7.99992C15.334 12.0499 12.0507 15.3333 8.00065 15.3333C3.95065 15.3333 0.667318 12.0499 0.667318 7.99992C0.667318 3.94992 3.95065 0.666584 8.00065 0.666585C12.0507 0.666585 15.334 3.94992 15.334 7.99992ZM9.50049 10.1333C9.50158 10.2279 9.47776 10.3211 9.43142 10.4036C9.38508 10.4861 9.31785 10.555 9.23649 10.6033C9.15745 10.6487 9.06695 10.6704 8.97589 10.6657C8.88482 10.6609 8.79706 10.63 8.72315 10.5766L5.72315 8.44325C5.65351 8.39234 5.59699 8.32557 5.55827 8.24848C5.51955 8.17139 5.49974 8.08619 5.50049 7.99992C5.49964 7.91354 5.51939 7.8282 5.55812 7.75098C5.59684 7.67377 5.65342 7.6069 5.72315 7.55592L8.72315 5.42258C8.79706 5.36916 8.88482 5.33823 8.97589 5.3335C9.06695 5.32877 9.15745 5.35044 9.23649 5.39592C9.31795 5.44427 9.38524 5.51323 9.43159 5.59586C9.47793 5.67848 9.5017 5.77186 9.50049 5.86658L9.50049 10.1333Z" fill="#D83A56"></path>
									</g>
									<defs>
										<clipPath>
											<rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
										</clipPath>
									</defs>
								</svg>вернуться на сайт</a>
							<div class="header__lang">
								<div class="header__langbtn js-drop-btn" data-drop="langPanel">
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
								<div class="header__langdrop" id="langPanel"> 
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
						</div>
					</div>
				</div>
				<!--	/panel-->
			</div>
</template>

<script>
import { api } from '@/services/http'
import authHeader from '@/services/auth-header'
import { defaultAvatarPlaceholder } from '@/constants/avatarPlaceholders'
import MenuBlock from '../elements/Panel/MenuBlock.vue'

export default {
  name: 'MainPanel',
  components: { MenuBlock },
  data() {
    return {
      profile: {
        id: null,
        avatar: '',
        full_name: '',
        phone: '',
        email: '',
        telegram: '',
      },
      avatarFile: null,
      removeAvatar: false,
      avatarPreview: '',
      loading: false,
      errorMessage: '',
      successMessage: '',
      oldPasswordFieldType: 'password',
      oldPasswordVisibleOff: true,
      oldPasswordVisibleOn: false,
      newPasswordFieldType: 'password',
      newPasswordVisibleOff: true,
      newPasswordVisibleOn: false,
    }
  },
  computed: {
    avatarSrc() {
      if (this.removeAvatar && !this.avatarFile) {
        return defaultAvatarPlaceholder
      }
      return this.avatarPreview || this.resolveMediaUrl(this.profile.avatar) || defaultAvatarPlaceholder
    },
  },
  methods: {
    normalizeProfile(data = {}) {
      return {
        id: data.id || null,
        avatar: data.avatar || '',
        full_name: data.full_name || '',
        phone: data.phone || '',
        email: data.email || '',
        telegram: data.telegram || '',
      }
    },
    applyProfile(data = {}) {
      this.profile = this.normalizeProfile(data)
      this.removeAvatar = false
      this.syncStoredUser()
    },
    resolveMediaUrl(path) {
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
    syncStoredUser() {
      const storeUser = this.$store && this.$store.state && this.$store.state.auth
        ? this.$store.state.auth.user
        : null
      if (!storeUser) {
        return
      }
      const nextUser = {
        ...storeUser,
        email: this.profile.email ?? storeUser.email,
        full_name: this.profile.full_name ?? storeUser.full_name ?? '',
        avatar: this.profile.avatar ?? storeUser.avatar ?? '',
      }
      if (!nextUser.username && nextUser.full_name) {
        nextUser.username = nextUser.full_name
      }
      try {
        localStorage.setItem('user', JSON.stringify(nextUser))
        this.$store.commit('auth/loginSuccess', nextUser)
      } catch (error) {
        // keep profile flow working even if store update fails
      }
    },
    clearAvatarPreview() {
      if (this.avatarPreview) {
        URL.revokeObjectURL(this.avatarPreview)
        this.avatarPreview = ''
      }
    },
    onAvatarChange(event) {
      const files = event && event.target ? event.target.files : null
      const file = files && files.length ? files[0] : null
      if (!file) {
        return
      }
      this.avatarFile = file
      this.removeAvatar = false
      this.clearAvatarPreview()
      this.avatarPreview = URL.createObjectURL(file)
    },
    clearAvatar() {
      this.avatarFile = null
      this.removeAvatar = true
      this.clearAvatarPreview()
      const input = this.$el ? this.$el.querySelector('#avatar') : null
      if (input) {
        input.value = ''
      }
    },
    async fetchProfile() {
      this.loading = true
      this.errorMessage = ''
      try {
        const response = await api.get('/api/user/profile', { headers: authHeader() })
        this.applyProfile(response && response.data ? response.data : {})
      } catch (error) {
        this.errorMessage = 'Не удалось загрузить профиль.'
      } finally {
        this.loading = false
      }
    },
    buildPayload() {
      const formData = new FormData()
      formData.append('full_name', this.profile.full_name || '')
      formData.append('phone', this.profile.phone || '')
      formData.append('email', this.profile.email || '')
      formData.append('telegram', this.profile.telegram || '')
      if (this.avatarFile) {
        formData.append('avatar', this.avatarFile)
      } else if (this.removeAvatar) {
        formData.append('avatar', '')
      }
      return formData
    },
    async saveProfile() {
      if (this.loading) {
        return
      }
      this.loading = true
      this.errorMessage = ''
      this.successMessage = ''
      try {
        const payload = this.buildPayload()
        const response = await api.patch('/api/user/profile', payload, {
          headers: authHeader(),
        })
        this.applyProfile(response && response.data ? response.data : {})
        this.avatarFile = null
        this.removeAvatar = false
        this.clearAvatarPreview()
        const input = this.$el ? this.$el.querySelector('#avatar') : null
        if (input) {
          input.value = ''
        }
        this.successMessage = 'Профиль сохранен.'
      } catch (error) {
        this.errorMessage = 'Не удалось сохранить профиль.'
      } finally {
        this.loading = false
      }
    },
    switchVisibilityOldPassword() {
      this.oldPasswordFieldType = this.oldPasswordFieldType === 'password' ? 'text' : 'password'
      this.oldPasswordVisibleOn = !this.oldPasswordVisibleOn
      this.oldPasswordVisibleOff = !this.oldPasswordVisibleOff
    },
    switchVisibilityNewPassword() {
      this.newPasswordFieldType = this.newPasswordFieldType === 'password' ? 'text' : 'password'
      this.newPasswordVisibleOn = !this.newPasswordVisibleOn
      this.newPasswordVisibleOff = !this.newPasswordVisibleOff
    },
  },
  mounted() {
    this.fetchProfile()
  },
  beforeUnmount() {
    this.clearAvatarPreview()
  },
}
</script>
