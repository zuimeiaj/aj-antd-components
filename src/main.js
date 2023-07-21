import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.min.css'
import 'aj-antd-components/dist/index.css'
import BizAntdComponents from 'aj-antd-components'
import componentsImp from './components-imp'

Vue.use(BizAntdComponents, componentsImp)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
