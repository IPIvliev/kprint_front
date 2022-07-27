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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
