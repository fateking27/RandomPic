<template>
  <div class="layout" ref="scrollContainer" style="">
    <div
      :class="[
        'header min-w-[1200px] mb-[30px] flex justify-center bg-[#ffffff]',
        isFixed ? 'w-[100vw]' : ''
      ]"
      :style="{
        position: isFixed
        // top
      }"
    >
      <div class="menu w-[1200px] max-sm:w-[100vw] h-[100%] flex items-center">
        <div class="logo flex justify-center w-[140px]">
          <img
            class="w-[100%] mt-[-10px]"
            src="https://www.animex.top/wp-content/uploads/2024/06/animex-logo_%E5%B9%B3%E6%BB%91.png"
            alt=""
          />
        </div>
        <div class="p-[10px] pl-0 flex items-center">
          <div class="menu_item">
            <el-dropdown :hide-on-click="false">
              <el-link href="#/home" :underline="false">首页</el-link>
            </el-dropdown>
          </div>
          <div class="menu_item">
            <el-dropdown :hide-on-click="false">
              <el-link :underline="false"
                >资讯&nbsp;
                <el-icon class="arrow_down"><CaretBottom /> </el-icon>
              </el-link>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item><el-link :underline="false">动画</el-link></el-dropdown-item>
                  <el-dropdown-item><el-link :underline="false">轻小说</el-link></el-dropdown-item>
                  <el-dropdown-item><el-link :underline="false">漫画</el-link></el-dropdown-item>
                  <el-dropdown-item><el-link :underline="false">其他</el-link></el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div class="menu_item">
            <el-dropdown :hide-on-click="false">
              <el-link :underline="false">新番放送表</el-link>
            </el-dropdown>
          </div>
          <div class="menu_item">
            <el-dropdown :hide-on-click="false">
              <el-link href="#/pictures" :underline="false">次元图库</el-link>
            </el-dropdown>
          </div>
          <div class="menu_item">
            <el-dropdown :hide-on-click="false">
              <el-link :underline="false"
                >资源合集&nbsp;<el-icon id="arrow_down" class="arrow_down"><CaretBottom /></el-icon
              ></el-link>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    ><el-link :underline="false">动漫番剧</el-link></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-link href="#/resource/novel" :underline="false"
                      >轻小说</el-link
                    ></el-dropdown-item
                  >
                  <el-dropdown-item
                    ><el-link :underline="false">实用软件</el-link></el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div
      class="footer mt-5 bg-[#e3e3e3] bg-opacity-40 text-center text-[#666] text-[12px] pt-5 pb-10 text-wrap"
    >
      <div class="p-[5px]">
        Animex次元社所有内容均收集自其他网站，本站不参与组织扫图、翻译、录入等工作
      </div>
      <div class="p-[5px]">
        网站所发布的一切视频、软件及内容文章仅限用于学习和交流目的；不得将上述内容用于商业或者非法用途，否则，一切后果请用户自负。如喜欢该作品请购买正版
      </div>
      <div class="p-[5px]">
        本站提供的内容版权属于作者，如果无意中侵犯了您的权利，请与我们联系，将在第一时间做出回应
      </div>
      <div class="p-[5px]">Copyright © Animex次元社 All Rights Reserved</div>
      <div class="p-[5px]">{{ initTime }}, Processed in second(s).</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { CaretBottom } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const scrollContainer = ref()
const isFixed = ref()
const initTime = ref()

const handleScroll = (event: any) => {
  if (event.target.children[0].scrollTop > 70) {
    // isFixed.value = 'fixed'
    // top.value = '60px'
  } else {
    isFixed.value = ''
    // top.value = ''
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  setInterval(() => {
    initTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
  }, 1000)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped>
// .layout {
//   // background-image: linear-gradient(120deg, #ffe3e3 0%, #c7ebfd 100%);
// }
.header {
  box-shadow: rgba(33, 35, 38, 0.2) 0px 10px 10px -10px;
  line-height: 100%;
  z-index: 999;
  .menu_item {
    padding: 10px;
    padding-right: 0;
    .arrow_down {
      transition: transform 0.3s ease-in-out;
    }
    // &:hover #arrow_down {
    //   transform: rotate(180deg);
    //   transform-origin: center;
    // }
  }
}
</style>
