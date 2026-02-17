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

          <div class="login__title">Новый пароль</div>
          <div class="login__text">
            Придумайте новый пароль для вашего аккаунта.
          </div>

          <VeeForm class="login__form" @submit="handleReset" :validation-schema="schema">
            <div class="form-group">
              <div v-if="message" :class="success ? 'alert alert-success' : 'alert alert-danger'" role="alert">
                {{ message }}
              </div>
            </div>

            <div class="input input--password">
              <Field
                name="new_password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Новый пароль"
                autocomplete="new-password"
              />
              <ErrorMessage name="new_password" class="error-feedback" />
              <div
                class="input__icon"
                :class="{ active: showPassword }"
                role="button"
                tabindex="0"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword ? 'true' : 'false'"
                @click="togglePasswordVisibility"
                @keydown.enter.prevent="togglePasswordVisibility"
                @keydown.space.prevent="togglePasswordVisibility"
              >
                <svg class="input__icon--hide" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M16.8164 11.3174L19.5002 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12 12.875V16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7.18383 11.3174L4.5 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <svg class="input__icon--visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 12.5C7.5 6 16.5 6 19.5 12.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>

            <div class="input input--password">
              <Field
                name="confirm_password"
                :type="showConfirmPassword ? 'text' : 'password'"
                placeholder="Повторите пароль"
                autocomplete="new-password"
              />
              <ErrorMessage name="confirm_password" class="error-feedback" />
              <div
                class="input__icon"
                :class="{ active: showConfirmPassword }"
                role="button"
                tabindex="0"
                :aria-label="showConfirmPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showConfirmPassword ? 'true' : 'false'"
                @click="toggleConfirmPasswordVisibility"
                @keydown.enter.prevent="toggleConfirmPasswordVisibility"
                @keydown.space.prevent="toggleConfirmPasswordVisibility"
              >
                <svg class="input__icon--hide" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 8C7.5 14.5 16.5 14.5 19.5 8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M16.8164 11.3174L19.5002 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12 12.875V16.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M7.18383 11.3174L4.5 14.9999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <svg class="input__icon--visible" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.5 12.5C7.5 6 16.5 6 19.5 12.5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                  <path d="M12 16C10.8954 16 10 15.1046 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14C14 15.1046 13.1046 16 12 16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </div>
            </div>

            <button class="btn btn--red btn--big" type="submit" :disabled="loading || success">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Сохранить пароль
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
        <div class="footer__dgdgf d-flex flex-wrap">
          <a href="#">Политика конфиденциальности</a><a href="#">Условия обслуживания</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import AuthService from '@/services/auth.service'

export default {
  name: 'ResetPasswordPage',
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  data () {
    const schema = yup.object().shape({
      new_password: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
      confirm_password: yup
        .string()
        .required('Please confirm password')
        .oneOf([yup.ref('new_password')], 'Passwords must match')
    })
    return {
      schema,
      loading: false,
      success: false,
      message: '',
      showPassword: false,
      showConfirmPassword: false
    }
  },
  computed: {
    uid () {
      return this.$route.params.uid || ''
    },
    token () {
      return this.$route.params.token || ''
    }
  },
  created () {
    if (!this.uid || !this.token) {
      this.message = 'Ссылка для сброса пароля некорректна.'
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    },
    toggleConfirmPasswordVisibility () {
      this.showConfirmPassword = !this.showConfirmPassword
    },
    async handleReset (form) {
      if (!this.uid || !this.token) {
        return
      }
      this.loading = true
      this.success = false
      this.message = ''
      try {
        await AuthService.confirmPasswordReset({
          uid: this.uid,
          token: this.token,
          new_password: form.new_password
        })
        this.success = true
        this.message = 'Пароль успешно изменён. Теперь вы можете войти в аккаунт.'
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
