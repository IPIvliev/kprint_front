import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('../views/Home.vue')
const Registration = () => import('../views/Registration.vue')
const Login = () => import('../views/Login.vue')
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
    path: '/innovations',
    name: 'Innovations',
    component: Innovations
  },
  {
    path: '/news',
    name: 'News',
    component: News,
  },
  {
    path: '/news/tag/:tagSlug',
    name: 'NewsByTag',
    component: News,
  },
  {
    path: '/news/category/:categorySlug',
    name: 'NewsByCategory',
    component: News,
  },
  {
    path: '/shop',
    children: [
      {
        path: '',
        name: 'MainShop',
        component: () => import('@/views/Shop/ShopCategories.vue'),
      },
      {
        path: 'categories/:id',
        name: 'Categories',
        component: () => import('@/views/Shop/ShopCategories.vue'),
      },
      {
        path: 'categories/:id/:productid',
        name: 'Product',
        component: () => import('@/views/Shop/ProductPage.vue'),
      },
      {
        path: 'categories/:id/showcase',
        name: 'Showcase',
        component: () => import('@/views/Shop/MainShop.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/Shop/Cart.vue'),
      },
      {
        path: 'order',
        name: 'ShopOrder',
        component: () => import('@/views/Shop/ShopOrder.vue'),
      },
    ]
  },
  {
    path: '/study',
    children: [
      {
        path: '',
        name: 'MainStudy',
        component: () => import('../views/Study/MainStudy.vue'),
      },
      {
        path: 'course/:id',
        name: 'CoursePage',
        component: () => import('@/views/Study/CoursePage.vue'),
      },
    ]
    
    
  },
  {
    path: '/print',
    name: 'MainPrint',
    component: () => import('../views/Print/MainPrint.vue'),
  },
  {
    path: '/news/:id',
    name: 'Article',
    component: Article,
  },
  {
    path: '/gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/dealers',
    name: 'Dealers',
    component: () => import('../views/Dealers.vue'),
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
        component: () => import('../views/Panel/Panel.vue'),
      },
      {
        path: 'edit',
        name: 'PanelEdit',
        component: () => import('../views/Panel/PanelEdit.vue'),
      },
      {
        path: 'shop',
        name: 'PanelShop',
        component: () => import('../views/Panel/PanelPrinters.vue'),
      },
      {
        path: 'shop/categories',
        name: 'PanelShopCategories',
        component: () => import('../views/Panel/PanelShopCategories.vue'),
      },
      {
        path: 'shop/products',
        name: 'PanelShopProducts',
        component: () => import('../views/Panel/PanelShopProducts.vue'),
      },
      {
        path: 'shop/orders',
        name: 'PanelShopOrders',
        component: () => import('../views/Panel/PanelShopOrders.vue'),
      },
      {
        path: 'shop/discounts',
        name: 'PanelShopDiscounts',
        component: () => import('../views/Panel/PanelShopDiscounts.vue'),
      },
      {
        path: 'shop/filter-attrs',
        name: 'PanelShopFilterAttrs',
        component: () => import('../views/Panel/PanelShopFilterAttrs.vue'),
      },
      {
        path: 'shop/filter-attr-list-values',
        name: 'PanelShopFilterAttrListValues',
        component: () => import('../views/Panel/PanelShopFilterAttrListValues.vue'),
      },
      {
        path: 'shop/filter-attr-values',
        name: 'PanelShopFilterAttrValues',
        component: () => import('../views/Panel/PanelShopFilterAttrValues.vue'),
      },
      {
        path: 'shop/pochta-settings',
        name: 'PanelShopPochtaSettings',
        component: () => import('../views/Panel/PanelShopPochtaSettings.vue'),
      },
      {
        path: 'shop/sdek-settings',
        name: 'PanelShopSdekSettings',
        component: () => import('../views/Panel/PanelShopSdekSettings.vue'),
      },
      {
        path: 'models',
        name: 'PanelModels',
        component: () => import('../views/Panel/PanelModels.vue'),
      },      
      {
        path: 'news',
        redirect: '/panel/news/articles',
      },
      {
        path: 'news/articles',
        name: 'PanelNewsArticles',
        component: () => import('../views/Panel/PanelNews.vue'),
      },
      {
        path: 'news/categories',
        name: 'PanelNewsCategories',
        component: () => import('../views/Panel/PanelNewsCategories.vue'),
      },
      {
        path: 'news/ai-articles',
        name: 'PanelNewsAiArticles',
        component: () => import('../views/Panel/PanelNewsAiArticles.vue'),
      },
      {
        path: 'news/tags',
        name: 'PanelNewsTags',
        component: () => import('../views/Panel/PanelNewsTags.vue'),
      },
      {
        path: 'study/categories',
        name: 'PanelStudyCategories',
        component: () => import('../views/Panel/PanelStudyCategories.vue'),
      },
      {
        path: 'study/courses',
        name: 'PanelStudyCourses',
        component: () => import('../views/Panel/PanelStudyCourses.vue'),
      },
      {
        path: 'study/lessons',
        name: 'PanelStudyLessons',
        component: () => import('../views/Panel/PanelStudyLessons.vue'),
      },
      {
        path: 'study/teachers',
        name: 'PanelStudyTeachers',
        component: () => import('../views/Panel/PanelStudyTeachers.vue'),
      },
      {
        path: 'study/prices',
        name: 'PanelStudyPrices',
        component: () => import('../views/Panel/PanelStudyPrices.vue'),
      },
      {
        path: 'study/feedbacks',
        name: 'PanelStudyFeedbacks',
        component: () => import('../views/Panel/PanelStudyFeedbacks.vue'),
      },
      // {
      //   path: 'ears',
      //   name: 'PanelEars',
      //   component: () => import('../views/Panel/PanelStorage.vue'),
      // },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
