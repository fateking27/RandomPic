import { createRouter, createWebHashHistory } from 'vue-router'
import RandomImgView from '@/views/randomImg/index.vue'
import Layout from '@/components/layout/index.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/main/index.vue')
        }
      ]
    },
    {
      path: '/article',
      name: 'article',
      component: () => import('@/views/article/index.vue')
    },
    {
      path: '/randomimg',
      name: 'randomimg',
      component: () => import('@/views/randomImg/index.vue')
    }
  ]
})

export default router
