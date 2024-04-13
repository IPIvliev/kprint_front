import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import About from '../views/About.vue'
import Innovations from '../views/Innovations.vue'
import News from '../views/News.vue'
import Article from '../views/Article.vue'
import Gallery from '../views/Gallery.vue'
import Contact from '../views/Contact.vue'
import NotFound from '../views/404.vue'

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
    path: '/shop',
    name: 'MainShop',
    component: () => import('../views/Shop/MainShop.vue'),
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
        path: 'models',
        name: 'PanelModels',
        component: () => import('../views/Panel/PanelModels.vue'),
      },      
      {
        path: 'study',
        name: 'PanelStudy',
        component: () => import('../views/Panel/PanelStorage.vue'),
      },
      {
        path: 'ears',
        name: 'PanelEars',
        component: () => import('../views/Panel/PanelStorage.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
