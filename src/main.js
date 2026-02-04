import { createApp } from 'vue'
import App from './App.vue'
import { createYmaps } from 'vue-yandex-maps';
import router from './router'
import store from './store'
import './assets/css/style.css'

// import './assets/js/scripts.js'

createApp(App).use(store).use(router).use(createYmaps({
    apikey: process.env.VUE_APP_YMAPS_API_KEY,
  })).mount('#app')
