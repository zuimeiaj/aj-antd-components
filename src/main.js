import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.min.css'
import BizAntdComponents from 'aj-antd-components'
console.log('biz:', BizAntdComponents)
Vue.use(BizAntdComponents)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
