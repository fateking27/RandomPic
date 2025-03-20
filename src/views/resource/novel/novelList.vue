<template>
  <div
    class="w-[1200px] mx-auto flex justify-between mb-9 bg-opacity-50 rounded-lg box-border bg-white"
  >
    <div class="w-[1200px] p-5">
      <div>轻小说列表</div>
      <div class="flex flex-wrap gap-1 mt-5">
        <div
          class="w-[33%] h-[190px] flex justify-between box-border"
          v-for="item in novelListData.rows"
          :key="item.id"
          :title="item.name"
          @click="toNovelDetail(item.id)"
        >
          <div :title="item.name" class="h-[160px] bg-opacity-50">
            <el-image style="width: 120px; height: 100%" fit="cover" :src="item.cover"></el-image>
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
      <div class="w-[100%] flex justify-center">
        <el-pagination
          size="small"
          background
          layout="prev, pager, next"
          :page-size="pagination.pageSize"
          :page-count="191"
          @current-change="handleCurrentChange"
          class="mt-4"
        />
      </div>
    </div>
    <!-- <div class="w-[300px] box-border"></div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

import { getNovelList, wenku8Login } from '@/api/resource/novel'

import { useRouter } from 'vue-router'
const router = useRouter()

const pagination = reactive({
  pageCount: 1,
  pageSize: 10,
  total: 0
})

const novelListData = ref<any>({})

const getNovelListData = async (pageCount: any) => {
  const res: any = await getNovelList({ page: pageCount })
  if (res.code === 403) {
    await wenku8Login()
    await getNovelListData(pageCount)
    return
  }
  novelListData.value = res.data
}

const handleCurrentChange = async (val: number) => {
  pagination.pageCount = val
  await getNovelListData(pagination.pageCount)
}

const toNovelDetail = (id: number) => {
  window.open(router.resolve(`/resource/novel/detail/${id}`).href, '_blank')
}

onMounted(() => {
  getNovelListData(pagination.pageCount)
})
</script>

<style scoped></style>
