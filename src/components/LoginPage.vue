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
        <div class="login__title">Войти в профиль</div>
        <div class="login__text">Пожалуйста, введите свой e-mail и пароль для входа в личный кабинет пользователя.</div>
        <form class="login__form" @submit="handleLogin" @submit.prevent="" :validation-schema="schema">
        <!-- <form class="login__form" @submit.prevent=""> -->
          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>
          <div class="input input--label"> 
            <Field name="username" type="text" />
            <div class="input__label">Ваш e-mail адрес</div>
            <ErrorMessage name="username" class="error-feedback" />
          </div>
          <div class="input input--password">
            <!-- <input type="password" placeholder="Пароль"> -->
            <Field name="password" type="password" class="form-control" />
            <ErrorMessage name="password" class="error-feedback" />
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
          <div class="login__row"> 
            <div class="login__checkboxblock"> 
              <input id="checkRemember" type="checkbox">
              <label class="login__checkbox" for="checkRemember"> 
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M15.0362 4.76351C15.2049 4.93228 15.2997 5.16116 15.2997 5.39981C15.2997 5.63846 15.2049 5.86733 15.0362 6.03611L7.83618 13.2361C7.6674 13.4048 7.43853 13.4996 7.19988 13.4996C6.96123 13.4996 6.73235 13.4048 6.56358 13.2361L2.96358 9.63611C2.79964 9.46637 2.70892 9.23902 2.71097 9.00305C2.71302 8.76707 2.80767 8.54134 2.97454 8.37447C3.14141 8.2076 3.36714 8.11295 3.60312 8.1109C3.83909 8.10885 4.06644 8.19957 4.23618 8.36351L7.19988 11.3272L13.7636 4.76351C13.9324 4.59478 14.1612 4.5 14.3999 4.5C14.6385 4.5 14.8674 4.59478 15.0362 4.76351Z" fill="#D83A56"></path>
                </svg>
              </label>
              <label for="checkRemember">Запомнить меня</label>
            </div><a class="login__link" href="#">Забыли пароль?</a>
          </div>
          <button class="btn btn--red btn--big" :disabled="loading">
            <span v-show="loading" class="spinner-border spinner-border-sm"></span>Войти
          </button>
        </form>
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

<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required("Username is required!"),
      password: yup.string().required("Password is required!"),
    });
    return {
      schema,
      loading: false,
      message: "",
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/panel");
    }
  },
  methods: {
    getLogin(e) {
      console.log(this.username)
      console.log(this.password)
      e.preventDefault()
    },
    handleLogin(user) {
      
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/panel");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
              error.message ||
              error.toString();
        }
      );
    },
  },
};
</script>