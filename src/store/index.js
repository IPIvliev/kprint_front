import { createStore } from 'vuex'
import { auth } from './auth.module'
import { shop } from './shop/index.js'
import { catalog } from './catalog.module'
import { study } from './study.module'
import { delivery } from './delivery.module'

const store = createStore({
  modules: {
    auth,
    shop,
    catalog,
    study,
    delivery,
  },
})

export default store
