<template>
  <div class="content">
    <!-- login-->
    <div class="login">
      <div class="container">
        <div class="login__block">
          <div class="login__buttons"> 
            <div class="login__buttons-row">
              <div class="login__btn"><a class="btn btn--gray" href="#">Вход</a></div>
              <div class="login__btn"><a class="btn btn--black" href="#">Регистрация</a></div>
            </div>
          </div>
          <div class="login__title">Регистрация</div>
          <div class="login__text">Пройдите простую процедуру регистрации для доступа к личному кабинету пользователя.</div>
          <form class="login__form" action="#">
            <div class="input input--label"> 
              <input type="text">
              <div class="input__label">Ваш e-mail адрес</div>
            </div>
            <div class="input"> 
              <input type="text" placeholder="Имя или никнейм">
            </div>
            <div class="input input--password">
              <input type="password" placeholder="Пароль">
              <div class="input__icon"> 
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M16.8164 11.3174L19.5002 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M12 12.875V16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    <path d="M7.18383 11.3174L4.5 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  </g>
                </svg>
              </div>
            </div>
            <button class="btn btn--red btn--big" type="submit">Зарегистрироваться</button>
          </form>
          <div class="login__approval">Регистрируясь Вы подтверждаете своё согласие на обработку <a href="#">персональных данных</a></div>
        </div>
      </div>
    </div>
    <!--	/login-->
  </div>
  <!-- footer-->
  <footer class="footer footer--login">
    <div class="container"> 
      <div class="footer__line"></div>
      <div class="footer__bottom"> 
        <p>&#169; 2021, Kulibin Print. Все права защищены.</p>
        <div class="footer__dgdgf d-flex flex-wrap"><a href="#">Политика конфиденциальности</a><a href="#">Условия обслуживания</a></div>
      </div>
    </div>
  </footer>
  <!-- /footer-->
</template>