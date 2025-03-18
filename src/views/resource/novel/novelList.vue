<template>
  <div class="w-[1200px] mx-auto flex justify-between mb-9">
    <div class="w-[870px] box-border bg-white bg-opacity-50 rounded-lg p-5">
      <div>轻小说列表</div>
      <div class="flex flex-wrap justify-between mt-5">
        <div
          class="w-[49%] h-[190px] flex justify-between box-border"
          v-for="item in novelListData.rows"
          :key="item.id"
          :title="item.name"
        >
          <div :title="item.name" class="h-[160px] bg-opacity-50">
            <el-image style="width: 130px; height: 100%" fit="cover" :src="item.cover"></el-image>
          </div>
          <div class="w-[65%] bg-opacity-50 text-[14px] leading-5">
            <div
              class="cursor-pointer font-bold max-h-[40px] w-[100%] text-wrap truncate transition-all ease-in-out hover:text-[#ed7b7b]"
            >
              {{ item.name }}
            </div>
            <div class="text-[13px]">{{ item.author }}</div>
            <div class="text-[13px]">{{ item.updatetime }}</div>
            <div class="text-[13px]"><span>Tags:</span> {{ item.tags }}</div>
            <div class="text-[13px]">{{ item.brief }}</div>
            <!-- <div class="text-[13px]"><span>作者：</span> {{ item.author.split(':')[1] }}</div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="w-[300px] box-border bg-white bg-opacity-50 rounded-lg p-5"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { getNovelList, wenku8Login } from '@/api/resource/novel'

const novelListData = ref<any>({})

const getNovelListData = async () => {
  const res: any = await getNovelList()
  if (res.code === 403) {
    await wenku8Login()
    await getNovelListData()
    return
  }
  novelListData.value = res.data
}

onMounted(() => {
  getNovelListData()
})
</script>

<style scoped></style>
