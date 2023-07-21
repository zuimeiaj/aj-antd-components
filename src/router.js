import Router from 'vue-router'
import vue from 'vue'
import { ComponentList } from './components'
vue.use(Router)
const router = new Router({
  routes: ComponentList.map((item) => {
    return {
      path: '/' + item.toLowerCase(),
      component: () => import('@/pages/' + item.toLowerCase() + '.vue'),
    }
  }),
})

export default router
