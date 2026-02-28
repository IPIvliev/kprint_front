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
          <div class="login__title">Регистрация</div>
          <div class="login__text">
            Пройдите простую процедуру регистрации для доступа к личному кабинету пользователя.
          </div>
          <VeeForm class="login__form" @submit="handleRegister" :validation-schema="schema">
            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
            </div>

            <div class="input">
              <Field
                name="email"
                type="email"
                class="registration__field"
                autocomplete="email"
                placeholder="Ваш e-mail адрес"
              />
              <ErrorMessage name="email" class="error-feedback" />
            </div>

            <div class="input">
              <Field name="username" type="text" class="registration__field" placeholder="Имя или никнейм" autocomplete="username" />
              <ErrorMessage name="username" class="error-feedback" />
            </div>

            <div class="input input--password">
              <Field
                name="password"
                :type="showPassword ? 'text' : 'password'"
                class="registration__field"
                placeholder="Пароль"
                autocomplete="new-password"
              />
              <ErrorMessage name="password" class="error-feedback" />
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

            <div class="registration-consents">
              <p class="registration-consents__title">
                Для регистрации и заказов в личном кабинете отметьте обязательные пункты:
              </p>
              <label class="registration-consents__item">
                <input v-model="consents.terms_offer_accepted" type="checkbox">
                <span>
                  <strong class="registration-consents__badge">Обязательно</strong>
                  Принимаю
                  <router-link to="/legal/terms-offer" target="_blank" rel="noopener noreferrer">соглашение и оферту</router-link>
                </span>
              </label>
              <label class="registration-consents__item">
                <input v-model="consents.pd_accepted" type="checkbox">
                <span>
                  <strong class="registration-consents__badge">Обязательно</strong>
                  Даю
                  <router-link to="/legal/pd-consent" target="_blank" rel="noopener noreferrer">согласие на ПДн</router-link>
                </span>
              </label>
              <label class="registration-consents__item">
                <input v-model="consents.ads_accepted" type="checkbox">
                <span>
                  <strong class="registration-consents__badge registration-consents__badge--optional">Опционально</strong>
                  Хочу получать
                  <router-link to="/legal/ads-consent" target="_blank" rel="noopener noreferrer">новости и акции</router-link>
                </span>
              </label>
              <p class="registration-consents__status" :class="{ 'registration-consents__status--ready': isRequiredConsentsAccepted }">
                {{ isRequiredConsentsAccepted ? 'Обязательные пункты отмечены. Можно продолжить.' : 'Без 2 обязательных отметок регистрация недоступна.' }}
              </p>
            </div>

            <button class="btn btn--red btn--big" type="submit" :disabled="loading || !isRequiredConsentsAccepted">
              <span v-show="loading" class="spinner-border spinner-border-sm"></span>
              Зарегистрироваться
            </button>
          </VeeForm>
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
import LegalLinksRow from '@/components/elements/LegalLinksRow.vue'

export default {
  name: 'RegistrationPage',
  components: {
    VeeForm,
    Field,
    ErrorMessage,
    LegalLinksRow
  },
  data () {
    const schema = yup.object().shape({
      email: yup.string().required('Укажите e-mail.').email('Введите корректный e-mail.'),
      username: yup.string().required('Укажите имя или никнейм.').min(3, 'Имя или никнейм должно содержать минимум 3 символа.'),
      password: yup.string().required('Укажите пароль.').min(8, 'Пароль должен содержать минимум 8 символов.')
    })

    return {
      schema,
      loading: false,
      message: '',
      showPassword: false,
      consents: {
        terms_offer_accepted: false,
        pd_accepted: false,
        ads_accepted: false
      }
    }
  },
  computed: {
    isRequiredConsentsAccepted () {
      return this.consents.terms_offer_accepted && this.consents.pd_accepted
    }
  },
  methods: {
    togglePasswordVisibility () {
      this.showPassword = !this.showPassword
    },
    extractFirstApiMessage (payload) {
      if (!payload) {
        return ''
      }
      if (typeof payload === 'string') {
        return payload
      }
      if (Array.isArray(payload)) {
        return this.extractFirstApiMessage(payload[0])
      }
      if (typeof payload !== 'object') {
        return ''
      }

      const orderedKeys = [
        'non_field_errors',
        'detail',
        'message',
        'email',
        'username',
        'password',
        'terms_offer_accepted',
        'pd_accepted'
      ]

      for (const key of orderedKeys) {
        if (payload[key] !== undefined && payload[key] !== null) {
          const message = this.extractFirstApiMessage(payload[key])
          if (message) {
            return message
          }
        }
      }

      for (const value of Object.values(payload)) {
        const message = this.extractFirstApiMessage(value)
        if (message) {
          return message
        }
      }

      return ''
    },
    localizeRegisterErrorText (rawMessage) {
      const source = String(rawMessage || '')
      const normalized = source.toLowerCase()

      if (normalized.includes('email is required')) {
        return 'Укажите e-mail.'
      }
      if (normalized.includes('email is invalid') || (normalized.includes('email') && normalized.includes('valid'))) {
        return 'Введите корректный e-mail.'
      }
      if (normalized.includes('username is required')) {
        return 'Укажите имя или никнейм.'
      }
      if (normalized.includes('username must be at least 3')) {
        return 'Имя или никнейм должно содержать минимум 3 символа.'
      }
      if (normalized.includes('password is required')) {
        return 'Укажите пароль.'
      }
      if (normalized.includes('password must be at least 8')) {
        return 'Пароль должен содержать минимум 8 символов.'
      }
      if (normalized.includes('email') && normalized.includes('already')) {
        return 'Этот e-mail уже зарегистрирован.'
      }
      if (normalized.includes('username') && normalized.includes('already')) {
        return 'Это имя уже занято.'
      }
      if (normalized.includes('terms_offer_accepted') && normalized.includes('true')) {
        return 'Подтвердите соглашение и оферту.'
      }
      if (normalized.includes('pd_accepted') && normalized.includes('true')) {
        return 'Подтвердите согласие на обработку ПДн.'
      }
      if (normalized.includes('network error') || normalized.includes('failed to fetch')) {
        return 'Ошибка сети. Проверьте подключение и попробуйте снова.'
      }

      return source || 'Не удалось завершить регистрацию.'
    },
    localizeRegisterError (error) {
      const rawMessage =
        error?.userMessage ||
        this.extractFirstApiMessage(error?.response?.data) ||
        error?.message ||
        error?.toString() ||
        'Не удалось завершить регистрацию.'

      return this.localizeRegisterErrorText(rawMessage)
    },
    async handleRegister (user) {
      if (!this.isRequiredConsentsAccepted) {
        this.message = 'Для регистрации нужно принять соглашение/оферту и согласие на обработку ПДн.'
        return
      }
      this.loading = true
      this.message = ''
      try {
        await this.$store.dispatch('auth/register', {
          ...user,
          terms_offer_accepted: this.consents.terms_offer_accepted,
          pd_accepted: this.consents.pd_accepted,
          ads_accepted: this.consents.ads_accepted
        })
        const nextPath = this.$route?.query?.next
        if (typeof nextPath === 'string' && nextPath.startsWith('/')) {
          this.$router.push({ path: '/login', query: { next: nextPath } })
        } else {
          this.$router.push('/login')
        }
      } catch (error) {
        this.message = this.localizeRegisterError(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding-bottom: 48px;
}

.registration-consents {
  margin-bottom: 14px;
  padding: 10px 12px;
  border: 1px solid #d9dee8;
  border-radius: 8px;
  background: #f7f9fc;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.registration-consents__title {
  margin: 0;
  color: #232629;
  font-size: 13px;
  line-height: 1.35;
  font-weight: 600;
}

.registration-consents__item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #5d636f;
  font-size: 13px;
  line-height: 1.4;
}

.registration-consents__item input {
  margin-top: 3px;
}

.registration-consents__badge {
  display: inline-block;
  margin-right: 6px;
  padding: 1px 6px;
  border-radius: 999px;
  background: #fde8ec;
  color: #c9314f;
  font-size: 11px;
  line-height: 1.2;
}

.registration-consents__badge--optional {
  background: #ecf2ff;
  color: #3c5fa8;
}

.registration-consents__status {
  margin: 0;
  color: #a03d52;
  font-size: 12px;
  line-height: 1.35;
}

.registration-consents__status--ready {
  color: #2f8f4e;
}
</style>

<style>
.login__form .registration__field {
  background: #fff;
  border: 1px solid #d5dce2;
}

.login__form .registration__field:focus {
  border-color: #c5cdd4;
  box-shadow: 0 0 0 2px rgba(216, 58, 86, 0.08);
}

.login__form .registration__field::placeholder {
  color: #7f858d;
}
</style>
