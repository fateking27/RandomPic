import { createRouter, createWebHashHistory } from 'vue-router'
import RandomImgView from '../views/randomImg/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'randomimg',
      component: RandomImgView
    }
  ]
})

export default router
