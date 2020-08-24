import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import CKEditor from '@ckeditor/ckeditor5-vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import VueSelectImage from 'vue-select-image'
import store from './store/index.js'

Vue.config.productionTip = false
axios.defaults.withCredentials = true

Vue.use(VueAxios, axios)
Vue.use(CKEditor)
Vue.use(VueSelectImage)

require('vue-select-image/dist/vue-select-image.css')

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')
