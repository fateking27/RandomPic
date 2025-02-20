<template>
  <div :class="['bg-white bg-opacity-50 rounded-lg', 'flex', 'justify-center', 'flex-wrap']">
    <div class="text-[50px] w-[100%] max-sm:w-[100vw] text-center">Animex</div>
    <div class="m-[10px] w-[100%] text-[20px] max-2xl:w-[100%] max-sm:w-[100vw] text-center">
      壁纸上传
    </div>
    <div class="w-[100%] max-sm:w-[100vw] flex justify-center items-center">
      <el-upload
        ref="uploadRef"
        class="upload-demo"
        :auto-upload="false"
        :on-change="fileChange"
        :http-request="oneDriveUpload"
        multiple
        list-type="picture"
        accept="image/*"
        :limit="30"
        :before-upload="beforeAvatarUpload"
        :on-exceed="handleExceed"
        :show-file-list="false"
        :file-list="fileList"
      >
        <template #trigger>
          <el-button>选择文件</el-button>
        </template>

        <el-button class="ml-3" @click="submitUpload"> 开始上传 </el-button>
        <el-button class="ml-3" @click="clearFileList"> 清空 </el-button>

        <template #tip>
          <!-- <div class="el-upload__tip">size less than 20MB</div> -->
        </template>
      </el-upload>
    </div>
    <div
      class="flex flex-wrap justify-center items-center min-h-[200px] w-[80%] m-[30px] mt-[10px] rounded-lg bg-slate-100 bg-opacity-60"
      style="
        box-shadow:
          rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
          rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
      "
    >
      <div
        v-for="item in fileList"
        class="group w-[300px] h-[200px] m-[10px] cursor-pointer relative"
        @click="onImage(item)"
      >
        <div class="absolute z-10 flex justify-center w-[100%] h-[100%] items-center">
          <div
            :class="[
              'text-[40px] w-[50px] h-[50px] flex justify-center items-center rounded-[50%]',
              item.imgStatus == 'success'
                ? 'text-green-500 border-green-500 border-2  border-solid'
                : item.imgStatus == 'fail'
                  ? 'text-red-500 border-red-500 border-2  border-solid'
                  : '',
              ''
            ]"
          >
            <el-icon v-if="item.imgStatus == 'success'"><Check /></el-icon>
            <el-icon v-if="item.imgStatus == 'fail'"><CloseBold /></el-icon>
          </div>
        </div>
        <div>
          <div
            :class="[
              'bg-black w-[100%] h-[auto] absolute z-20 bg-opacity-60',
              'overflow-hidden text-white text-[14px] box-border p-[5px]',
              'flex justify-between items-center rounded-t-lg'
            ]"
          >
            <div :title="item.name" class="w-[200px] truncate">
              {{ item.name }}
            </div>
            <div>
              {{ item.fileSize }}
            </div>
          </div>
        </div>
        <el-image
          style="width: 100%; height: 100%; border-radius: 8px"
          :src="item.url"
          fit="cover"
          v-loading="item.loading"
          element-loading-text="上传中..."
        ></el-image>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Check, CloseBold } from '@element-plus/icons-vue'

import { odUploadFile, easyUpload } from '@/api/pictures'

import {
  type UploadInstance,
  type UploadUserFile,
  type UploadProps,
  ElMessage,
  type ElMessageBox
} from 'element-plus'
import axios from 'axios'

const uploadRef = ref<UploadInstance>()

const fileList = ref<any>([])

const submitUpload = () => {
  uploadRef.value!.submit()
}

const clearFileList = () => {
  fileList.value = []
}

const fileChange = (file: any, files: any) => {
  console.log(files)
  fileList.value = files
  files.forEach((item: any) => {
    const bytes = parseInt(item.size)
    item.fileSize =
      bytes.toString().length <= 6
        ? (bytes / 1024).toFixed(2) + 'KB'
        : (bytes / (1024 * 1024)).toFixed(2) + 'MB'
  })
}

const oneDriveUpload = async (data: any) => {
  fileList.value.forEach((item: { uid: string; loading: boolean }) => {
    if (item.uid == data.file.uid) {
      item.loading = true
    }
  })
  const formData = new FormData()
  formData.append('file', data.file)

  const res: any = await easyUpload(formData)
  // console.log(res)
  if (res.code === 200) {
    fileList.value.forEach(
      (item: { url: any; imgStatus: string; uid: string; loading: boolean }) => {
        if (item.uid == data.file.uid) {
          item.imgStatus = 'success'
          item.loading = false
        }
      }
    )
  } else {
    fileList.value.forEach((item: any) => {
      if (item.uid == data.file.uid) {
        item.imgStatus = 'fail'
        item.message = res.message
        item.loading = false
      }
    })
  }
  // fileList.value.forEach((item: { uid: string; loading: boolean }) => {
  //   if (item.uid == data.file.uid) {
  //     item.loading = false
  //   }
  // })
}

const onImage = (item: any) => {
  console.log(item)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type.split('/')[0] !== 'image') {
    ElMessage.error('请上传图片')
    return false
  } else if (rawFile.size / 1024 / 1024 > 20) {
    ElMessage.error('图片大小不能大于20MB！')
    return false
  }
  return true
}

const handleExceed: UploadProps['onExceed'] = (files, uploadFiles) => {
  ElMessage.warning(`当前仅允许同时上传 30 张图片，请重新选择`)
}
</script>

<style lang="scss" scoped></style>
