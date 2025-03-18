<template>
  <div class="w-[1200px] m-auto">
    <div class="flex flex-col items-center">
      <h2 class="m-[auto]">{{ novelChaptersData.title }}</h2>
      <div class="p-2">{{ novelChaptersData.author }}</div>
    </div>
    <div class="min-h-[calc(100vh-200px)]">
      <div
        :class="['w-[100%]', 'flex flex-wrap', 'gap-2 mb-3']"
        v-for="chapter in novelChaptersData.chapters"
        :key="chapter.id"
      >
        <h3
          class="w-full text-start mb-2 pl-2"
          style="border-left: 4px solid; border-color: #ff985c"
        >
          {{ novelChaptersData.title + '&nbsp;&nbsp;' + chapter.chapter }}
        </h3>
        <div
          :title="item.title"
          v-for="item in chapter.children"
          :key="item.id"
          @click="handleClick(item.id, chapter.children)"
          class="w-[24%] bg-opacity-100 min-h-10 cursor-pointer transition-all ease-in-out duration-300"
          style="border-bottom: 1px solid; border-color: #9e9d9d"
        >
          <p
            class="p-2 text-start text-sm text-nowrap truncate hover:text-[#ed7b7b] transition-all ease-in-out duration-300"
          >
            {{ item.title }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import dayjs from 'dayjs'

import { getNovelDetail, getNovelChapters } from '@/api/resource/novel'

const router = useRouter()
const novel_id = router.currentRoute.value.params.id
const novelChaptersData = ref<any>({})
const getNovelChaptersData = async () => {
  const id = router.currentRoute.value.params.id
  const res: any = await getNovelChapters({ id })
  novelChaptersData.value = res.data
  document.title = '在线阅读 | ' + novelChaptersData.value.title
  const chapters = []
  for (const chapter of novelChaptersData.value.chapters) {
    for (const item of chapter.children) {
      chapters.push(item)
    }
  }
  localStorage.setItem('chapters', JSON.stringify(chapters))
}

const handleClick = (id: number, chapter?: any) => {
  // localStorage.setItem('chapters', JSON.stringify(chapter))
  router.push({
    path: '/article',
    query: {
      article_id_string:
        novel_id.length < 4 ? '0' : novel_id.toString().split('')[0] + '/' + novel_id + '/' + id
    }
  })
}

onMounted(() => {
  getNovelChaptersData()
})
</script>

<style scoped></style>
