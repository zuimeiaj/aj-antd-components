import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BizAntdComponents from 'aj-antd-components'
Vue.use(BizAntdComponents)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
