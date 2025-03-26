<template>
  <div class="w-[1200px] m-auto">
    <div class="anime__calendar min-h-[100vh] flex justify-between">
      <div class="w-[870px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg">
        <div class="h-[auto]">
          <h4>全部动画</h4>
          <div></div>
        </div>
        <div class="w-[100%]">
          <div
            class="flex pb-5 w-[100%] m-[5px] mt-[15px] mr-0 ml-0 border-dashed border-b border-t-0 border-r-0 border-l-0"
            v-for="item in hotAnimeData"
            :key="item.id"
          >
            <div
              class="rounded-md p-[2px] h-[120px] mr-[20px] hover:skew-y-6 transition-all ease-in-out"
              style="
                box-shadow:
                  rgba(6, 24, 44, 0.4) 0px 0px 0px 1px,
                  rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
                  rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
              "
            >
              <el-image
                class="rounded-md"
                fit="contain"
                :src="item.cover"
                style="width: 85px; cursor: pointer"
              ></el-image>
            </div>
            <div>
              <div class="title cursor-pointer text-wrap">
                <div>
                  <el-link
                    ><span class="text-[16px]">{{ item.name_zh }}&nbsp;</span> </el-link
                  ><span class="text-[10px]">{{ item.name }}</span>
                </div>
              </div>
              <div>
                <div class="text-[14px] p-[10px] pr-0 pl-0 pb-0">
                  <span>{{ item.info }}</span>
                </div>
                <starRate :data="item" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-[300px] bg-opacity-50 bg-[#fff] box-border p-[10px] rounded-lg">
        <div class="flex justify-between items-start mb-3">
          <div class="w-[100%]">
            <div
              class="right-0 rounded-lg h-[40px] leading-[40px] transition-all ease-in"
              style="
                background-color: rgba(255, 255, 255, 0.75);
                /* backdrop-filter: blur(6px); */
                /* box-shadow: rgba(142, 142, 142, 0.15) 0px 6px 15px 0px; */
              "
            >
              <div class="pl-[10px] text-[20px]">分类</div>
              <div class="flex flex-wrap text-blue-500">
                <div
                  :class="[
                    isActive == item ? 'active' : '',
                    'mt-[5px]',
                    'p-[10px]',
                    'pt-0',
                    'pb-0',
                    'h-[30px]',
                    'leading-[30px]',
                    'cursor-pointer',
                    'hover:bg-[#ed7b7b]',
                    'hover:opacity-75',
                    'hover:text-white',
                    'rounded-[15px]',
                    'mr-[5px]'
                  ]"
                  v-for="item in categorys"
                  :key="item"
                  @click="isActive = item"
                >
                  {{ item }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { getBgmHotAnimeData } from '@/api/anime_data'

import starRate from '@/components/satrRate/index.vue'

const hotAnimeData = ref()
const categorys = ref(['全部', 'TV', 'WEB', 'OVA', '剧场版', '动态漫', '其他'])
const isActive = ref()

const getHotAnimeData = async () => {
  const { data } = await getBgmHotAnimeData()
  data.forEach((item: any) => {
    item.point = 'score'
  })
  console.log(data)
  // point.score = data
  hotAnimeData.value = data
}

onMounted(async () => {
  isActive.value = categorys.value[0]
  await getHotAnimeData()
})
</script>

<style lang="scss" scoped>
.active {
  background-color: #ed7b7b;
  opacity: 0.75;
  color: white;
}
</style>
