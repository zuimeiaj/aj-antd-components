import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './lib/css/index.less'
import router from './router'
import ComponentInterface from './lib/components/Interface'
Vue.prototype.$eventbus = new Vue()
ComponentInterface.table.post = (url, send) => {
  console.log('tabl request:', url, send)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          totalCount: 30,
          list: new Array(30).fill(0).map((item, index) => {
            return new Array(10).fill(0).reduce(
              (a, b, i) => {
                a[i] = i
                return a
              },
              { id: index }
            )
          }),
        },
      })
    }, 200)
  })
}

Vue.config.productionTip = false
Vue.use(antd)
new Vue({
  router: router,
  render: (h) => h(App),
}).$mount('#app')
