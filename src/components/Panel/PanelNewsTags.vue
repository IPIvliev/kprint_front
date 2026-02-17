<template>
  <div class="content content--pbn">
    <div class="panel">
      <div class="container">
        <div class="row">
          <menu-block />
          <div class="col-xxl-9 col-xl-8">
            <div class="panel__block">
              <div class="panel__head">
                <div class="panel__title">Тэги новостей<span>{{ filteredTags.length }}</span></div>
                <div class="panel__search d-none d-lg-block">
                  <div class="input">
                    <input
                      id="searchNewsTags"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по названию или slug"
                    >
                    <label class="panel__search-icon" for="searchNewsTags">
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
                    <div class="d-none d-md-block">Добавить тэг</div>
                  </div>
                </div>
              </div>
              <div class="panel__body">
                <div class="panel__search d-block d-lg-none">
                  <div class="input">
                    <input
                      id="searchNewsTagsMob"
                      v-model="searchTerm"
                      type="text"
                      placeholder="Поиск по названию или slug"
                    >
                    <label class="panel__search-icon" for="searchNewsTagsMob">
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 12.75C10.3995 12.75 12.75 10.3995 12.75 7.5C12.75 4.60051 10.3995 2.25 7.5 2.25C4.60051 2.25 2.25 4.60051 2.25 7.5C2.25 10.3995 4.60051 12.75 7.5 12.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.75 15.75L11.25 11.25" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div class="panel__table">
                  <table>
                    <tr v-for="tag in filteredTags" :key="tagKey(tag)">
                      <td>
                        <span class="panel__table-title">{{ tag.title || 'Без названия' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Slug:</span>
                        <span class="panel__table-text">{{ tag.slug || '—' }}</span>
                      </td>
                      <td>
                        <span class="panel__table-subtitle">Статей:</span>
                        <span class="panel__table-text">{{ tagArticlesCount(tag.id) }}</span>
                      </td>
                      <td>
                        <span class="panel__table-icon" @click="openEdit(tag)">
                          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 15H6L13.875 7.12498C14.2728 6.72716 14.4963 6.18759 14.4963 5.62498C14.4963 5.06237 14.2728 4.52281 13.875 4.12498C13.4772 3.72716 12.9376 3.50366 12.375 3.50366C11.8124 3.50366 11.2728 3.72716 10.875 4.12498L3 12V15Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.125 4.875L13.125 7.875" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </svg>
                        </span>
                        <span class="panel__table-icon" @click="removeTag(tag)">
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
                  <div v-if="!loading && !error && !filteredTags.length" class="panel__table-text">
                    Ничего не найдено
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal fade show" style="display: block;" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Редактировать тэг' : 'Новый тэг' }}</h5>
            <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <div class="panel__formrow">
              <label>Название</label>
              <input
                v-model="form.title"
                type="text"
                class="form-control"
                placeholder="Название тэга"
              >
            </div>
            <div class="panel__formrow">
              <label>Slug</label>
              <input
                v-model="form.slug"
                type="text"
                class="form-control"
                placeholder="news-tag"
                @input="slugTouched = true"
                @blur="form.slug = slugify(form.slug)"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn--grayborder" @click="closeModal">Отмена</button>
            <button type="button" class="btn btn--black" :disabled="saving" @click="saveTag">
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
import MenuBlock from '../elements/Panel/MenuBlock.vue'
import {
  createPanelArticleTag,
  deletePanelArticleTag,
  fetchPanelArticleTags,
  fetchPanelArticles,
  updatePanelArticleTag
} from '@/services/panel.service'

export default {
  name: 'PanelNewsTags',
  components: { MenuBlock },
  data () {
    return {
      tags: [],
      articles: [],
      searchTerm: '',
      loading: false,
      error: '',
      showModal: false,
      isEditing: false,
      saving: false,
      currentId: null,
      slugTouched: false,
      form: {
        title: '',
        slug: ''
      }
    }
  },
  computed: {
    filteredTags () {
      const term = String(this.searchTerm || '').trim().toLowerCase()
      if (!term) {
        return this.tags
      }
      return this.tags.filter((tag) => {
        const title = String(tag.title || '').toLowerCase()
        const slug = String(tag.slug || '').toLowerCase()
        return title.includes(term) || slug.includes(term)
      })
    }
  },
  watch: {
    'form.title' (value) {
      if (this.slugTouched) {
        return
      }
      this.form.slug = this.slugify(value)
    },
    'form.slug' (value) {
      if (!value) {
        this.slugTouched = false
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    async fetchData () {
      this.loading = true
      this.error = ''
      try {
        const [tagsResponse, articlesResponse] = await Promise.all([
          fetchPanelArticleTags(),
          fetchPanelArticles()
        ])
        this.tags = Array.isArray(tagsResponse.data) ? tagsResponse.data : []
        this.articles = Array.isArray(articlesResponse.data) ? articlesResponse.data : []
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить тэги'
      } finally {
        this.loading = false
      }
    },
    tagKey (tag) {
      return tag.id || tag.pk || tag.slug || tag.title
    },
    tagArticlesCount (tagId) {
      return this.articles.filter((article) => {
        if (!Array.isArray(article.tags)) {
          return false
        }
        return article.tags.some((tag) => {
          const id = typeof tag === 'object' ? tag.id : tag
          return Number(id) === Number(tagId)
        })
      }).length
    },
    openCreate () {
      this.isEditing = false
      this.currentId = null
      this.slugTouched = false
      this.form = {
        title: '',
        slug: ''
      }
      this.showModal = true
    },
    openEdit (tag) {
      this.isEditing = true
      this.currentId = tag.id || tag.pk
      this.slugTouched = true
      this.form = {
        title: tag.title || '',
        slug: tag.slug || ''
      }
      this.showModal = true
    },
    closeModal () {
      this.showModal = false
    },
    async saveTag () {
      const title = String(this.form.title || '').trim()
      if (!title) {
        this.error = 'Заполните название тэга'
        return
      }

      this.saving = true
      this.error = ''
      try {
        const payload = {
          title,
          slug: this.form.slug ? this.slugify(this.form.slug) : ''
        }
        if (!payload.slug) {
          delete payload.slug
        }
        if (this.isEditing && this.currentId) {
          await updatePanelArticleTag(this.currentId, payload)
        } else {
          await createPanelArticleTag(payload)
        }
        this.closeModal()
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось сохранить тэг'
      } finally {
        this.saving = false
      }
    },
    async removeTag (tag) {
      const id = tag.id || tag.pk
      if (!id) {
        return
      }
      if (!confirm('Удалить тэг?')) {
        return
      }

      this.error = ''
      try {
        await deletePanelArticleTag(id)
        await this.fetchData()
      } catch (err) {
        this.error = err.userMessage || 'Не удалось удалить тэг'
      }
    },
    slugify (text) {
      if (!text) {
        return ''
      }
      const map = {
        а: 'a',
        б: 'b',
        в: 'v',
        г: 'g',
        д: 'd',
        е: 'e',
        ё: 'e',
        ж: 'zh',
        з: 'z',
        и: 'i',
        й: 'y',
        к: 'k',
        л: 'l',
        м: 'm',
        н: 'n',
        о: 'o',
        п: 'p',
        р: 'r',
        с: 's',
        т: 't',
        у: 'u',
        ф: 'f',
        х: 'h',
        ц: 'ts',
        ч: 'ch',
        ш: 'sh',
        щ: 'sch',
        ъ: '',
        ы: 'y',
        ь: '',
        э: 'e',
        ю: 'yu',
        я: 'ya'
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
    }
  }
}
</script>
