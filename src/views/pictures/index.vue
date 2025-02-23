<template>
  <div
    v-loading="loading && !dataList.length"
    element-loading-text="Loading..."
    class="bg-white min-h-[100vh] bg-opacity-50 rounded-lg flex flex-wrap justify-center"
  >
    <div
      :class="[
        'bg-[#ffffff]',
        'bg-opacity-80',
        'h-[150px]',
        'w-[1140px]',
        'shadow-lg',
        'rounded-lg',
        'm-[20px]',
        'flex',
        'justify-center',
        'items-center'
      ]"
    >
      <div
        :class="[
          'w-[100px]',
          'h-[100px]',
          'bg-[#e6e6e6]',
          'rounded-md',
          'text-center',
          'cursor-pointer',
          'hover:bg-[#cdcbcb]',
          'transition-all',
          'text-[#db6666]',
          'm-[10px]'
        ]"
        @click="latestSort"
      >
        <el-icon style="font-size: 45px; padding-top: 10px"><Clock /></el-icon>
        <p class="text-[16px]">Latest</p>
      </div>
      <div
        :class="[
          'w-[100px]',
          'h-[100px]',
          'bg-[#e6e6e6]',
          'rounded-md',
          'text-center',
          'cursor-pointer',
          'hover:bg-[#cdcbcb]',
          'transition-all',
          'text-[#db6666]',
          'm-[10px]'
        ]"
        @click="randomSort"
      >
        <el-icon style="font-size: 45px; padding-top: 10px"><Sort /></el-icon>
        <p class="text-[16px]">Random</p>
      </div>
      <div
        :class="[
          'w-[100px]',
          'h-[100px]',
          'bg-[#e6e6e6]',
          'rounded-md',
          'text-center',
          'cursor-pointer',
          'hover:bg-[#cdcbcb]',
          'transition-all',
          'text-[#db6666]',
          'm-[10px]'
        ]"
      >
        <el-icon style="font-size: 45px; padding-top: 10px"><TrophyBase /></el-icon>
        <p class="text-[16px]">TopList</p>
      </div>
      <div
        :class="[
          'w-[100px]',
          'h-[100px]',
          'bg-[#e6e6e6]',
          'rounded-md',
          'text-center',
          'cursor-pointer',
          'hover:bg-[#cdcbcb]',
          'transition-all',
          'text-[#db6666]',
          'm-[10px]'
        ]"
        @click="() => $router.push({ path: '/imageUpload' })"
      >
        <el-icon style="font-size: 45px; padding-top: 10px"><Upload /></el-icon>
        <p class="text-[16px]">Upload</p>
      </div>
    </div>
    <div class="flex flex-wrap justify-center" v-infinite-scroll="infiniteScroll">
      <div
        class="picture-item relative h-[150px] w-[270px] leading-[150px] text-center m-[10px] rounded-md overflow-hidden cursor-pointer"
        v-for="item in dataList"
        :key="item.id"
        @click="toImageDetail(item.id)"
      >
        <div
          class="pic-size bg-[#000000] absolute z-10 bottom-[-35px] h-[35px] w-[100%] bg-opacity-40 flex justify-between items-center text-white"
        >
          <div>
            <span class="text-[14px] p-[5px]">19</span>
            <span class="iconfont icon-star02 text-[16px]"></span>
          </div>
          <div class="italic">{{ item.size }} <span>像素</span></div>
          <div class="tag text-[#66ff66] text-[17px]">
            <span
              class="iconfont icon-biaoqianlan p-[5px] text-[17px] hover:opacity-70 transition-all duration-300"
            ></span>
          </div>
        </div>
        <el-image
          class=""
          style="width: 100%; height: 100%"
          :src="item.thumb ? item.thumb : item.url"
          fit="cover"
        >
          <template #placeholder>
            <div
              class="image-slot flex justify-center items-center h-[100%] bg-[#ffffff] overflow-hidden"
            >
              <imgLoading></imgLoading>
            </div>
          </template>
          <template #error>
            <div
              class="image-slot flex justify-center items-center h-[100%] bg-[#ffffff] overflow-hidden"
            >
              <imgLoading></imgLoading>
            </div>
          </template>
        </el-image>
      </div>
    </div>
    <div v-if="!loading" class="text-center w-[100%]">
      <el-divider content-position="left">我是有底线的</el-divider>
    </div>
    <div
      v-loading="loading"
      element-loading-text="Loading..."
      element-loading-background="rgba(122, 122, 122, 0)"
      v-if="loading"
      class="bg-opacity-0 m-[10px] rounded-lg w-[100%] text-center leading-48 h-48"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { imagePageGet } from '@/api/pictures'
import imgLoading from '@/components/imgLoading/index.vue'
import { Upload, Sort, TrophyBase, Clock } from '@element-plus/icons-vue'
import {} from 'vue-router'
import { useRouter } from 'vue-router'

interface Picture {
  id: number
  url: string
  size: string
  thumb: string
  // Add other properties if needed
}

const loading = ref(false)

const dataList = ref<Picture[]>([])

const pagination = reactive({
  pageSize: 20,
  pageCount: 1,
  total: 0
})

const router = useRouter()
const toImageDetail = (id: number) => {
  window.open(router.resolve({ path: '/imagedetail', query: { id } }).href, '_blank')
}

const sortMark = ref('')

const randomSort = async () => {
  dataList.value.sort(() => Math.random() - 0.5)
}

const latestSort = async () => {
  sortMark.value = 'latest'

  await getDataList(sortMark.value)
}

const infiniteScroll = async () => {
  switch (sortMark.value) {
    case 'latest':
      await latestSort()
      break
    case 'random':
      await randomSort()
      break
    default:
      await getDataList()
  }
}

const getDataList = async (sort?: string) => {
  if (dataList.value.length == pagination.total && dataList.value.length) return
  loading.value = true
  const res: any = await imagePageGet({ ...pagination, sort })
  dataList.value = res.data
  pagination.total = res.total

  pagination.pageSize += 20

  loading.value = false
}

onMounted(async () => {
  await getDataList()
})
</script>

<style lang="scss" scoped>
.picture-item {
  transition: all ease-in-out 0.2s;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 3px 8px;
  transition: all 0.3s;
  .pic-size {
    transition: all ease-in-out 0.3s;
    bottom: -35px;
    text-shadow: 1px 1px #5a5858;
    // .tag {
    //   transition: all ease-in-out 0.3s;
    //   opacity: 0.6;
    // }
  }
  &:hover .pic-size {
    // box-shadow: rgba(250, 115, 97, 0.24) 0px 3px 8px;
    bottom: 0;
  }
}
:deep(.el-divider__text) {
  font-size: 14px;
  font-style: italic;
  //背景色透明
  background-color: rgba(255, 255, 255, 0);
}
</style>
