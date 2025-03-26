import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/components/layout/index.vue'
import { KeepAlive } from 'vue'
import { ro } from 'element-plus/es/locales.mjs'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  scrollBehavior: () => ({ left: 0, top: 0 }),
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
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            KeepAlive: true
          }
        },
        {
          path: 'pictures',
          name: 'pictures',
          component: () => import('@/views/pictures/index.vue'),
          meta: {
            title: '次元图库',
            KeepAlive: false
          }
        },
        {
          path: 'imagedetail',
          name: 'imageDetail',
          component: () => import('@/views/pictures/imageDetail.vue'),
          meta: {
            title: '图片详情',
            KeepAlive: true
          }
        },
        {
          path: 'imageUpload',
          name: 'uploadImage',
          component: () => import('@/views/pictures/uploadPage.vue'),
          meta: {
            title: '壁纸上传',
            KeepAlive: true
          }
        },
        {
          path: 'animelist',
          name: 'animeList',
          component: () => import('@/views/anime/animeList/index.vue'),
          meta: {
            title: '全部动画',
            KeepAlive: true
          }
        },
        {
          path: 'animecalendar',
          name: 'animeCalendar',
          component: () => import('@/views/anime/animeCalendar/index.vue'),
          meta: {
            title: '新番放送表',
            KeepAlive: true
          }
        },
        {
          path: 'resource/novel',
          name: 'resourceNovel',
          component: () => import('@/views/resource/novel/index.vue'),
          meta: {
            title: '轻小说资源',
            KeepAlive: true
          }
        },
        {
          path: 'resource/novel/detail/:id',
          name: 'resourceNovelDetail',
          component: () => import('@/views/resource/novel/detail.vue'),
          meta: {
            title: '轻小说详情',
            KeepAlive: true
          }
        },
        {
          path: 'resource/novel/chapter/:id',
          name: 'resourceNovelChapter',
          component: () => import('@/views/resource/novel/chapter.vue'),
          meta: {
            title: '轻小说章节',
            KeepAlive: true
          }
        },
        {
          path: 'resource/novel/novellist',
          name: 'resourceNovelList',
          component: () => import('@/views/resource/novel/novelList.vue'),
          meta: {
            title: '轻小说列表',
            KeepAlive: true
          }
        },
      ]
    },
    {
      path: '/article',
      name: 'Article',
      component: () => import('@/views/article/index.vue'),
      meta: {
        title: '文章',
        KeepAlive: false
      }
    },
    {
      path: '/randomimg',
      name: 'randomimg',
      component: () => import('@/views/randomImg/index.vue'),
      meta: {
        title: '随机图片',
        KeepAlive: false
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'ANIMEX - ' + to.meta.title || 'ANIMEX'
  next()
})
router.afterEach((to, from, failure) => {
  window.scrollTo(0, 0)
})
export default router
