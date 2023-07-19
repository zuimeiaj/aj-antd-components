import Router from 'vue-router'
import vue from 'vue'
vue.use(Router)
const router = new Router({
  routes: [{ path: '/', component: () => import('@/pages/index.vue') }],
})

export default router
