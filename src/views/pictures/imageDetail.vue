<template>
  <div class="flex justify-between w-[1200px] m-auto">
    <div
      :class="[
        'left_container',
        'w-[300px] h-[800px] bg-opacity-50 bg-white box-border p-[10px] rounded-lg'
      ]"
    >
      <div class="text-center text-3xl text-[#333] italic">
        <span>{{ imageDetail?.size }}</span>
      </div>
      <div class="flex justify-center p-[10px]">
        <div
          class="w-[50px] h-[20px] hover:scale-125 hover:shadow-md transition-all duration-200"
          v-for="color in theme_colors?.split('/')"
          :key="color"
          :style="{ background: color }"
        ></div>
      </div>
      <el-divider />
      <div>
        <div>
          <span class="text-[#999898] font-bold">标签</span>
        </div>
        <div class="p-[10px] pl-0">
          <el-input v-model="tagInput" clear placeholder="Add Tag..."
            ><template #append>
              <div @click="addTag" class="cursor-pointer hover:text-[#595757] leading-3">
                <el-icon>
                  <Plus />
                </el-icon>
              </div> </template
          ></el-input>
        </div>
        <div>
          <el-tag
            class="cursor-pointer hover:opacity-70"
            closable
            v-for="(tag, index) in imageDetail?.tags?.split(',')"
            :key="index"
            style="
              margin: 0 5px;
              background-color: #d5e4ef;
              font-weight: bold;
              border: none;
              color: #3289c2;
              margin-left: 0;
              margin-bottom: 10px;
            "
            >{{ tag }}</el-tag
          >
        </div>
      </div>
      <el-divider />
      <div>
        <div>
          <span class="text-[#999898] font-bold">图片详情</span>
        </div>
        <div class="flex flex-col ml-[25px]">
          <div class="mt-[15px] flex items-center">
            <div class="text-[13px] text-[#999898] font-bold w-[60px] text-right">Uploader</div>
            <el-avatar class="ml-[10px] mr-[10px]" shape="square" size="" :src="imageDetail.url" />
            <div>
              <div class="text-[11px] text-[#3289c2]">???</div>
              <div
                class="text-[11px] text-[#3289c2]"
                :title="dayjs(imageDetail.uploadTime).format('YYYY-MM-DD HH:mm:ss')"
              >
                {{ dayjs(imageDetail.uploadTime).fromNow() }}
              </div>
            </div>
          </div>
          <div class="mt-[15px] flex items-center">
            <div class="text-[13px] text-[#999898] font-bold w-[60px] text-right">Category</div>
            <div class="ml-[10px] text-[12px] text-[#3289c2] font-bold">
              {{ '???' }}
            </div>
          </div>
          <div class="mt-[15px] flex items-center">
            <div class="text-[13px] text-[#999898] font-bold w-[60px] text-right">Size</div>
            <div class="ml-[10px] text-[12px] text-[#3289c2] font-bold">
              {{
                parseInt(imageDetail.file_size).toString().length <= 6
                  ? (parseInt(imageDetail.file_size) / 1024).toFixed(2) + 'KB'
                  : (parseInt(imageDetail.file_size) / (1024 * 1024)).toFixed(2) + 'MB'
              }}
            </div>
          </div>
          <div class="mt-[15px] flex items-center">
            <div class="text-[13px] text-[#999898] font-bold w-[60px] text-right">Views</div>
            <div class="ml-[10px] text-[12px] text-[#3289c2] font-bold">
              {{ '???' }}
            </div>
          </div>
          <div class="mt-[15px] flex items-center">
            <div class="text-[13px] text-[#999898] font-bold w-[60px] text-right">Favorites</div>
            <div class="ml-[10px] text-[12px] text-[#3289c2] font-bold">
              {{ '???' }}
            </div>
          </div>
        </div>
      </div>
      <el-divider />
      <div>
        <div>
          <span class="text-[#999898] font-bold">操作</span>
        </div>
        <div class="">
          <el-button type="primary" class="w-[100%] mt-[10px]" @click="fullScreen">
            全屏查看
          </el-button>
        </div>
        <div class="">
          <el-button
            v-loading="imgDownloading"
            element-loading-text="下载中..."
            type="primary"
            class="w-[100%] mt-[10px]"
            @click="downloadImage(imageDetail.url)"
          >
            下载图片
          </el-button>
        </div>
      </div>
    </div>
    <div
      :class="[
        'w-[870px] h-[800px] flex items-center justify-center bg-opacity-50 bg-[#fff] box-border p-[10px] rounded-lg'
      ]"
    >
      <img ref="imageRef" style="max-width: 100%; max-height: 100%" :src="imageDetail.url" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getImgById, addImgTag } from '@/api/pictures'
import { useRoute } from 'vue-router'
// @ts-ignore //取消引入报错
import ColorThief from 'colorthief'
import { Plus } from '@element-plus/icons-vue'
import axios from 'axios'
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)
const router = useRoute()
const id = router.query.id as string
const imageDetail = ref<any>({})
const imageRef = ref()
const colorPalette = ref([])
const loading = ref(true)
const theme_colors = ref<string>('')
const tagInput = ref<string>()

const getImgDetail = async () => {
  const { data } = await getImgById({ id })
  imageDetail.value = data
  theme_colors.value = data.theme_colors
  //获取图片存储大小
  // try {
  //   const imgRes = await fetch(imageDetail.value.url, { method: 'HEAD' })
  //   const size = imgRes.headers.get('content-length')
  //   if (size) {
  //     const bytes = parseInt(size)
  //     imageDetail.value.fileSize =
  //       bytes.toString().length <= 6
  //         ? (bytes / 1024).toFixed(2) + 'KB'
  //         : (bytes / (1024 * 1024)).toFixed(2) + 'MB'
  //   }
  // } catch (error) {
  //   const odImgRes = await axios.get(
  //     import.meta.env.VITE_API_PATH + '/od-imagefun?link=' + data.url
  //   )
  //   const bytes = parseInt(odImgRes.headers['content-length'])
  //   imageDetail.value.fileSize =
  //     bytes.toString().length <= 6
  //       ? (bytes / 1024).toFixed(2) + 'KB'
  //       : (bytes / (1024 * 1024)).toFixed(2) + 'MB'
  // }
}

//获取图片主题色
// const getColorPalette = async () => {
//   const colorThief = new ColorThief()
//   const img = imageRef.value
//   if (!img) return
//   const palette = await colorThief.getPalette(img, 5)
//   colorPalette.value = palette.map(([r, g, b]: [number, number, number]) => `rgb(${r}, ${g}, ${b})`)
//   console.log(colorPalette.value)
// }

const addTag = async () => {
  if (!tagInput.value) return
  const tag = tagInput.value
  await addImgTag({ id, tag })
  tagInput.value = ''
  await getImgDetail()
}

const imgDownloading = ref(false)

const downloadImage = async (imgUrl: string) => {
  let imgRes = undefined
  let imgType = ''

  try {
    imgDownloading.value = true
    imgRes = await fetch(imgUrl, { method: 'GET' })
    // imgDownloading.value = false
    const contentType = imgRes.headers.get('content-type')
    imgType = contentType ? contentType.split('/')[1] : 'jpeg'
  } catch (error) {
    imgRes = await fetch(import.meta.env.VITE_API_PATH + '/od-imagefun?link=' + imgUrl, {
      method: 'GET'
    })
    imgDownloading.value = false
    const contentType = imgRes.headers.get('content-type')
    imgType = contentType ? contentType.split('/')[1] : 'jpeg'
    console.log(contentType)
  }

  //生成随机图片名
  const imgName = Array.from(Array(15), () => {
    const rand = Math.random()
    if (rand < 0.33) return String.fromCharCode(Math.floor(Math.random() * 26) + 65) // uppercase
    if (rand < 0.66) return String.fromCharCode(Math.floor(Math.random() * 26) + 97) // lowercase
    return Math.floor(Math.random() * 10).toString() // number
  }).join('')

  //下载图片
  const blob = await imgRes.blob()
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${imgName}.${imgType}`
  a.click()
  window.URL.revokeObjectURL(url)
}

//浏览器全屏查看图片
const fullScreen = () => {
  const img = imageRef.value
  if (img.requestFullscreen) {
    img.requestFullscreen()
  } else if (img.webkitRequestFullscreen) {
    img.webkitRequestFullscreen()
  } else if (img.mozRequestFullScreen) {
    img.mozRequestFullScreen()
  } else if (img.msRequestFullscreen) {
    img.msRequestFullscreen()
  }
}

onMounted(async () => {
  await getImgDetail()

  // imageRef.value.onerror = async () => {
  //   if (!imageDetail.value.url) return
  //   imageRef.value.src =
  //     import.meta.env.VITE_API_PATH + '/od-imagefun?link=' + imageDetail.value.url
  // }

  // imageRef.value.onload = async () => {
  //   await getColorPalette()
  //   loading.value = false
  // }
})
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  opacity: 0;
  width: 5px;
  background-color: rgb(235, 235, 235, 0);
}

::-webkit-scrollbar-thumb {
  background-color: rgb(191, 191, 191, 0);
  border-radius: 5px;
}

.left_container {
  overflow-y: auto;
  scrollbar-gutter: stable;

  &:hover {
    &::-webkit-scrollbar {
      width: 5px;
      background-color: rgb(235, 235, 235);
    }

    &::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
      border-radius: 5px;
    }
  }
}
</style>
