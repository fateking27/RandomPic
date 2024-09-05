<template>
  <div class="min-h-[100vh]">
    <div class="common-layout flex">
      <div class="ad w-[15vw]"></div>
      <el-container class="w-[70vw]">
        <el-header class="flex items-center max-[375px]:justify-center fixed z-10 bg-white w-[100%]">
          <div class="flex h-10" style="line-height: 40px;">
            <h2>ANIME<span class="text-red-700">X</span></h2>&nbsp;
            <h3 class="text-zinc-400">| API 接口服务</h3>
          </div>
        </el-header>
        <el-main style="padding: 10px;" class="mt-[50px]">
          <div class="random_img flex justify-center items-center mb-[20px] min-h-[355px]">
            <el-image :src="imgValue.url" fit="contain">
              <template #placeholder>
                <div id="loader">
                  <div id="shadow"></div>
                  <div id="box"></div>
                </div>
              </template>
            </el-image>
          </div>
          <div class="img_id">
            <h1 class="text-3xl">图片编号：# {{ imgValue.id }}</h1>
            <div class="mt-[20px] flex flex-wrap">
              <el-button type="primary" @click="getRandomImgJson(data)">换一张</el-button>
              <el-button type="success" @click="handleCopy()">复制链接</el-button>
              <!-- <el-button type="danger">色图 MODE</el-button> -->
            </div>
          </div>
          <h2 class="title mt-[20px]">| 参数说明</h2>
          <div class="text-slate-500" style="line-height: 24px;">
            <div class="mt-[15px]">
              <p>当前随机图池中有 <span class="text-red-700">{{ imgValue.total }}</span> 张图片</p>
              <span>API <span>近三小时调用( {{ moment().subtract(2, 'hours').format('H') }}:00-{{ moment().add(1,'hours').format('H') }}:00 ) <span
                    class="text-red-700">{{
                      imgValue.three_hours_counts }}</span> 次，</span> 当日调用
                <span class="text-red-700">{{ imgValue.today_counts }}</span> 次，共计调用 <span class="text-red-700">{{
                  imgValue.counts
                }}</span> 次</span>

              <p>当前随机图池都是偏向于二次元风格的图片，更多风格内容持续更新中......</p>
              <p>由于部分图片存储使用的是第三方图床服务所以无法保证稳定性与访问速度</p>

            </div>
            <div>
              <br>
              <span></span>
            </div>
          </div>
          <el-card class="min-[680px]:hidden mt-[20px] text-xs" v-for="item in tableData" :key="item.url">
            <div class="flex justify-center flex-wrap">
              <div class="text-center">
                <h4>{{ item.description }}：</h4>
              </div>
              <div class="text-center">
                <span class="text-red-700" @click="toPage(item.url)">{{ item.url }}</span>
              </div>
            </div>
          </el-card>
          <el-card class="max-[680px]:hidden">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="description" label="描述" />
              <el-table-column prop="req" label="请求方式"></el-table-column>
              <el-table-column prop="url" label="URL">
                <template #default="scope">
                  <span style="color: brown;cursor: pointer;" @click="toPage(scope.row.url)">
                    {{ scope.row.url }}
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="remark" label="备注" />
            </el-table>
          </el-card>
        </el-main>

      </el-container>
      <div class="ad w-[15vw]"></div>
    </div>
    <el-footer style="min-height: 100px;"
      class="bg-slate-800 w-[100%] text-slate-50 flex items-center max-[680px]:justify-center">
      <div class='text-center'>
        <span>Copyright © 2024.</span>
        <span class="text-red-700 cursor-pointer" @click="toPage()"> ANIMEX.TOP</span>
        <span> Allrights Reserved.</span>
      </div>
    </el-footer>
  </div>

</template>


<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { getRandomImg } from '@/api/randomImg'
import useClipboard from 'vue-clipboard3'
import { ElNotification } from 'element-plus';
import moment from 'moment'

const { toClipboard } = useClipboard()

const toPage = (path?: string) => {
  let url = path ? window.location.protocol + '//' + path.split('//')[1] : window.location.protocol + '//' + 'www.animex.top'
  window.open(url, '_blank')
}

const text = ref('')
const handleCopy = async () => {
  try {
    await toClipboard(text.value)
    ElNotification({
      title: '复制成功',
      type: 'success',
      message: '╰(￣ω￣ｏ)'
    })
  } catch (e) {
    console.error(e);
    ElNotification({
      title: '复制失败',
      type: 'error',
      message: 'ಥ_ಥ'
    })
  }
}

const data = ref({
  type: 'json'
})
const imgValue = reactive({
  id: '',
  url: '',
  counts: '',
  today_counts: '',
  three_hours_counts: '',
  total: ''
})

const getRandomImgJson = async (data?: any) => {
  const res = await getRandomImg(data)
  imgValue.url = res.data.data.url
  imgValue.id = res.data.data.id
  imgValue.counts = res.data.api_counts_info.counts
  imgValue.today_counts = res.data.api_counts_info.today_counts
  imgValue.three_hours_counts = res.data.api_counts_info.three_hours_counts
  imgValue.total = res.data.total
  text.value = res.data.data.url
}

const tableData = [
  {
    description: '随机获得一张图片',
    req: 'GET',
    url: `${import.meta.env.VITE_API_PATH}/random_img?type=image'`,
    remark: '直接返回一张图片'
  },
  {
    description: '以json形式返回数据',
    req: 'GET',
    url: `${import.meta.env.VITE_API_PATH}/random_img?type=json`,
    remark: '返回json数据和状态码'
  },
]

onMounted(() => {
  getRandomImgJson(data.value)
})
</script>

<style lang="less" scoped>
@media screen and (max-width: 1000px) {
  .ad {
    display: none;
    color: #18ffcd;
  }
}

#loader {
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
}

@keyframes loader {
  0% {
    left: -100px
  }

  100% {
    left: 110%;
  }
}

#box {
  width: 50px;
  height: 50px;
  background: #2b93f5;
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

#shadow {
  width: 50px;
  height: 5px;
  background: #494949;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}

@keyframes shadow {
  50% {
    transform: scale(1.2, 1);
  }
}
</style>