import Vue from 'vue'
import App from './App.vue'
import store from './store'
import Axios from 'axios'

Vue.prototype.$axios = Axios
Vue.config.productionTip = false

// Axios.defaults.headers.common = {'X-Requested-With': 'XMLHttpRequest'}
Axios.defaults.baseURL = 'http://localhost:3000/v1/'

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app')
