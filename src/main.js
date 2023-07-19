import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { install } from 'aj-antd-components'
console.log(install)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
