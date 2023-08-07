import Vue from 'vue'
import App from './App.vue'
import antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './lib/css/index.less'
import router from './router'
import ComponentInterface from './lib/components/Interface'
import vuex from 'vuex'
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
Vue.use(vuex)
new Vue({
  store: new vuex.Store({
    getters: {
      dictionaries: () => ({
        demo_enum: {
          enum_value1: 'enum_label1',
          enum_value2: 'enum_label2',
          enum_value3: 'enum_label3',
        },
        demo_enum_array: [
          { label: 'enum_label1', value: 'enum_value1' },
          { label: 'enum_label2', value: 'enum_value2' },
          { label: 'enum_label3', value: 'enum_value3' },
        ],
      }),
    },
  }),
  router: router,
  render: (h) => h(App),
}).$mount('#app')
