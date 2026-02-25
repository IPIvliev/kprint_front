<template>
  <div class="modal fade" id="modalCallback" tabindex="-1" aria-labelledby="modalCallbackTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <form class="modal-content" @submit.prevent="submitRequest">
        <div id="modalCallbackTitle" class="modal__title">Обратный звонок</div>
        <div class="modal__text">
          Оставьте имя и номер телефона. Менеджер свяжется с вами в ближайшее время.
        </div>

        <div class="input input--label">
          <input v-model.trim="form.name" type="text" name="name" autocomplete="name" required>
          <div class="input__label">Ваше имя</div>
        </div>

        <div class="input input--label">
          <input v-model.trim="form.phone" type="tel" name="phone" autocomplete="tel" required>
          <div class="input__label">Ваш телефон</div>
        </div>

        <div class="input input--label">
          <input
            v-model.trim="form.captchaAnswer"
            type="text"
            name="captcha"
            autocomplete="off"
            :disabled="captchaLoading"
            required
          >
          <div class="input__label">Капча: {{ captchaQuestion || '...' }}</div>
        </div>

        <button
          type="button"
          class="btn btn--grayborder btn--big modal__refresh"
          :disabled="captchaLoading"
          @click="loadCaptcha"
        >
          {{ captchaLoading ? 'Обновление...' : 'Обновить капчу' }}
        </button>

        <label class="modal__consent">
          <input v-model="form.privacyPolicyAccepted" type="checkbox">
          <span>
            Я соглашаюсь с
            <router-link to="/legal/pd-consent" target="_blank" rel="noopener noreferrer">политикой конфиденциальности</router-link>
          </span>
        </label>

        <div v-if="error" class="modal__message modal__message--error">{{ error }}</div>
        <div v-if="success" class="modal__message modal__message--success">{{ success }}</div>

        <button class="btn btn--red btn--big" type="submit" :disabled="submitting || captchaLoading">
          {{ submitting ? 'Отправка...' : 'Отправить заявку' }}
        </button>

        <button type="button" class="modal_close" data-bs-dismiss="modal" aria-label="Close"></button>
      </form>
    </div>
  </div>
</template>

<script>
import { createCallbackRequest, fetchCallbackCaptcha } from '@/services/panel.service'

export default {
  name: 'CallbackModal',
  data () {
    return {
      form: {
        name: '',
        phone: '',
        captchaAnswer: '',
        privacyPolicyAccepted: false
      },
      captchaToken: '',
      captchaQuestion: '',
      captchaLoading: false,
      submitting: false,
      error: '',
      success: '',
      modalElement: null
    }
  },
  mounted () {
    if (typeof document === 'undefined') {
      return
    }
    this.modalElement = document.getElementById('modalCallback')
    if (this.modalElement) {
      this.modalElement.addEventListener('show.bs.modal', this.handleModalOpen)
    }
  },
  beforeUnmount () {
    if (this.modalElement) {
      this.modalElement.removeEventListener('show.bs.modal', this.handleModalOpen)
    }
  },
  methods: {
    handleModalOpen () {
      this.error = ''
      this.success = ''
      this.form.captchaAnswer = ''
      this.loadCaptcha()
    },
    async loadCaptcha () {
      this.captchaLoading = true
      this.error = ''
      try {
        const response = await fetchCallbackCaptcha()
        const payload = response && response.data ? response.data : {}
        this.captchaToken = String(payload.token || '')
        this.captchaQuestion = String(payload.question || '')
      } catch (err) {
        this.captchaToken = ''
        this.captchaQuestion = ''
        this.error = err.userMessage || 'Не удалось загрузить капчу'
      } finally {
        this.captchaLoading = false
      }
    },
    async submitRequest () {
      this.error = ''
      this.success = ''

      if (!this.form.privacyPolicyAccepted) {
        this.error = 'Нужно согласиться с политикой конфиденциальности'
        return
      }

      if (!this.captchaToken) {
        await this.loadCaptcha()
        if (!this.captchaToken) {
          return
        }
      }

      this.submitting = true
      try {
        await createCallbackRequest({
          name: this.form.name,
          phone: this.form.phone,
          captcha_token: this.captchaToken,
          captcha_answer: this.form.captchaAnswer,
          privacy_policy_accepted: this.form.privacyPolicyAccepted
        })

        this.success = 'Заявка отправлена. Мы скоро свяжемся с вами.'
        this.form.name = ''
        this.form.phone = ''
        this.form.captchaAnswer = ''
        this.form.privacyPolicyAccepted = false
        await this.loadCaptcha()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось отправить заявку'
        await this.loadCaptcha()
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>

<style scoped>
.modal__refresh {
  margin-bottom: 12px;
}

.modal__consent {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 12px;
  font-size: 13px;
  line-height: 1.4;
  color: #5d636f;
}

.modal__consent input {
  margin-top: 3px;
  flex: 0 0 auto;
}

.modal__message {
  font-size: 13px;
  line-height: 1.4;
  margin-bottom: 12px;
}

.modal__message--error {
  color: #c53939;
}

.modal__message--success {
  color: #2f8c4b;
}
</style>
