import Vue from 'vue'
import App from './App.vue'
import router from './router'
import AntdComponents from 'aj-antd-components'
Vue.config.productionTip = false

Vue.use(AntdComponents)
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
