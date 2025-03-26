<template>
  <div class="home w-[1200px] mx-auto">
    <div class="flex justify-between">
      <div class="block text-center w-[475px]">
        <el-carousel height="250px" class="rounded-lg" motion-blur>
          <el-carousel-item
            class="bg-slate-500 text-center"
            style="line-height: 250px"
            v-for="item in 4"
            :key="item"
          >
            <div class="h-[100%] w-[100%]">
              <img
                width="100%"
                src="https://opreviews.anime-pictures.net/505/50545bfd8a31e671068e49a7320cc114_lp.jpg.avif"
                alt=""
              />
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div
        class="w-[700px] h-[250px] flex flex-wrap justify-between"
        style="align-content: space-between"
      >
        <div class="item" v-for="item in 6" :key="item">
          <img width="100%" src="http://lain.bgm.tv/pic/cover/c/78/b7/459435_6S18e.jpg" alt="" />
          <div class="item_title bg-[#272727] bg-opacity-50 h-[45px]">
            <div>
              <el-link class="text-[#fff]" :underline="false">
                【轻小说速递】八奈见的败北，竟全拜某蓝发败犬所赐？</el-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-[30px]">
      <div class="left w-[870px] h-[auto] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h3>资讯</h3>
          <el-link :underline="false">更多>></el-link>
        </div>
        <div class="h-[170px] flex justify-between items-center">
          <div v-for="item in 5" class="w-[150px] h-[160px]">
            <div
              class="cover h-[90px] w-[100%] bg-slate-500 rounded-lg overflow-hidden cursor-pointer"
            >
              <img
                width="100%"
                src="http://lain.bgm.tv/pic/cover/c/d2/81/445821_pc44z.jpg"
                alt=""
              />
            </div>
            <div
              class="h-[39px] w-[100%] text-[14px] cursor-pointer"
              style="
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                -webkit-line-clamp: 2;
              "
            >
              <div class="p-[5px] pt-0 transition-all ease-in">
                <el-link :underline="false">
                  【轻小说速递】八奈见的败北，竟全拜某蓝发败犬所赐？</el-link
                >
              </div>
            </div>
            <div
              class="text-[#b8b7b7] h-[30px] leading-[30px] text-[13px] flex items-center justify-between"
            >
              <div class="flex items-center w-[60px]">
                <el-icon><View /></el-icon>
                <div class="pl-[5px]">{{ numValue }}</div>
              </div>
              <div class="flex items-center w-[60px]">
                <el-icon><Postcard /></el-icon>
                <div class="pl-[5px]">{{ numValue }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="right w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h4>热点资讯</h4>
        </div>
        <div class="text-[13px] relative">
          <div
            v-for="(item, index) in 6"
            class="h-[21px] m-[7px] ml-0 leading-[20px] cursor-pointer"
          >
            <div
              :data-num="index + 1"
              :id="'befcolor_' + index"
              class="truncate before:content-[attr(data-num)] before:bg-slate-300 before:text-[#fff] before:absolute before:w-[20px] before:h-[20px] before:leading-[20px] before:rounded-[0%] before:text-center"
            >
              <span class="ml-[25px] transition-all ease-in hover:text-[#ed7b7b]">
                【轻小说速递】八奈见的败北，竟全拜某蓝发败犬所赐？</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 每日番组放送 -->
    <div class="anime__calendar flex justify-between mt-[30px]">
      <div class="w-[870px] bg-opacity-50 min-h-[180px] bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h3><span>新番时间表</span>&nbsp;/{{ animeCalendarData?.today.split('/')[1] }}</h3>
        </div>
        <div class="flex justify-between items-start relative mt-1">
          <el-tabs
            v-model="activeName"
            type="card"
            class="w-[100%] rounded-lg"
            @tab-click="handleClick"
          >
            <el-tab-pane
              class="relative rounded-lg z-0"
              v-for="item in animeCalendarData?.rows"
              :key="item.week_date"
              :label="item.week_date == dayjs().format('ddd') ? '今天' : item.week_date_zh"
              :name="item.week_date"
            >
              <div
                class="absolute right-2 top-[45%] z-[10] bg-white hover:scale-125 h-[40px] w-[40px] rounded-[50%] cursor-pointer flex items-center justify-center"
                :style="{
                  'box-shadow':
                    'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                  opacity:
                    right == `${Math.ceil(item.children.length / 5) * 870 - 870}px` ? '0' : '1',
                  transition: 'opacity 0.5s ease-in-out'
                }"
                @click="nextAnime(item.children)"
              >
                <el-icon><ArrowRightBold /></el-icon>
              </div>
              <div
                class="absolute left-2 top-[45%] z-10 bg-white hover:scale-125 h-[40px] w-[40px] rounded-[50%] cursor-pointer flex items-center justify-center"
                :style="{
                  'box-shadow':
                    'rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,rgba(9, 30, 66, 0.08) 0px 0px 0px 1px',
                  opacity: right == '0px' ? '0' : '1',
                  transition: 'opacity 0.5s ease-in-out'
                }"
                @click="prevAnime"
              >
                <el-icon><ArrowLeftBold /></el-icon>
              </div>
              <div
                class="relative flex"
                :style="{
                  right: right,
                  transition: 'right 0.5s ease-in-out',
                  width: `${Math.ceil(item.children.length / 5) * 870}px`
                }"
              >
                <div
                  class="h-[250px] m-[8px] relative cursor-pointer overflow-hidden rounded-lg"
                  style="
                    box-shadow:
                      rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
                      rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
                  "
                  v-for="itemChild in item.children"
                >
                  <div
                    class="hover:h-[auto] h-[20px] w-[100%] p-1 bg-[#000] bg-opacity-50 text-white absolute bottom-0"
                  >
                    <p>{{ itemChild.name_zh }}</p>
                    <p>{{ itemChild.name }}</p>
                  </div>
                  <img
                    class="h-[100%] w-[158px] block rounded-lg"
                    :src="itemChild.bg_cover"
                    alt=""
                  />
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div
            class="absolute right-0 w-[100%] rounded-lg h-[50px] leading-[40px] flex justify-end items-center transition-all ease-in"
            style="
              background-color: rgba(255, 255, 255, 0.6);
              backdrop-filter: blur(6px);
              box-shadow: rgba(142, 142, 142, 0.15) 0px 6px 15px 0px;
            "
          >
            <div
              class="cursor-pointer text-center bg-white bg-opacity-70 text-[15px] h-[20px] mr-[5px] rounded-lg p-[10px] hover:text-[#ff9f9f] active:text-[#ff9f9f] transition-all ease-in-out duration-300 hover:shadow-lg flex items-center"
            >
              查看全部 <el-icon><ArrowRightBold /></el-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h4>本季热门新番</h4>
          <h6
            class="hover:text-[#ff9f9f] cursor-pointer transition-all"
            @click="$router.push('/animelist')"
          >
            更多>>
          </h6>
        </div>
        <div>
          <div
            class="flex justify-between w-[100%] h-[60px] m-[5px] mr-0 ml-0 overflow-hidden"
            v-for="(item, index) in hotAnimeData?.slice(0, 5)"
            :key="item.id"
          >
            <div class="rounded-md overflow-hidden h-[100%] w-[85px]">
              <el-image :src="item.cover" style="width: 85px; cursor: pointer"></el-image>
            </div>
            <div>
              <div class="title w-[190px] text-[12px] h-[20px] truncate cursor-pointer">
                <el-link
                  ><span>{{ item.name_zh }}&nbsp;</span>
                  <span class="text-[10px]">{{ item.name }}</span></el-link
                >
              </div>
              <div class="w-[190px] flex flex-wrap content-between">
                <div class="w-[100%] text-[11px] h-[15px] overflow-hidden truncate">
                  <span>{{ item.info }}</span>
                </div>
                <starRate :data="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-[30px] h-[auto]">
      <div class="left w-[870px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h3>次元图库</h3>
          <el-link href="#/pictures" :underline="false">更多>></el-link>
        </div>
        <div class="flex justify-between flex-wrap">
          <div
            v-for="item in picturesData"
            @click="() => $router.push({ path: '/imagedetail', query: { id: item.id } })"
            class="mt-[10px] relative"
          >
            <div class="cover h-[150px] w-[150px] overflow-hidden cursor-pointer">
              <el-image style="width: 100%; height: 100%" fit="contain" :src="item.url" />
            </div>
            <div
              class="cursor-pointer hover:text-[#ed7b7b] w-[150px] truncate text-center text-white bg-[#f4a9a9] bg-opacity-70 absolute bottom-0"
            >
              {{ item.size }}
            </div>
          </div>
        </div>
      </div>

      <div class="right w-[300px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="flex justify-between h-[30px] leading-[30px]">
          <h4>Pixiv插画今日排行</h4>
        </div>
        <div class="text-[13px] relative">
          <div
            v-for="(item, index) in pixivRankData?.slice(0, 6)"
            :key="item.img_id"
            class="h-[21px] m-[7px] ml-0 mr-0 leading-[20px] cursor-pointer"
            :id="'pic_befcolor_' + index"
          >
            <el-image
              style="position: absolute; top: 0; left: 0; border-radius: 0 0 8px 8px"
              fit="cover"
              :src="VITE_IMG_PATH + '/thumbnail/' + item.file_url.split('/pixiv/')[1]"
              v-if="item.rank === 1"
            ></el-image>
            <div
              :data-num="'TOP ' + item.rank"
              class="truncate before:content-[attr(data-num)] before:bg-slate-300 before:text-[#fff] before:absolute before:h-[20px] before:leading-[20px] before:rounded-tr-lg before:rounded-br-lg before:text-center before:text-[11px] before:font-style-[italic] before:w-[40px] before:left-[-10px]"
            >
              <span
                :class="[
                  'ml-[35px] transition-all ease-in hover:text-[#ed7b7b] cursor-pointer',
                  item.rank === 1 ? 'text-[#fff]' : ''
                ]"
              >
                {{ item.title }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAnimeCalendar, getBgmHotAnimeData } from '@/api/anime_data'
import { getPixivRank, downloadPixivImg } from '@/api/pixiv'
import { imagePageGet } from '@/api/pictures'
import { View, Postcard, ArrowRightBold, ArrowLeftBold } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import type { TabsPaneContext } from 'element-plus'

defineOptions({
  name: 'home'
})

import starRate from '@/components/satrRate/index.vue'
import type { de } from 'element-plus/es/locales.mjs'

const { VITE_IMG_PATH } = import.meta.env

const numValue = ref()

const activeName = ref('')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
  right.value = '0px'
}

const animeCalendarData = ref()
const hotAnimeData = ref()
const pixivRankData = ref()

const numberFormat = (val: any) => {
  let numValue = '0'
  if (val < 1000) {
    numValue = val
  } else if (val > 1000 && val < 10000) {
    numValue = val
  } else if (val > 10000 && val < 100000) {
    numValue = `${(val / 1000).toFixed()}k`
  } else if (val > 100000) {
    numValue = `${(val / 10000).toFixed()}w`
  }
  return numValue
}

const animeCalendar = async () => {
  const { data } = await getAnimeCalendar()
  animeCalendarData.value = data
}

const getHotAnimeData = async () => {
  const { data } = await getBgmHotAnimeData()
  hotAnimeData.value = data
}

const picturesData = ref()
const getPicturesData = async () => {
  const { data } = await imagePageGet({
    pageSize: 10,
    pageCount: 1
  })
  picturesData.value = data
  console.log(data)
}

const pixivRank = async () => {
  const { data } = await getPixivRank()
  pixivRankData.value = data
}

const downloadPixivImage = async (data: any) => {
  const res: any = await downloadPixivImg(data)
  const blob = new Blob([res])
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${data.title}.jpg`
  a.click()
  window.URL.revokeObjectURL(url)
}

const init = async () => {
  animeCalendar()
  getHotAnimeData()
  getPicturesData()
  pixivRank()
  activeName.value = dayjs().format('ddd')
}

const right = ref('0px')
const nextAnime = (children: any) => {
  if (parseInt(right.value) + 870 === Math.ceil(children.length / 5) * 870) return
  right.value = `${parseInt(right.value) + 870}px`
}
const prevAnime = () => {
  if (parseInt(right.value) === 0) return
  right.value = `${parseInt(right.value) - 870}px`
}

onMounted(async () => {
  await init()
  numValue.value = numberFormat(2333)
})
</script>

<style lang="scss" scoped>
.item {
  width: 210px;
  height: 110px;
  background-color: rgb(228, 228, 228);
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  &:hover .item_title {
    width: 100%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    position: absolute;
    bottom: 0px;
    div {
      margin: 3px;
      margin-top: 0;
    }
  }
  .item_title {
    overflow: hidden;
    position: absolute;
    bottom: -45px;
    width: 100%;
    transition:
      bottom 0.2s ease-in,
      color 0.2s ease-in;
    div {
      margin: 3px;
      margin-top: 0;
    }
    &:hover {
      color: #5d9ff4;
    }
  }
}

#befcolor_0::before {
  background-color: #f65454;
}
#befcolor_1::before {
  background-color: #5d9ff4;
}
#befcolor_2::before {
  background-color: #f4a35d;
}

#pic_befcolor_0 {
  background-color: #5d9ff4;
  height: 150px;
  border-radius: 0 0 8px 8px;
  // overflow: hidden;
  box-sizing: border-box;
  padding: 5px;
  position: relative;
  margin-top: 5px;
  div {
    // margin-top: 90px;
    height: 100%;
    width: 100%;
    // color: #f65454;
    span {
      margin-left: 0;
      display: block;
      overflow: hidden;
      height: 40px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      text-wrap: wrap;
      -webkit-line-clamp: 2;
      margin-left: 18px;
      margin-top: 100px;
      line-height: 20px;
      font-size: 24px;
      font-weight: bold;
      font-style: italic;
    }
    position: absolute;
    left: -10px;
    top: 0;
    &::before {
      background-color: #f65454;
      width: 60px;
      height: 25px;
      line-height: 25px;
      border-radius: 0 10px 10px 0px;
      top: 30px;
      font-style: italic;
      font-weight: bold;
      left: -10px;
    }
  }
}
#pic_befcolor_1 {
  margin-top: 20px;
  div::before {
    background-color: #5d9ff4;
    font-style: italic;
    left: -10px;
    width: 40px;
    font-size: 11px;
    border-radius: 0 8px 8px 0px;
  }
}
#pic_befcolor_2 {
  div::before {
    background-color: #f4a35d;
    font-style: italic;
    left: -10px;
    width: 40px;
    font-size: 11px;
    border-radius: 0 8px 8px 0px;
  }
}
#pic_befcolor_3 {
  div::before {
    background-color: #5fc354;
    font-style: italic;
    left: -10px;
    width: 40px;
    font-size: 11px;
    border-radius: 0 8px 8px 0px;
  }
}

#week_active {
  background-color: #ffffff;
  color: #fff;
}

:deep(.el-tabs__header) {
  border: none;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__nav) {
  border: none;
  border-radius: 8px;
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item) {
  border: none;
  margin: 5px;
  transition: all 0.3s ease-in-out;
  &:hover {
    background-color: #ffffff;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.18) 0px 0px 4px;
  }
}

:deep(.el-tabs__item.is-active) {
  background-color: #ffffff;
  color: #ff9f9f;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.18) 0px 0px 4px;
  // background-color: opacify($color: #ffffff, $amount: 0);
}

.anime__calendar {
  position: relative;
  :deep(.el-carousel__indicators) {
    display: none;
  }
}
</style>
