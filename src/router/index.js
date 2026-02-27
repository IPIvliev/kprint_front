import { createRouter, createWebHistory } from 'vue-router'
import { publicApi } from '@/services/http'

const Home = () => import('../views/Home.vue')
const Registration = () => import('../views/Registration.vue')
const Login = () => import('../views/Login.vue')
const ForgotPassword = () => import('../views/ForgotPassword.vue')
const ResetPassword = () => import('../views/ResetPassword.vue')
const About = () => import('../views/About.vue')
const Innovations = () => import('../views/Innovations.vue')
const News = () => import('../views/News.vue')
const Article = () => import('../views/Article.vue')
const Gallery = () => import('../views/Gallery.vue')
const Contact = () => import('../views/Contact.vue')
const NotFound = () => import('../views/404.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/registration',
    name: 'Registration',
    component: Registration
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/reset-password/:uid/:token',
    name: 'ResetPassword',
    component: ResetPassword
  },
  {
    path: '/it-innovations',
    name: 'Innovations',
    component: Innovations
  },
  {
    path: '/innovations',
    redirect: '/it-innovations'
  },
  {
    path: '/news',
    name: 'News',
    component: News
  },
  {
    path: '/news/tag/:tagSlug',
    name: 'NewsByTag',
    component: News
  },
  {
    path: '/news/category/:categorySlug',
    name: 'NewsByCategory',
    component: News
  },
  {
    path: '/shop',
    children: [
      {
        path: '',
        name: 'MainShop',
        component: () => import('@/views/Shop/ShopCategories.vue')
      },
      {
        path: 'categories/:categorySlug',
        name: 'Categories',
        component: () => import('@/views/Shop/ShopCategories.vue')
      },
      {
        path: 'categories/:categorySlug/:productSlug',
        name: 'Product',
        component: () => import('@/views/Shop/ProductPage.vue')
      },
      {
        path: 'categories/:categorySlug/showcase',
        name: 'Showcase',
        component: () => import('@/views/Shop/MainShop.vue')
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/Shop/Cart.vue')
      },
      {
        path: 'order',
        name: 'ShopOrder',
        component: () => import('@/views/Shop/ShopOrder.vue')
      }
    ]
  },
  {
    path: '/study',
    children: [
      {
        path: '',
        name: 'MainStudy',
        component: () => import('../views/Study/MainStudy.vue')
      },
      {
        path: 'course/:courseSlug',
        name: 'CoursePage',
        component: () => import('@/views/Study/CoursePage.vue')
      }
    ]

  },
  {
    path: '/print',
    name: 'MainPrint',
    component: () => import('../views/Print/MainPrint.vue')
  },
  {
    path: '/news/:articleSlug',
    name: 'Article',
    component: Article
  },
  {
    path: '/news/:legacyId(\\d+)/:legacySlug?',
    redirect: (to) => ({
      name: 'Article',
      params: {
        articleSlug: to.params.legacySlug || to.params.legacyId
      },
      query: to.query,
      hash: to.hash
    })
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/dealers',
    name: 'Dealers',
    component: () => import('../views/Dealers.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/legal/personal-data-policy',
    name: 'LegalPersonalDataPolicy',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'personalDataPolicy'
    }
  },
  {
    path: '/legal/pd-consent',
    name: 'LegalPdConsent',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'pdConsent'
    }
  },
  {
    path: '/legal/ads-consent',
    name: 'LegalAdsConsent',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'adsConsent'
    }
  },
  {
    path: '/legal/terms-offer',
    name: 'LegalTermsOffer',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'termsOffer'
    }
  },
  {
    path: '/legal/delivery-payment',
    name: 'LegalDeliveryPayment',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'deliveryPayment'
    }
  },
  {
    path: '/legal/returns',
    name: 'LegalReturns',
    component: () => import('@/views/LegalDocument.vue'),
    meta: {
      legalDocKey: 'returns'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/panel',
    children: [
      {
        path: '',
        name: 'Panel',
        component: () => import('../views/Panel/Panel.vue')
      },
      {
        path: 'user',
        name: 'PanelUser',
        component: () => import('../views/Panel/Panel.vue')
      },
      {
        path: 'study',
        name: 'PanelStudy',
        redirect: '/panel/study/my/courses'
      },
      {
        path: 'study/my/courses',
        name: 'PanelStudyUserCourses',
        component: () => import('../views/Panel/PanelStudyUser.vue')
      },
      {
        path: 'study/my/courses/:enrollmentId',
        name: 'PanelStudyUserCourse',
        component: () => import('../views/Panel/PanelStudyUser.vue')
      },
      {
        path: 'study/my/courses/:enrollmentId/lessons',
        name: 'PanelStudyUserLessons',
        component: () => import('../views/Panel/PanelStudyUser.vue')
      },
      {
        path: 'study/my/courses/:enrollmentId/lessons/:lessonId',
        name: 'PanelStudyUserLesson',
        component: () => import('../views/Panel/PanelStudyUser.vue')
      },
      {
        path: 'study/my/courses/:enrollmentId/exams/:examId',
        name: 'PanelStudyUserExam',
        component: () => import('../views/Panel/PanelStudyUser.vue')
      },
      {
        path: 'manager',
        name: 'PanelManager',
        component: () => import('../views/Panel/PanelManager.vue')
      },
      {
        path: 'callback/requests',
        name: 'PanelCallbackRequests',
        component: () => import('../views/Panel/PanelCallbackRequests.vue')
      },
      {
        path: 'edit',
        name: 'PanelEdit',
        component: () => import('../views/Panel/PanelEdit.vue')
      },
      {
        path: 'shop',
        name: 'PanelShop',
        component: () => import('../views/Panel/PanelPrinters.vue')
      },
      {
        path: 'shop/categories',
        name: 'PanelShopCategories',
        component: () => import('../views/Panel/PanelShopCategories.vue')
      },
      {
        path: 'shop/products',
        name: 'PanelShopProducts',
        component: () => import('../views/Panel/PanelShopProducts.vue')
      },
      {
        path: 'shop/orders',
        name: 'PanelShopOrders',
        component: () => import('../views/Panel/PanelShopOrders.vue')
      },
      {
        path: 'shop/discounts',
        name: 'PanelShopDiscounts',
        component: () => import('../views/Panel/PanelShopDiscounts.vue')
      },
      {
        path: 'shop/filter-attrs',
        name: 'PanelShopFilterAttrs',
        component: () => import('../views/Panel/PanelShopFilterAttrs.vue')
      },
      {
        path: 'shop/filter-attr-list-values',
        name: 'PanelShopFilterAttrListValues',
        component: () => import('../views/Panel/PanelShopFilterAttrListValues.vue')
      },
      {
        path: 'shop/filter-attr-values',
        name: 'PanelShopFilterAttrValues',
        component: () => import('../views/Panel/PanelShopFilterAttrValues.vue')
      },
      {
        path: 'shop/pochta-settings',
        name: 'PanelShopPochtaSettings',
        component: () => import('../views/Panel/PanelShopPochtaSettings.vue')
      },
      {
        path: 'shop/sdek-settings',
        name: 'PanelShopSdekSettings',
        component: () => import('../views/Panel/PanelShopSdekSettings.vue')
      },
      {
        path: 'models',
        name: 'PanelModels',
        redirect: '/panel/print/orders'
      },
      {
        path: 'print/orders',
        name: 'PanelPrintOrders',
        component: () => import('../views/Panel/PanelPrintOrders.vue')
      },
      {
        path: 'print/material-categories',
        name: 'PanelPrintMaterialCategories',
        component: () => import('../views/Panel/PanelPrintMaterialCategories.vue')
      },
      {
        path: 'print/materials',
        name: 'PanelPrintMaterials',
        component: () => import('../views/Panel/PanelPrintMaterials.vue')
      },
      {
        path: 'news',
        redirect: '/panel/news/articles'
      },
      {
        path: 'news/articles',
        name: 'PanelNewsArticles',
        component: () => import('../views/Panel/PanelNews.vue')
      },
      {
        path: 'news/categories',
        name: 'PanelNewsCategories',
        component: () => import('../views/Panel/PanelNewsCategories.vue')
      },
      {
        path: 'news/tags',
        name: 'PanelNewsTags',
        component: () => import('../views/Panel/PanelNewsTags.vue')
      },
      {
        path: 'gallery/categories',
        name: 'PanelGalleryCategories',
        component: () => import('../views/Panel/PanelGalleryCategories.vue')
      },
      {
        path: 'gallery/items',
        name: 'PanelGalleryItems',
        component: () => import('../views/Panel/PanelGalleryItems.vue')
      },
      {
        path: 'companies/categories',
        name: 'PanelCompanyCategories',
        component: () => import('../views/Panel/PanelCompanyCategories.vue')
      },
      {
        path: 'companies/list',
        name: 'PanelCompanies',
        component: () => import('../views/Panel/PanelCompanies.vue')
      },
      {
        path: 'study/enrollments',
        name: 'PanelStudyEnrollments',
        component: () => import('../views/Panel/PanelStudyEnrollments.vue')
      },
      {
        path: 'study/categories',
        name: 'PanelStudyCategories',
        component: () => import('../views/Panel/PanelStudyCategories.vue')
      },
      {
        path: 'study/courses',
        name: 'PanelStudyCourses',
        component: () => import('../views/Panel/PanelStudyCourses.vue')
      },
      {
        path: 'study/lessons',
        name: 'PanelStudyLessons',
        component: () => import('../views/Panel/PanelStudyLessons.vue')
      },
      {
        path: 'study/exams',
        name: 'PanelStudyExams',
        component: () => import('../views/Panel/PanelStudyExams.vue')
      },
      {
        path: 'study/teachers',
        name: 'PanelStudyTeachers',
        component: () => import('../views/Panel/PanelStudyTeachers.vue')
      },
      {
        path: 'study/prices',
        name: 'PanelStudyPrices',
        component: () => import('../views/Panel/PanelStudyPrices.vue')
      },
      {
        path: 'study/feedbacks',
        name: 'PanelStudyFeedbacks',
        component: () => import('../views/Panel/PanelStudyFeedbacks.vue')
      }
      // {
      //   path: 'ears',
      //   name: 'PanelEars',
      //   component: () => import('../views/Panel/PanelStorage.vue'),
      // },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

function ensureDescriptionMetaTag () {
  return ensureMetaTag('description', 'name')
}

const SITE_URL = String(process.env.VUE_APP_SITE_URL || 'https://gorkyliquid.ru').trim().replace(/\/+$/, '')
const API_BASE = String(process.env.VUE_APP_API_BASE || '').trim().replace(/\/+$/, '')
const DEFAULT_TITLE = 'Gorky Liquid | Аддитивные технологии и материалы'
const DEFAULT_DESCRIPTION = 'Производство материалов и решений для аддитивных технологий: смолы, филаменты, оборудование, обучение и внедрение.'
const NOINDEX_ROUTE_NAMES = new Set([
  'Login',
  'Registration',
  'ForgotPassword',
  'ResetPassword',
  'Cart',
  'ShopOrder',
  'Panel',
  'PanelUser',
  'PanelManager'
])
const SEO_ENTITY_CACHE = new Map()
let seoNavigationId = 0

const ROUTE_SEO = {
  Home: {
    title: 'Gorky Liquid | Аддитивные технологии и материалы',
    description: DEFAULT_DESCRIPTION
  },
  About: {
    title: 'О компании | Gorky Liquid',
    description: 'Экспертиза Gorky Liquid в области аддитивных технологий, материалов и внедрения решений для производства.'
  },
  Contact: {
    title: 'Контакты | Gorky Liquid',
    description: 'Свяжитесь с Gorky Liquid: консультации, сотрудничество, поставки материалов и оборудование.'
  },
  Dealers: {
    title: 'Дилерам и партнёрам | Gorky Liquid',
    description: 'Сотрудничество с Gorky Liquid: оптовые поставки, обучение, консалтинг и техническая поддержка.'
  },
  MainShop: {
    title: 'Каталог продукции | Gorky Liquid',
    description: 'Каталог продукции для 3D-печати: материалы, оборудование и решения для аддитивного производства.'
  },
  Showcase: {
    title: 'Каталог продукции | Gorky Liquid',
    description: 'Подбор товаров по характеристикам и цене в каталоге Gorky Liquid.'
  },
  Product: {
    title: 'Карточка товара | Gorky Liquid',
    description: 'Характеристики, описание и наличие продукции Gorky Liquid.'
  },
  News: {
    title: 'Новости и публикации | Gorky Liquid',
    description: 'Новости компании, кейсы и экспертные материалы об аддитивных технологиях.'
  },
  Article: {
    title: 'Публикация | Gorky Liquid',
    description: 'Статья Gorky Liquid об аддитивных технологиях, оборудовании и материалах.'
  },
  Gallery: {
    title: 'Галерея проектов | Gorky Liquid',
    description: 'Примеры изделий и реализованных задач в области аддитивных технологий.'
  },
  MainStudy: {
    title: 'Обучение аддитивным технологиям | Gorky Liquid',
    description: 'Курсы и программы обучения по аддитивным технологиям и внедрению на производстве.'
  },
  MainPrint: {
    title: 'Услуги 3D-печати | Gorky Liquid',
    description: 'Услуги 3D-печати и консультации по подбору технологий и материалов.'
  },
  Innovations: {
    title: 'IT-услуги и инновации | Gorky Liquid',
    description: 'Разработка ПО, компьютерное зрение и нейросетевые решения для задач аддитивного производства.'
  },
  LegalPersonalDataPolicy: {
    title: 'Политика ПДн | Gorky Liquid',
    description: 'Политика обработки персональных данных на сайте Gorky Liquid.'
  },
  LegalPdConsent: {
    title: 'Согласие на ПДн | Gorky Liquid',
    description: 'Согласие пользователя на обработку персональных данных.'
  },
  LegalAdsConsent: {
    title: 'Согласие на рассылку | Gorky Liquid',
    description: 'Согласие на получение информационных и рекламных сообщений.'
  },
  LegalTermsOffer: {
    title: 'Соглашение и оферта | Gorky Liquid',
    description: 'Пользовательское соглашение и публичная оферта.'
  },
  LegalDeliveryPayment: {
    title: 'Доставка и оплата | Gorky Liquid',
    description: 'Условия оплаты, доставки и самовывоза продукции.'
  },
  LegalReturns: {
    title: 'Возвраты и отмены | Gorky Liquid',
    description: 'Порядок возврата и отмены заказа.'
  }
}

function ensureMetaTag (name, attrName = 'name') {
  if (typeof document === 'undefined') {
    return null
  }
  let meta = document.querySelector(`meta[${attrName}="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.setAttribute(attrName, name)
    document.head.appendChild(meta)
  }
  return meta
}

function ensureRobotsMetaTag () {
  return ensureMetaTag('robots', 'name')
}

function ensureOpenGraphMetaTag (propertyName) {
  return ensureMetaTag(propertyName, 'property')
}

function ensureCanonicalLinkTag () {
  if (typeof document === 'undefined') {
    return null
  }
  let link = document.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  return link
}

function ensureJsonLdScriptTag (id) {
  if (typeof document === 'undefined') {
    return null
  }
  let script = document.querySelector(`script[data-seo-jsonld="${id}"]`)
  if (!script) {
    script = document.createElement('script')
    script.setAttribute('type', 'application/ld+json')
    script.setAttribute('data-seo-jsonld', id)
    document.head.appendChild(script)
  }
  return script
}

function isNoindexRoute (to) {
  if (!to) {
    return false
  }
  if (to.path.startsWith('/panel')) {
    return true
  }
  const routeName = String(to.name || '')
  if (NOINDEX_ROUTE_NAMES.has(routeName)) {
    return true
  }
  return Boolean(to.meta && to.meta.noindex)
}

function resolveSeoMeta (to) {
  const routeName = String(to && to.name ? to.name : '')
  const mapped = ROUTE_SEO[routeName] || {}
  const title = mapped.title || (to.meta && to.meta.title) || DEFAULT_TITLE
  const description = mapped.description || (to.meta && to.meta.description) || DEFAULT_DESCRIPTION
  return { title, description }
}

function resolveOpenGraphType (to) {
  const routeName = String(to && to.name ? to.name : '')
  if (routeName === 'Article') {
    return 'article'
  }
  if (routeName === 'Product') {
    return 'product'
  }
  return 'website'
}

function buildCanonicalUrl (to) {
  const routePath = String(to && to.path ? to.path : '/')
  const normalizedPath = routePath.startsWith('/') ? routePath : `/${routePath}`
  const suffix = normalizedPath === '/' ? '' : normalizedPath
  return `${SITE_URL}${suffix}`
}

function normalizeText (value) {
  return String(value || '').replace(/\s+/g, ' ').trim()
}

function stripHtml (value) {
  return normalizeText(String(value || '').replace(/<[^>]*>/g, ' '))
}

function toNumber (value) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function toPositiveInteger (value) {
  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < 0) {
    return null
  }
  return Math.trunc(parsed)
}

function normalizeIsoDate (value) {
  const raw = String(value || '').trim()
  if (!raw) {
    return null
  }
  const parsed = new Date(raw)
  if (Number.isNaN(parsed.getTime())) {
    return null
  }
  return parsed.toISOString()
}

function resolveMediaUrl (value) {
  const raw = String(value || '').trim()
  if (!raw) {
    return ''
  }
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('data:')) {
    return raw
  }
  if (!API_BASE) {
    return raw
  }
  if (raw.startsWith('/')) {
    return `${API_BASE}${raw}`
  }
  return `${API_BASE}/${raw}`
}

function buildProductSchema (product, canonicalUrl) {
  const name = normalizeText(product && product.name)
  if (!name) {
    return null
  }

  const primaryImage = resolveMediaUrl(product && product.photo)
  const galleryImages = Array.isArray(product && product.product_images)
    ? product.product_images.map((item) => resolveMediaUrl(item && item.src)).filter(Boolean)
    : []
  const image = Array.from(new Set([primaryImage, ...galleryImages].filter(Boolean)))
  const description = stripHtml(product && product.description)
  const sku = normalizeText((product && product.article) || (product && product.id))
  const category = normalizeText(product && product.category_title)
  const price = toNumber(product && product.price)
  const stock = toPositiveInteger(product && product.stock)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    url: canonicalUrl,
    brand: {
      '@type': 'Brand',
      name: 'Gorky Liquid'
    }
  }

  if (description) {
    schema.description = description
  }
  if (sku) {
    schema.sku = sku
  }
  if (category) {
    schema.category = category
  }
  if (image.length) {
    schema.image = image
  }
  if (Number.isFinite(price)) {
    schema.offers = {
      '@type': 'Offer',
      url: canonicalUrl,
      priceCurrency: 'RUB',
      price: price.toFixed(2),
      availability: stock && stock > 0
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition'
    }
  }

  return schema
}

function buildArticleSchema (article, canonicalUrl) {
  const headline = normalizeText(article && article.title)
  if (!headline) {
    return null
  }

  const description = stripHtml(article && article.body).slice(0, 300)
  const publishIso = normalizeIsoDate(article && (article.publish_iso || article.publish))
  const updatedIso = normalizeIsoDate(article && (article.updated || article.publish_iso || article.publish))
  const image = resolveMediaUrl(article && article.article_image)
  const section = normalizeText(
    (article && article.category_detail && article.category_detail.title) ||
    (article && article.category_title)
  )
  const keywords = Array.isArray(article && article.tags)
    ? article.tags
      .map((tag) => normalizeText(tag && typeof tag === 'object' ? tag.title : tag))
      .filter(Boolean)
      .join(', ')
    : ''

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    url: canonicalUrl,
    inLanguage: 'ru-RU',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    },
    author: {
      '@type': 'Organization',
      name: 'Gorky Liquid'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Gorky Liquid',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/favicon.ico`
      }
    }
  }

  if (description) {
    schema.description = description
  }
  if (image) {
    schema.image = [image]
  }
  if (publishIso) {
    schema.datePublished = publishIso
  }
  if (updatedIso) {
    schema.dateModified = updatedIso
  }
  if (section) {
    schema.articleSection = section
  }
  if (keywords) {
    schema.keywords = keywords
  }

  return schema
}

async function fetchSeoEntity (cacheKey, requestPath) {
  if (SEO_ENTITY_CACHE.has(cacheKey)) {
    return SEO_ENTITY_CACHE.get(cacheKey)
  }
  try {
    const response = await publicApi.get(requestPath)
    const payload = response && response.data ? response.data : null
    SEO_ENTITY_CACHE.set(cacheKey, payload)
    return payload
  } catch (error) {
    SEO_ENTITY_CACHE.delete(cacheKey)
    return null
  }
}

async function resolveEntitySchema (to, canonicalUrl) {
  const routeName = String(to && to.name ? to.name : '')
  if (routeName === 'Product') {
    const productSlug = String(to && to.params && to.params.productSlug ? to.params.productSlug : '').trim()
    if (!productSlug) {
      return null
    }
    const payload = await fetchSeoEntity(
      `product:${productSlug}`,
      `/api/shop/products/${encodeURIComponent(productSlug)}`
    )
    return buildProductSchema(payload, canonicalUrl)
  }

  if (routeName === 'Article') {
    const articleSlug = String(to && to.params && to.params.articleSlug ? to.params.articleSlug : '').trim()
    if (!articleSlug) {
      return null
    }
    const payload = await fetchSeoEntity(
      `article:${articleSlug}`,
      `/api/articles/${encodeURIComponent(articleSlug)}/`
    )
    return buildArticleSchema(payload, canonicalUrl)
  }

  return null
}

function buildBreadcrumbSchema (to, canonicalUrl) {
  if (!to || !Array.isArray(to.matched) || !to.matched.length) {
    return null
  }
  const items = to.matched
    .filter((record) => record && record.path && !record.path.startsWith('/panel'))
    .map((record, index) => {
      const recordPath = String(record.path || '/').replace(/:([^/]+)/g, (match, paramName) => {
        const value = to.params && Object.prototype.hasOwnProperty.call(to.params, paramName)
          ? to.params[paramName]
          : ''
        return value ? String(value) : ''
      })
      const normalizedPath = recordPath.startsWith('/') ? recordPath : `/${recordPath}`
      const url = `${SITE_URL}${normalizedPath === '/' ? '' : normalizedPath}`
      return {
        '@type': 'ListItem',
        position: index + 1,
        name: String(record.name || 'Страница'),
        item: url
      }
    })
  if (!items.length) {
    return null
  }
  if (items.length) {
    items[items.length - 1].item = canonicalUrl
  }
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  }
}

async function updateJsonLd (to, canonicalUrl, title, description, navigationId) {
  const organizationScript = ensureJsonLdScriptTag('organization')
  if (organizationScript) {
    organizationScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gorky Liquid',
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
      sameAs: [
        'https://vk.com/gorky_liquid',
        'https://dzen.ru/gorky_liquid'
      ]
    })
  }

  const webpageScript = ensureJsonLdScriptTag('webpage')
  if (webpageScript) {
    webpageScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: title,
      description,
      url: canonicalUrl
    })
  }

  const breadcrumbs = buildBreadcrumbSchema(to, canonicalUrl)
  const breadcrumbsScript = ensureJsonLdScriptTag('breadcrumbs')
  if (breadcrumbsScript) {
    breadcrumbsScript.textContent = breadcrumbs ? JSON.stringify(breadcrumbs) : ''
  }

  const entityScript = ensureJsonLdScriptTag('entity')
  if (entityScript) {
    const entitySchema = await resolveEntitySchema(to, canonicalUrl)
    if (navigationId !== seoNavigationId) {
      return
    }
    entityScript.textContent = entitySchema ? JSON.stringify(entitySchema) : ''
  }
}

function triggerPrerenderReadyEvent () {
  if (typeof document === 'undefined') {
    return
  }
  const emit = () => document.dispatchEvent(new Event('app-rendered'))
  if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
    window.requestAnimationFrame(emit)
    return
  }
  setTimeout(emit, 0)
}

router.afterEach(async (to) => {
  if (typeof document === 'undefined') {
    return
  }
  const navigationId = ++seoNavigationId
  const { title, description } = resolveSeoMeta(to)
  const canonicalUrl = buildCanonicalUrl(to)
  const robots = isNoindexRoute(to)
    ? 'noindex,nofollow,noarchive'
    : 'index,follow,max-image-preview:large'

  document.title = title
  const descriptionMeta = ensureDescriptionMetaTag()
  if (descriptionMeta) {
    descriptionMeta.setAttribute('content', description)
  }

  const robotsMeta = ensureRobotsMetaTag()
  if (robotsMeta) {
    robotsMeta.setAttribute('content', robots)
  }

  const canonicalLink = ensureCanonicalLinkTag()
  if (canonicalLink) {
    canonicalLink.setAttribute('href', canonicalUrl)
  }

  const ogTitle = ensureOpenGraphMetaTag('og:title')
  const ogDescription = ensureOpenGraphMetaTag('og:description')
  const ogUrl = ensureOpenGraphMetaTag('og:url')
  const ogType = ensureOpenGraphMetaTag('og:type')
  const twitterCard = ensureMetaTag('twitter:card', 'name')
  if (ogTitle) {
    ogTitle.setAttribute('content', title)
  }
  if (ogDescription) {
    ogDescription.setAttribute('content', description)
  }
  if (ogUrl) {
    ogUrl.setAttribute('content', canonicalUrl)
  }
  if (ogType) {
    ogType.setAttribute('content', resolveOpenGraphType(to))
  }
  if (twitterCard) {
    twitterCard.setAttribute('content', 'summary_large_image')
  }

  await updateJsonLd(to, canonicalUrl, title, description, navigationId)
  if (navigationId !== seoNavigationId) {
    return
  }
  triggerPrerenderReadyEvent()
})
export default router
