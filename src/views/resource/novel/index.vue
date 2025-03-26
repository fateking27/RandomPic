<template>
  <div class="w-[1200px] m-[auto]">
    <div class="flex justify-between mb-9">
      <div
        class="left w-[100%] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg"
      >
        <div>轻小说列表&nbsp;<el-link href="#/resource/novel/novellist">查看更多</el-link></div>
        <div class="flex flex-wrap justify-between mt-[10px]">
          <div
            class="cursor-pointer w-[130px] h-[190px] flex justify-center flex-wrap box-border m-[5px]"
            v-for="item in novelList"
            :key="item.id"
            :title="item.name"
            @click="toNovelDetail(item.id)"
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
      <div
        class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg"
      >
        <div>{{ novelHotAnime.blocktitle }}！</div>
        <div class="flex justify-around mt-[10px]">
          <div
            class="cursor-pointer w-[130px] h-[190px] flex justify-center flex-wrap box-border m-[5px]"
            v-for="item in novelHotAnime.rows"
            :key="item.id"
            :title="item.name"
            @click="toNovelDetail(item.id)"
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
            :key="item.id"
            @click="toNovelDetail(item.id)"
          >
            <span class="">{{ index + 1 }}.</span>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mb-9">
      <div
        class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg"
      >
        <div>热门轻小说&nbsp;<el-link>查看更多</el-link></div>
        <div class="flex flex-wrap justify-around mt-[10px]">
          <div
            class="cursor-pointer w-[130px] h-[190px] mb-[10px] flex flex-wrap box-border m-[5px] rounded-lg"
            v-for="item in novelHotData.rows"
            :key="item.id"
            :title="item.name"
            @click="toNovelDetail(item.id)"
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
        <div class="text-[14px] font-bold">{{ NovelSingleRankingData.title }}</div>
        <div class="mt-[10px] text-[12px] cursor-pointer">
          <div
            class="w-[100%] truncate h-[20px] transition-all ease-in-out hover:text-[#ed7b7b]"
            v-for="(item, index) in NovelSingleRankingData.rows"
            :key="item.id"
            @click="toNovelDetail(item.id)"
          >
            <span>{{ index + 1 }}.</span>
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mb-9">
      <div
        class="left w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg"
      >
        <div>近期更新&nbsp;<el-link>查看更多</el-link></div>
        <div class="flex flex-wrap justify-around mt-[10px]">
          <div
            class="cursor-pointer w-[130px] h-[190px] mb-[10px] flex flex-wrap box-border m-[5px] rounded-lg"
            v-for="item in NovelUpdateData.rows"
            :key="item.id"
            :title="item.name"
            @click="toNovelDetail(item.id)"
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
        <div>近期热门轻小说</div>
        <div class="mt-[10px] text-[12px] cursor-pointer">
          <div
            class="w-[100%] transition-all ease-in-out truncate h-[20px] hover:text-[#ed7b7b]"
            v-for="(item, index) in NovelDayVisitData.rows"
            :key="item.id"
            @click="toNovelDetail(item.id)"
          >
            <span>{{ index + 1 }}.</span> {{ item.name }}
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mb-9">
      <div
        class="left w-[100%] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] pb-[20px] rounded-lg"
      >
        <div>完本推荐&nbsp;</div>
        <div class="flex flex-wrap justify-between mt-[10px]">
          <div
            class="cursor-pointer w-[100px] h-[160px] flex justify-center flex-wrap box-border m-[5px]"
            v-for="item in NovelFinishedData.rows"
            :key="item.id"
            :title="item.name"
            @click="toNovelDetail(item.id)"
          >
            <div :title="item.name" class="w-[100%] h-[150px] bg-opacity-50">
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
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getNovelList,
  wenku8Login,
  getNovelHotAnime,
  getNovelRanking,
  getNovelHot,
  getNovelUpdate,
  getNovelDayVisit,
  getNovelSingleRanking,
  getNovelFinished
} from '@/api/resource/novel'

defineOptions({
  name: 'resourceNovel' 
})

const router = useRouter()
const novelList = ref<any>([])
const novelHotAnime = ref<any>({})
const novelRankingData = ref<any>({})
const novelHotData = ref<any>({})
const NovelUpdateData = ref<any>({})
const NovelDayVisitData = ref<any>({})
const NovelSingleRankingData = ref<any>({})
const NovelFinishedData = ref<any>({})

const toNovelDetail = (id: number) => {
  window.open(router.resolve(`/resource/novel/detail/${id}`).href, '_blank')
}

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

const getNovelSingleRankingData = async () => {
  const res: any = await getNovelSingleRanking()
  NovelSingleRankingData.value = res.data
}

const getNovelHotData = async () => {
  const res: any = await getNovelHot()
  novelHotData.value = res.data
}

const getNovelUpdateData = async () => {
  const res: any = await getNovelUpdate()
  NovelUpdateData.value = res.data
}

const getNovelDayVisitData = async () => {
  const res: any = await getNovelDayVisit()
  NovelDayVisitData.value = res.data
}

const getNovelFinishedData = async () => {
  const res: any = await getNovelFinished()
  NovelFinishedData.value = res.data
}

onMounted(async () => {
  await getNovelListData()
  await getNovelHotAnimeData()
  await getNovelRankingData()
  await getNovelHotData()
  await getNovelUpdateData()
  await getNovelDayVisitData()
  await getNovelSingleRankingData()
  await getNovelFinishedData()
})
</script>

<style scoped></style>
