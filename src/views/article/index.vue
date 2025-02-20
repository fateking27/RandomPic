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
    <div class="h-[40px] border border-dashed border-r-0 border-l-0 flex justify-center">
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">添加书签</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">上一页</el-link>
        <el-link type="primary" :underline="false">下一页</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">返回目录</el-link>
      </div>
    </div>
    <div
      class="max-sm:w-[100vw] max-md:w-[80vw] max-lg:w-[70vw] max-xl:w-[60vw] w-[50vw] border border-dashed border-t-0 border-b-0 border-b-gray-600 flex flex-wrap justify-center m-[auto]"
    >
      <div class="p-[10px] w-[100%]" v-for="item in articles" v-html="item"></div>
    </div>
    <div class="h-[40px] border border-dashed border-r-0 border-l-0 border-b-0 flex justify-center">
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">添加书签</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">上一页</el-link>
        <el-link type="primary" :underline="false">下一页</el-link>
      </div>
      <div class="h-[100%] flex items-center">
        <el-link type="primary" :underline="false">返回目录</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getArticle } from '@/api/article'
const articleRef = ref()
const articleContent = ref({
  title: '',
  content: []
})
const articles = ref([])
const getContent = async () => {
  let artArray = undefined
  const { data } = await getArticle({
    article_id_string: '3/3057/125417'
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
  console.log(articles.value)
}

onMounted(async () => {
  await getContent()
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
