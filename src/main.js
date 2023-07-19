import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Antdc from './index.js'
console.log(Antdc)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
