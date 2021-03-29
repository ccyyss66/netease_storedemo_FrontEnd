// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import '../element-#D22147/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$axios=axios
Vue.prototype.$qs=qs
// axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://127.0.0.1:8084/sys'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
