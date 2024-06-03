import { createApp } from 'vue'
import App from './App.vue'
import { createYmaps } from 'vue-yandex-maps';
import router from './router'
import store from './store'
import './assets/css/style.css'
// import './assets/js/scripts.js'

createApp(App).use(store).use(router).use(createYmaps({
    apikey: '44871f75-8e31-4bee-8889-9345ef5b053a',
  })).mount('#app')
