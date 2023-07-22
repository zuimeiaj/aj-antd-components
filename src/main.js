import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.min.css'
import 'aj-antd-components/dist/index.css'
import BizAntdComponents from 'aj-antd-components'
import componentsImp from './components-imp'
import Vuex from 'vuex'
import VueHighlight from 'vue-highlightjs'
import 'highlight.js/styles/a11y-light.css'
Vue.use(Vuex)
Vue.use(VueHighlight)
Vue.use(BizAntdComponents, componentsImp)
Vue.config.productionTip = false

new Vue({
  store: new Vuex.Store({
    getters: {
      dictionaries: () => ({
        demo_enum: {
          a: '选项1',
          b: '选项2',
          c: '选项3',
        },
        demo_enum_array: [
          { label: '选项1', value: 'a' },
          { label: '选项2', value: 'b' },
          { label: '选项3', value: 'c' },
        ],
        yes_no_array: [
          { label: '隐藏', value: 1 },
          { label: '显示', value: 2 },
        ],
      }),
    },
  }),
  router: router,
  render: (h) => h(App),
}).$mount('#app')
