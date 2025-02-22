<template>
  <div class="flex justify-between mb-9">
    <div class="left w-[100%] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg">
      <div>轻小说列表&nbsp;<el-link>查看更多</el-link></div>
      <div class="flex flex-wrap justify-between mt-[10px]">
        <div
          class="cursor-pointer w-[130px] h-[190px] flex justify-center flex-wrap box-border m-[5px]"
          v-for="item in novelList"
          :key="item.id"
          :title="item.name"
        >
          <div :title="item.name" class="w-[100%] h-[160px] bg-opacity-50">
            <el-image style="width: 100%; height: 100%" fit="cover" :src="item.cover"></el-image>
          </div>
          <div
            class="w-[100%] bg-opacity-50 text-[14px] transition-all ease-in-out truncate hover:text-[#ed7b7b]"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between mb-9">
    <div class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg">
      <div>{{ novelHotAnime.blocktitle }}！</div>
      <div class="flex justify-around mt-[10px]">
        <div
          class="cursor-pointer w-[130px] h-[190px] flex justify-center flex-wrap box-border m-[5px]"
          v-for="item in novelHotAnime.rows"
          :key="item.id"
          :title="item.name"
        >
          <div :title="item.name" class="w-[100%] h-[160px] bg-opacity-50">
            <el-image style="width: 100%; height: 100%" fit="cover" :src="item.cover"></el-image>
          </div>
          <div
            class="w-[100%] bg-opacity-50 text-[14px] transition-all ease-in-out truncate hover:text-[#ed7b7b]"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="right w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
      <div class="text-[14px] font-bold">{{ novelRankingData.title }}</div>
      <div class="mt-[10px] text-[12px] cursor-pointer">
        <div
          class="w-[100%] truncate h-[20px] transition-all ease-in-out hover:text-[#ed7b7b]"
          v-for="(item, index) in novelRankingData.rows"
        >
          <span class="">{{ index + 1 }}.</span>
          {{ item.name }}
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between mb-9">
    <div class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg">
      <div>热门轻小说&nbsp;<el-link>查看更多</el-link></div>
      <div class="flex flex-wrap justify-around mt-[10px]">
        <div
          class="w-[130px] h-[190px] mb-[10px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg"
          v-for="item in 6"
        ></div>
      </div>
    </div>
    <div class="right w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
      <div>近期热门轻小说</div>
      <div class="mt-[10px] text-[12px] cursor-pointer">
        <div class="w-[100%] truncate h-[20px]" v-for="item in 10">
          败北女角太多了！(败犬女主太多了！)
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between mb-9">
    <div class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg">
      <div>近期更新&nbsp;<el-link>查看更多</el-link></div>
      <div class="flex flex-wrap justify-around mt-[10px]">
        <div
          class="w-[130px] h-[190px] mb-[10px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg"
          v-for="item in 12"
        ></div>
      </div>
    </div>
    <div class="right w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
      <div>近期热门轻小说</div>
      <div class="mt-[10px] text-[12px] cursor-pointer">
        <div class="w-[100%] truncate h-[20px]" v-for="item in 10">
          败北女角太多了！(败犬女主太多了！)
        </div>
      </div>
    </div>
  </div>
  <div class="flex justify-between mb-9">
    <div
      class="left w-[100%] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] pb-[20px] rounded-lg"
    >
      <div>完本推荐&nbsp;</div>
      <div class="flex flex-wrap justify-around mt-[10px]">
        <div
          class="w-[130px] h-[190px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg"
          v-for="item in 8"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getNovelList, wenku8Login, getNovelHotAnime, getNovelRanking } from '@/api/resource/novel'

const router = useRouter()
const novelList = ref<any>([])
const novelHotAnime = ref<any>({})
const novelRankingData = ref<any>({})

const getNovelListData = async () => {
  const res: any = await getNovelList()
  if (res.code === 403) {
    await wenku8Login()
    await getNovelListData()
    return
  }
  novelList.value = res.data.rows.splice(0, 16)
}

const getNovelHotAnimeData = async () => {
  const res: any = await getNovelHotAnime()
  novelHotAnime.value = res.data
}

const getNovelRankingData = async () => {
  const res: any = await getNovelRanking()
  novelRankingData.value = res.data
}

onMounted(async () => {
  await getNovelListData()
  await getNovelHotAnimeData()
  await getNovelRankingData()
})
</script>

<style scoped></style>
