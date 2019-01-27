import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

import Highlight from 'vue-markdown-highlight'

Vue.config.productionTip = false
Vue.use(VueMaterial)
Vue.use(Highlight)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
