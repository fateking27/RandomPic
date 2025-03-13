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
          name: 'Home',
          component: () => import('@/views/home/index.vue'),
          meta: {
            title: '首页',
            KeepAlive: true
          }
        },
        {
          path: 'pictures',
          name: 'Pictures',
          component: () => import('@/views/pictures/index.vue'),
          meta: {
            title: '次元图库'
          }
        },
        {
          path: 'imagedetail',
          name: 'ImageDetail',
          component: () => import('@/views/pictures/imageDetail.vue'),
          meta: {
            title: '图片详情'
          }
        },
        {
          path: 'imageUpload',
          name: 'uploadImage',
          component: () => import('@/views/pictures/uploadPage.vue'),
          meta: {
            title: '壁纸上传'
          }
        },
        {
          path: 'animelist',
          name: 'AnimeList',
          component: () => import('@/views/anime/animeList/index.vue'),
          meta: {
            title: '全部动画'
          }
        },
        {
          path: 'animecalendar',
          name: 'AnimeCalendar',
          component: () => import('@/views/anime/animeCalendar/index.vue'),
          meta: {
            title: '新番放送表'
          }
        },
        {
          path: 'resource/novel',
          name: 'ResourceNovel',
          component: () => import('@/views/resource/novel/index.vue'),
          meta: {
            title: '轻小说资源'
          }
        },
        {
          path: 'resource/novel/detail/:id',
          name: 'ResourceNovelDetail',
          component: () => import('@/views/resource/novel/detail.vue'),
          meta: {
            title: '轻小说详情',
            KeepAlive: true
          }
        },
        {
          path: 'resource/novel/chapter/:id',
          name: 'ResourceNovelChapter',
          component: () => import('@/views/resource/novel/chapter.vue'),
          meta: {
            title: '轻小说章节',
            KeepAlive: true
          }
        }
      ]
    },
    {
      path: '/article',
      name: 'Article',
      component: () => import('@/views/article/index.vue'),
      meta: {
        title: '文章'
      }
    },
    {
      path: '/randomimg',
      name: 'randomimg',
      component: () => import('@/views/randomImg/index.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  document.title = 'ANIMEX | ' + to.meta.title || 'ANIMEX'
  next()
})
router.afterEach((to, from, failure) => {
  window.scrollTo(0, 0)
})
export default router
