<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Новости<span>{{ filteredArticles.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchNews"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или содержанию"
                    >
                    <label class="panel__search-icon" for="searchNews">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__add-btn">
                  <div class="btn btn--red btn--big" @click="openCreate">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.99961 14.4001C9.69699 14.4001 11.3249 13.7258 12.5251 12.5256C13.7253 11.3253 14.3996 9.69748 14.3996 8.0001C14.3996 6.30271 13.7253 4.67485 12.5251 3.47461C11.3249 2.27438 9.69699 1.6001 7.99961 1.6001C6.30222 1.6001 4.67436 2.27438 3.47413 3.47461C2.27389 4.67485 1.59961 6.30271 1.59961 8.0001C1.59961 9.69748 2.27389 11.3253 3.47413 12.5256C4.67436 13.7258 6.30222 14.4001 7.99961 14.4001ZM8.79961 5.6001C8.79961 5.38792 8.71532 5.18444 8.56529 5.03441C8.41527 4.88438 8.21178 4.8001 7.99961 4.8001C7.78744 4.8001 7.58395 4.88438 7.43392 5.03441C7.28389 5.18444 7.19961 5.38792 7.19961 5.6001V7.2001H5.59961C5.38744 7.2001 5.18395 7.28438 5.03392 7.43441C4.88389 7.58444 4.79961 7.78792 4.79961 8.0001C4.79961 8.21227 4.88389 8.41575 5.03392 8.56578C5.18395 8.71581 5.38744 8.8001 5.59961 8.8001H7.19961V10.4001C7.19961 10.6123 7.28389 10.8158 7.43392 10.9658C7.58395 11.1158 7.78744 11.2001 7.99961 11.2001C8.21178 11.2001 8.41527 11.1158 8.56529 10.9658C8.71532 10.8158 8.79961 10.6123 8.79961 10.4001V8.8001H10.3996C10.6118 8.8001 10.8153 8.71581 10.9653 8.56578C11.1153 8.41575 11.1996 8.21227 11.1996 8.0001C11.1996 7.78792 11.1153 7.58444 10.9653 7.43441C10.8153 7.28438 10.6118 7.2001 10.3996 7.2001H8.79961V5.6001Z" fill="white"></path>
                    </svg>
                    <div class="d-none d-md-block">Добавить новость</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchNewsMob"
                      type="text"
                      v-model="searchTerm"
                      placeholder="Поиск по названию или содержанию"
                    >
                    <label class="panel__search-icon" for="searchNewsMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="article in filteredArticles" :key="articleKey(article)">
                      <td v-if="article.article_image">
                        <img class="panel__table-img-model" :src="article.article_image" alt="">
                      </td>
                      <td v-else>
                        <img class="panel__table-img-model" src="@/assets/img/model_1.webp" alt="">
                      </td>
                      <td>
                        <span class="panel__table-title">{{ article.title || 'Без названия' }}</span>
                        <span class="panel__table-sn panel__table-sn--detail">
                          {{ normalizeDate(article.publish || article.updated || article.created) }}
                        </span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Категория:</span>
                        <span class="panel__table-text">{{ categoryTitle(article.category) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Кратко:</span>
                        <span class="panel__table-text">{{ shortText(article.body) }}</span>
                      </td>
                      <td>
                        <router-link class="panel__table-link" :to="newsLink(article)">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.3996 8.0001C14.3996 9.69748 13.7253 11.3253 12.5251 12.5256C11.3249 13.7258 9.69699 14.4001 7.99961 14.4001C6.30222 14.4001 4.67436 13.7258 3.47413 12.5256C2.27389 11.3253 1.59961 9.69748 1.59961 8.0001C1.59961 6.30271 2.27389 4.67485 3.47413 3.47461C4.67436 2.27438 6.30222 1.6001 7.99961 1.6001C9.69699 1.6001 11.3249 2.27438 12.5251 3.47461C13.7253 4.67485 14.3996 6.30271 14.3996 8.0001ZM8.79961 4.8001C8.79961 5.01227 8.71532 5.21575 8.56529 5.36578C8.41527 5.51581 8.21178 5.6001 7.99961 5.6001C7.78744 5.6001 7.58395 5.51581 7.43392 5.36578C7.28389 5.21575 7.19961 5.01227 7.19961 4.8001C7.19961 4.58792 7.28389 4.38444 7.43392 4.23441C7.58395 4.08438 7.78744 4.0001 7.99961 4.0001C8.21178 4.0001 8.41527 4.08438 8.56529 4.23441C8.71532 4.38444 8.79961 4.58792 8.79961 4.8001ZM7.19961 7.2001C6.98744 7.2001 6.78395 7.28438 6.63392 7.43441C6.48389 7.58444 6.39961 7.78792 6.39961 8.0001C6.39961 8.21227 6.48389 8.41575 6.63392 8.56578C6.78395 8.71581 6.98744 8.8001 7.19961 8.8001V11.2001C7.19961 11.4123 7.28389 11.6158 7.43392 11.7658C7.58395 11.9158 7.78744 12.0001 7.99961 12.0001H8.79961C9.01178 12.0001 9.21527 11.9158 9.36529 11.7658C9.51532 11.6158 9.59961 11.4123 9.59961 11.2001C9.59961 10.9879 9.51532 10.7844 9.36529 10.6344C9.21527 10.4844 9.01178 10.4001 8.79961 10.4001V8.0001C8.79961 7.78792 8.71532 7.58444 8.56529 7.43441C8.41527 7.28438 8.21178 7.2001 7.99961 7.2001H7.19961Z" fill="#D83A56"></path>
                          </svg>просмотреть
                        </router-link>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(article)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeArticle(article)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 5.25H15" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M7.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.5 8.25V12.75" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M3.75 5.25L4.5 14.25C4.5 14.6478 4.65804 15.0294 4.93934 15.3107C5.22064 15.592 5.60218 15.75 6 15.75H12C12.3978 15.75 12.7794 15.592 13.0607 15.3107C13.342 15.0294 13.5 14.6478 13.5 14.25L14.25 5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M6.75 5.25V3C6.75 2.80109 6.82902 2.61032 6.96967 2.46967C7.11032 2.32902 7.30109 2.25 7.5 2.25H10.5C10.6989 2.25 10.8897 2.32902 11.0303 2.46967C11.171 2.61032 11.25 2.80109 11.25 3V5.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                      </td>
                    </tr>
                  </table>
                  <div v-if="loading" class="panel__table-text">Загрузка...</div>
                  <div v-if="error" class="panel__table-text">{{ error }}</div>
                  <div v-if="!loading && !error && !filteredArticles.length" class="panel__table-text">
                    Ничего не найдено
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel__bottom">
        <a class="panel__back" href="#">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_78_6362)">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M15.334 7.99992C15.334 12.0499 12.0507 15.3333 8.00065 15.3333C3.95065 15.3333 0.667318 12.0499 0.667318 7.99992C0.667318 3.94992 3.95065 0.666584 8.00065 0.666585C12.0507 0.666585 15.334 3.94992 15.334 7.99992ZM9.50049 10.1333C9.50158 10.2279 9.47776 10.3211 9.43142 10.4036C9.38508 10.4861 9.31785 10.555 9.23649 10.6033C9.15745 10.6487 9.06695 10.6704 8.97589 10.6657C8.88482 10.6609 8.79706 10.63 8.72315 10.5766L5.72315 8.44325C5.65351 8.39234 5.59699 8.32557 5.55827 8.24848C5.51955 8.17139 5.49974 8.08619 5.50049 7.99992C5.49964 7.91354 5.51939 7.8282 5.55812 7.75098C5.59684 7.67377 5.65342 7.6069 5.72315 7.55592L8.72315 5.42258C8.79706 5.36916 8.88482 5.33823 8.97589 5.3335C9.06695 5.32877 9.15745 5.35044 9.23649 5.39592C9.31795 5.44427 9.38524 5.51323 9.43159 5.59586C9.47793 5.67848 9.5017 5.77186 9.50049 5.86658L9.50049 10.1333Z" fill="#D83A56"></path>
            </g>
            <defs>
              <clipPath>
                <rect width="16" height="16" fill="white" transform="matrix(4.37114e-08 -1 -1 -4.37114e-08 16 16)"></rect>
              </clipPath>
            </defs>
          </svg>вернуться на сайт
        </a>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Редактировать новость' : 'Новая новость' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow">
              <label>Заголовок</label>
              <input type="text" v-model="form.title" class="form-control" placeholder="Заголовок">
            </div>
            <div class="panel__formrow">
              <label>Категория</label>
              <select v-model="form.category" class="form-control" disabled>
                <option v-for="option in categoryOptions" :key="option.id" :value="option.id">
                  {{ option.title }}
                </option>
              </select>
            </div>
            <div class="panel__formrow">
              <label>Slug</label>
              <input
                type="text"
                v-model="form.slug"
                class="form-control"
                placeholder="my-news-slug"
                @input="slugTouched = true"
                @blur="form.slug = slugify(form.slug)"
              >
            </div>
            <div class="panel__formrow">
              <label>Текст</label>
              <textarea ref="editor" class="form-control" rows="8" placeholder="Текст новости"></textarea>
            </div>
            <div class="panel__formrow">
              <label>Картинка</label>
              <div
                class="panel__dropzone"
                @dragover.prevent
                @dragenter.prevent
                @drop.prevent="onDrop"
                @click="triggerFileSelect"
              >
                <div>Перетащите изображение сюда или нажмите для выбора</div>
              </div>
              <input
                ref="imageInput"
                type="file"
                class="form-control d-none"
                accept="image/*"
                @change="onImageChange"
              >
              <div v-if="imagePreview" class="panel__formrow">
                <img :src="imagePreview" alt="Предпросмотр" style="max-width: 100%; height: auto;">
              </div>
            </div>
            <div class="panel__formrow">
              <label>Дата публикации</label>
              <input type="datetime-local" v-model="form.publish" class="form-control">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" @click="saveArticle" :disabled="saving">
              {{ saving ? 'Сохранение...' : 'Сохранить' }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import MenuBlock from "../elements/Panel/MenuBlock.vue"
import {
  createPanelArticle,
  deletePanelArticle,
  fetchPanelArticles,
  updatePanelArticle,
} from '@/services/panel.service'

export default {
  name: 'PanelNews',
  components: { MenuBlock },
  data() {
    return {
      articles: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      slugTouched: false,
      editorInstance: null,
      imageFile: null,
      imagePreview: '',
      categoryOptions: [
        { id: 1, title: 'Новости' },
      ],
      form: {
        title: '',
        slug: '',
        body: '',
        category: 1,
        publish: '',
      },
    }
  },
  computed: {
    filteredArticles() {
      const term = this.searchTerm.trim().toLowerCase()
      if (!term) {
        return this.articles
      }
      return this.articles.filter((a) => {
        const title = String(a.title || '').toLowerCase()
        const body = String(a.body || '').toLowerCase()
        return title.includes(term) || body.includes(term)
      })
    },
  },
  watch: {
    'form.title'(value) {
      if (this.slugTouched) {
        return
      }
      this.form.slug = this.slugify(value)
    },
    'form.slug'(value) {
      if (!value) {
        this.slugTouched = false
      }
    },
  },
  mounted() {
    this.fetchArticles()
  },
  methods: {
    async fetchArticles() {
      this.loading = true
      this.error = ''
      try {
        const response = await fetchPanelArticles()
        this.articles = Array.isArray(response.data) ? response.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить новости'
      } finally {
        this.loading = false
      }
    },
    articleKey(article) {
      return article.id || article.pk || article.slug || article.title
    },
    newsLink(article) {
      const id = article.id || article.pk
      return id ? `/news/${id}` : '/news'
    },
    shortText(text) {
      const raw = String(text || '').replace(/<\/?[^>]+(>|$)/g, '')
      if (!raw) {
        return '—'
      }
      return raw.length > 120 ? `${raw.slice(0, 120)}...` : raw
    },
    normalizeDate(value) {
      if (!value) {
        return '—'
      }
      return String(value)
    },
    openCreate() {
      this.isEditing = false
      this.currentId = null
      this.form = {
        title: '',
        slug: '',
        body: '',
        category: 1,
        publish: this.formatDateTimeLocal(new Date()),
      }
      this.slugTouched = false
      this.imageFile = null
      this.imagePreview = ''
      this.showModal = true
      this.$nextTick(() => this.initEditor())
    },
    openEdit(article) {
      this.isEditing = true
      this.currentId = article.id || article.pk
      this.form = {
        title: article.title || '',
        slug: article.slug || '',
        body: article.body || '',
        category: article.category || 1,
        publish: this.formatDateTimeLocal(new Date(article.publish || Date.now())),
      }
      this.slugTouched = true
      this.imageFile = null
      this.imagePreview = article.article_image || ''
      this.showModal = true
      this.$nextTick(() => this.initEditor())
    },
    closeModal() {
      this.showModal = false
      this.destroyEditor()
    },
    initEditor() {
      if (!this.$refs.editor || !window.CKEDITOR) {
        return
      }
      if (this.editorInstance) {
        this.editorInstance.destroy()
        this.editorInstance = null
      }
      this.editorInstance = window.CKEDITOR.replace(this.$refs.editor, {
        height: 240,
        removePlugins: 'notification',
      })
      this.editorInstance.on('instanceReady', () => {
        this.editorInstance.setData(this.form.body || '')
      })
      this.editorInstance.on('change', () => {
        this.form.body = this.editorInstance.getData()
      })
    },
    destroyEditor() {
      if (this.editorInstance) {
        this.editorInstance.destroy()
        this.editorInstance = null
      }
    },
    triggerFileSelect() {
      if (this.$refs.imageInput) {
        this.$refs.imageInput.click()
      }
    },
    onImageChange(event) {
      const file = event.target.files && event.target.files[0]
      if (!file) {
        return
      }
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    onDrop(event) {
      const file = event.dataTransfer.files && event.dataTransfer.files[0]
      if (!file) {
        return
      }
      if (!file.type || !file.type.startsWith('image/')) {
        return
      }
      this.imageFile = file
      this.imagePreview = URL.createObjectURL(file)
    },
    async saveArticle() {
      if (this.editorInstance) {
        this.form.body = this.editorInstance.getData()
      }
      if (!this.form.title || !this.form.body) {
        this.error = 'Заполните заголовок и текст'
        return
      }
      this.saving = true
      this.error = ''
      try {
        const payload = new FormData()
        payload.append('title', this.form.title)
        payload.append('body', this.form.body)
        payload.append('category', this.form.category)
        if (this.form.slug) {
          payload.append('slug', this.slugify(this.form.slug))
        }
        if (this.form.publish) {
          payload.append('publish', this.normalizePublishForApi(this.form.publish))
        }
        if (this.imageFile) {
          payload.append('article_image', this.imageFile)
        }
        if (this.isEditing && this.currentId) {
          await updatePanelArticle(this.currentId, payload)
        } else {
          await createPanelArticle(payload)
        }
        this.closeModal()
        await this.fetchArticles()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить новость'
      } finally {
        this.saving = false
      }
    },
    async removeArticle(article) {
      const id = article.id || article.pk
      if (!id) {
        return
      }
      if (!confirm('Удалить новость?')) {
        return
      }
      this.error = ''
      try {
        await deletePanelArticle(id)
        await this.fetchArticles()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить новость'
      }
    },
    categoryTitle(categoryId) {
      const option = this.categoryOptions.find((item) => item.id === categoryId)
      return option ? option.title : '—'
    },
    formatDateTimeLocal(dateValue) {
      const date = dateValue instanceof Date ? dateValue : new Date(dateValue)
      if (isNaN(date.getTime())) {
        return ''
      }
      const pad = (num) => String(num).padStart(2, '0')
      const year = date.getFullYear()
      const month = pad(date.getMonth() + 1)
      const day = pad(date.getDate())
      const hours = pad(date.getHours())
      const minutes = pad(date.getMinutes())
      return `${year}-${month}-${day}T${hours}:${minutes}`
    },
    normalizePublishForApi(value) {
      const raw = String(value || '').trim()
      if (!raw) {
        return ''
      }
      const parsed = new Date(raw)
      if (isNaN(parsed.getTime())) {
        return raw
      }
      return parsed.toISOString().replace(/\.\d{3}Z$/, 'Z')
    },
    slugify(text) {
      if (!text) {
        return ''
      }
      const map = {
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z',
        и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r',
        с: 's', т: 't', у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh',
        щ: 'sch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
      }
      const lower = String(text).trim().toLowerCase()
      const translit = lower
        .split('')
        .map((ch) => (map[ch] !== undefined ? map[ch] : ch))
        .join('')
      return translit
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9_-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '')
    },
  },
}
</script>
