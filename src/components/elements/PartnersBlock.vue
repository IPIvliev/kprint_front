<template>
  <div :class="['usage', wrapperClass, backgroundClass]">
    <div class="container">
      <h2 class="title">{{ title }}</h2>

      <div class="row gy-4">
        <div v-for="company in visibleCompanies" :key="company.id" class="col-xxl-3 col-xl-4 col-md-6">
          <div class="partner-card">
            <div class="partner-img">
              <img :src="resolveMediaUrl(company.logo_url) || fallbackLogo" :alt="company.name || 'Company logo'">
            </div>
            <div class="partner-content">
              <div class="partner-title">
                {{ company.name || 'Company' }}
              </div>
              <div v-if="company.location" class="partner-meta">{{ company.location }}</div>
              <a
                v-if="company.website"
                class="partner-link"
                :href="company.website"
                target="_blank"
                rel="noopener"
              >
                {{ company.website }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-if="loading" class="partners-state">Загрузка компаний...</div>
      <div v-else-if="error" class="partners-state">{{ error }}</div>
      <div v-else-if="!visibleCompanies.length" class="partners-state">Пока нет компаний для отображения</div>
    </div>
  </div>
</template>

<script>
import fallbackLogo from '@/assets/img/partners/partner-1.png'
import { fetchCompanyCategories, fetchCompanies } from '@/services/company.service'

export default {
  name: 'PartnersBlock',
  props: {
    title: {
      type: String,
      default: 'Наши партнеры'
    },
    category: {
      type: [String, Number],
      default: ''
    },
    fallbackCategoryTitle: {
      type: String,
      default: ''
    },
    fallbackCategoryTitles: {
      type: Array,
      default: () => []
    },
    fallbackToAll: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 8
    },
    wrapperClass: {
      type: String,
      default: 'cmp-components-elements-partnersblock'
    },
    backgroundClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      companies: [],
      loading: false,
      error: '',
      fallbackLogo
    }
  },
  computed: {
    visibleCompanies () {
      const limit = Number(this.limit || 0)
      if (limit > 0) {
        return this.companies.slice(0, limit)
      }
      return this.companies
    }
  },
  watch: {
    category () {
      this.loadCompanies()
    },
    fallbackCategoryTitle () {
      this.loadCompanies()
    },
    fallbackCategoryTitles () {
      this.loadCompanies()
    }
  },
  mounted () {
    this.loadCompanies()
  },
  methods: {
    normalizeText (value) {
      return String(value || '').trim().toLowerCase()
    },
    resolveMediaUrl (path) {
      const value = String(path || '').trim()
      if (!value) {
        return ''
      }
      if (value.startsWith('http://') || value.startsWith('https://')) {
        return value
      }
      const base = String(process.env.VUE_APP_API_BASE || '').replace(/\/+$/, '')
      if (!base) {
        return value
      }
      if (value.startsWith('/')) {
        return `${base}${value}`
      }
      return `${base}/${value}`
    },
    async loadByCategoryValue (categoryValue) {
      if (!String(categoryValue || '').trim()) {
        const response = await fetchCompanies()
        return Array.isArray(response.data) ? response.data : []
      }
      const response = await fetchCompanies({ category: categoryValue })
      return Array.isArray(response.data) ? response.data : []
    },
    async loadCompanies () {
      this.loading = true
      this.error = ''
      try {
        const categoryValue = String(this.category || '').trim()
        let companies = await this.loadByCategoryValue(categoryValue)

        const titles = [
          String(this.fallbackCategoryTitle || '').trim(),
          ...((Array.isArray(this.fallbackCategoryTitles) ? this.fallbackCategoryTitles : [])
            .map((item) => String(item || '').trim()))
        ].filter(Boolean)

        if (!companies.length && categoryValue && titles.length) {
          const categoriesResponse = await fetchCompanyCategories({ with_companies: true })
          const categories = Array.isArray(categoriesResponse.data) ? categoriesResponse.data : []
          const fallbackTitles = titles.map((item) => this.normalizeText(item))
          const matchedCategory = categories.find((item) => {
            const categoryTitle = this.normalizeText(item.title)
            return fallbackTitles.some((candidate) => (
              categoryTitle === candidate ||
              categoryTitle.includes(candidate) ||
              candidate.includes(categoryTitle)
            ))
          })
          if (matchedCategory && matchedCategory.id) {
            companies = await this.loadByCategoryValue(matchedCategory.id)
          }
        }

        if (!companies.length && this.fallbackToAll) {
          companies = await this.loadByCategoryValue('')
        }

        this.companies = companies
      } catch (err) {
        this.error = err.userMessage || 'Не удалось загрузить компании'
        this.companies = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.partner-meta {
  margin-bottom: 8px;
  color: #475467;
  font-size: 14px;
  line-height: 1.35;
}

.partner-link {
  display: inline-block;
  color: #d83a56;
  text-decoration: underline;
  word-break: break-word;
  font-size: 14px;
  line-height: 1.35;
}

.partners-state {
  margin-top: 20px;
  color: #667085;
  font-size: 15px;
}
</style>
