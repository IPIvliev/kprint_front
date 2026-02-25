<template>
  <div class="content">
    <div class="login">
      <div class="container">
        <div class="login__block">
          <div class="login__buttons">
            <div class="login__buttons-row">
              <div class="login__btn">
                <router-link class="btn btn--gray" to="/login">Вход</router-link>
              </div>
              <div class="login__btn">
                <router-link class="btn btn--black" to="/registration">Регистрация</router-link>
              </div>
            </div>
          </div>

          <div class="login__title">Восстановление пароля</div>
          <div class="login__text">
            Укажите email, который использовали при регистрации. Мы отправим ссылку для сброса пароля.
          </div>

          <VeeForm class="login__form" @submit="handleRequest" :validation-schema="schema">
            <div class="form-group">
              <div v-if="message" :class="success ? 'alert alert-success' : 'alert alert-danger'" role="alert">
                {{ message }}
              </div>
            </div>

            <div class="input input--label">
              <Field name="email" type="email" autocomplete="email" />
              <div class="input__label">Ваш e-mail адрес</div>
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <button class="btn btn--red btn--big" type="submit" :disabled="loading || success">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Отправить ссылку
            </button>
          </VeeForm>

          <div class="login__approval">
            <router-link to="/login">Вернуться на страницу входа</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>

  <footer class="footer footer--login">
    <div class="container">
      <div class="footer__line"></div>
      <div class="footer__bottom">
        <p>&#169; 2021, Kulibin Print. Все права защищены.</p>
        <LegalLinksRow />
      </div>
    </div>
  </footer>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/auth.service'
import LegalLinksRow from '@/components/elements/LegalLinksRow.vue'

export default {
  name: 'ForgotPasswordPage',
  components: {
    VeeForm,
    Field,
    ErrorMessage,
    LegalLinksRow
  },
  data () {
    const schema = yup.object().shape({
      email: yup.string().required('Email is required').email('Email is invalid')
    })
    return {
      schema,
      loading: false,
      success: false,
      message: ''
    }
  },
  methods: {
    async handleRequest (form) {
      this.loading = true
      this.success = false
      this.message = ''
      try {
        await AuthService.requestPasswordReset(form.email)
        this.success = true
        this.message = 'Если такой email зарегистрирован, мы отправили ссылку для сброса пароля.'
      } catch (error) {
        this.message =
          error?.userMessage ||
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
