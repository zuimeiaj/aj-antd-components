import Router from 'vue-router'
import vue from 'vue'
import PageIndex from '@/pages/index.vue'
console.log(PageIndex)
vue.use(Router)
const router = new Router({
  routes: [{ path: '/', component: PageIndex }],
})

export default router
