<style lang="less" s>
#article {
  font-family: '宋体', '新细明体', Verdana, Arial, sans-serif;
  text-indent: 2rem;

  #title {
    font-weight: 700;
    text-align: center;
    text-indent: 0;
    margin-bottom: 50px;
  }
}

#content {
  a {
    color: #000;
    text-decoration: none;
  }
}

#adv300 {
  display: none;
}

#adv900 {
  display: none;
}

#contentdp {
  display: none;
}
</style>

<template>
  <div
    class="absolute w-[100%] h-[100%] flex justify-center items-center"
    v-if="!articleContent.content.length"
  >
    <div class="loader"></div>
  </div>
  <div v-else ref="articleRef" id="article" class="absolute w-[100%] min-h-[100vh]">
    <div
      class="h-[40px] border border-dashed border-r-0 border-l-0 flex justify-center fixed top-0 w-[100%] bg-white"
    >
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="saveScrollPosition">添加书签</el-link>
        <el-link type="primary" :underline="false" @click="restoreScrollPosition"
          >跳转到书签位置</el-link
        >
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="prevChapter">上一页</el-link>
        <el-link type="primary" :underline="false" @click="nextChapter">下一页</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="backPage">返回目录</el-link>
      </div>
    </div>
    <div
      class="max-sm:w-[100vw] mt-[45px] max-md:w-[80vw] max-lg:w-[70vw] max-xl:w-[60vw] w-[50vw] border border-dashed border-t-0 border-b-0 border-b-gray-600 flex flex-wrap justify-center m-[auto]"
    >
      <div
        id="novel_content"
        class="p-[10px] w-[100%]"
        v-for="item in articles"
        v-html="item"
      ></div>
    </div>
    <div class="h-[40px] border border-dashed border-r-0 border-l-0 border-b-0 flex justify-center">
      <!-- <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="saveScrollPosition">添加书签</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="prevChapter">上一页</el-link>
        <el-link type="primary" :underline="false" @click="nextChapter">下一页</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false" @click="backPage">返回目录</el-link>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { getArticle } from '@/api/article'
// import { title } from 'process'

const { VITE_API_PATH } = import.meta.env

defineOptions({
  name: 'article'
})

const articleRef = ref()
const articleContent = ref({
  id: 0,
  title: '',
  content: []
})
const articles = ref([])
const getContent = async () => {
  let artArray = undefined
  const { data } = await getArticle({
    article_id_string: router.currentRoute.value.query.article_id_string
  })
  articleContent.value = data
  artArray = data.content.split('<br>').map((item: string) => {
    let domItem = ''
    if (item != '\n') {
      domItem = item.replace(/&nbsp;/gi, '')
    }
    return domItem
  })
  articleContent.value.content = artArray.filter((item: string) => item)
  articles.value = articleContent.value.content

  document.title = articleContent.value.title
}

const nextChapter = () => {
  JSON.parse(localStorage.getItem('chapters') || '[]').forEach((item: any, index: number) => {
    if (item.id === router.currentRoute.value.query.article_id_string?.toString().split('/')[2]) {
      if (index + 1 < JSON.parse(localStorage.getItem('chapters') || '[]').length) {
        const novel_id =
          router.currentRoute.value.query.article_id_string?.toString().split('/')[1] || ''
        const id = JSON.parse(localStorage.getItem('chapters') || '[]')[index + 1].id
        router
          .push({
            path: '/article',
            query: {
              article_id_string:
                novel_id.length < 4
                  ? '0'
                  : novel_id.toString().split('')[0] + '/' + novel_id + '/' + id
            }
          })
          .then(() => {
            getContent().then(() => {
              document.querySelectorAll('#novel_content img').forEach((item: any) => {
                item.src = VITE_API_PATH + '/od-imagefun?link=' + item.src
                item.style.width = '90%'
              })
            })
          })
        return
      } else {
        alert('已经是最后一章了')
      }
    }
  })
}

const prevChapter = () => {
  JSON.parse(localStorage.getItem('chapters') || '[]').forEach((item: any, index: number) => {
    if (item.id === router.currentRoute.value.query.article_id_string?.toString().split('/')[2]) {
      if (index - 1 >= 0) {
        const novel_id =
          router.currentRoute.value.query.article_id_string?.toString().split('/')[1] || ''
        const id = JSON.parse(localStorage.getItem('chapters') || '[]')[index - 1].id
        router
          .push({
            path: '/article',
            query: {
              article_id_string:
                novel_id.length < 4
                  ? '0'
                  : novel_id.toString().split('')[0] + '/' + novel_id + '/' + id
            }
          })
          .then(() => {
            getContent().then(() => {
              document.querySelectorAll('#novel_content img').forEach((item: any) => {
                item.src = VITE_API_PATH + '/od-imagefun?link=' + item.src
                item.style.width = '90%'
              })
            })
          })
        return
      } else {
        alert('已经是第一章了')
      }
    }
  })
}

const backPage = () => {
  router.push(
    '/resource/novel/chapter/' +
      router.currentRoute.value.query.article_id_string?.toString().split('/')[1]
  )
}

// 记录当前滚动条位置
const saveScrollPosition = () => {
  if (!router.currentRoute.value.query.article_id_string) return

  const scrollPosition = window.scrollY || document.documentElement.scrollTop
  const articleId = router.currentRoute.value.query.article_id_string.toString()
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
  const oneBoolmark = bookmarks.find((item: any) => item.articleId === articleContent.value.id)
  if (!oneBoolmark) {
    bookmarks.push({
      articleId: articleContent.value.id,
      title: articleContent.value.title,
      scrollPosition
    })
    localStorage.setItem(`bookmarks`, JSON.stringify(bookmarks))
    alert('书签添加成功')
    return
  } else {
    for (const item of bookmarks) {
      if (item.articleId === articleContent.value.id) {
        item.scrollPosition = scrollPosition
        localStorage.setItem(`bookmarks`, JSON.stringify(bookmarks))
        alert('书签更新成功')
        return
      }
    }
  }
}

// 恢复上次阅读位置
const restoreScrollPosition = () => {
  if (!router.currentRoute.value.query.article_id_string) return

  // const articleId = router.currentRoute.value.query.article_id_string.toString().split('/')[2]
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]')
  const bookmark = bookmarks.find((item: any) => item.articleId === articleContent.value.id)
  if (bookmark) {
    setTimeout(() => {
      window.scrollTo({
        top: bookmark.scrollPosition,
        behavior: 'auto'
      })
    }, 100)
  } else {
    alert('未找到书签')
  }
}

onMounted(async () => {
  await getContent()
  document.querySelectorAll('#novel_content img').forEach((item: any) => {
    item.src = VITE_API_PATH + '/od-imagefun?link=' + item.src
    item.style.width = '90%'
  })
  if (!localStorage.getItem(`bookmarks`)) {
    localStorage.setItem(`bookmarks`, JSON.stringify([]))
  }
})
</script>

<style lang="less" scoped>
/* HTML: <div class="loader"></div> */
.loader {
  --w: 10ch;
  font-weight: bold;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.4em;
  letter-spacing: var(--w);
  width: var(--w);
  overflow: hidden;
  white-space: nowrap;
  color: #0000;
  text-shadow:
    calc(0 * var(--w)) 0 #000,
    calc(-1 * var(--w)) 0 #000,
    calc(-2 * var(--w)) 0 #000,
    calc(-3 * var(--w)) 0 #000,
    calc(-4 * var(--w)) 0 #000,
    calc(-5 * var(--w)) 0 #000,
    calc(-6 * var(--w)) 0 #000,
    calc(-7 * var(--w)) 0 #000,
    calc(-8 * var(--w)) 0 #000,
    calc(-9 * var(--w)) 0 #000;
  animation: l20 2s infinite linear;
}

.loader:before {
  content: '加载中...';
}

@keyframes l20 {
  9.09% {
    text-shadow:
      calc(0 * var(--w)) -10px #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  18.18% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) -10px #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  27.27% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) -10px #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  36.36% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) -10px #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  45.45% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) -10px #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  54.54% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) -10px #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  63.63% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) -10px #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  72.72% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) -10px #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) 0 #000;
  }

  81.81% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) -10px #000,
      calc(-9 * var(--w)) 0 #000;
  }

  90.90% {
    text-shadow:
      calc(0 * var(--w)) 0 #000,
      calc(-1 * var(--w)) 0 #000,
      calc(-2 * var(--w)) 0 #000,
      calc(-3 * var(--w)) 0 #000,
      calc(-4 * var(--w)) 0 #000,
      calc(-5 * var(--w)) 0 #000,
      calc(-6 * var(--w)) 0 #000,
      calc(-7 * var(--w)) 0 #000,
      calc(-8 * var(--w)) 0 #000,
      calc(-9 * var(--w)) -10px #000;
  }
}
</style>
