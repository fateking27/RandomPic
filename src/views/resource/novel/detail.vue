<template>
  <div :class="['flex', 'justify-between']">
    <div :class="['w-[870px]', 'box-border', 'rounded-lg']">
      <div
        :class="[
          'w-[870px]',
          'h-[auto]',
          'flex',
          'box-border',
          'p-[10px]',
          'bg-opacity-50',
          'bg-white',
          'rounded-lg',
          'shadow'
        ]"
      >
        <div :class="['w-[200px]', 'h-[300px]', 'shadow-lg', 'rounded-lg', 'mr-[35px]']">
          <el-image
            style="width: 200px; height: 300px; border-radius: 8px"
            fit="cover"
            :src="novelDetailData.cover"
          ></el-image>
        </div>
        <div :class="['w-[100%]', 'h-[auto]']">
          <div class="text-[24px] font-bold">
            {{ novelDetailData.name }}
          </div>
          <div class="mt-[10px]">
            <el-tag type="success" effect="dark" :class="['mr-2', 'cursor-pointer']">{{
              novelDetailData.status?.split('：')[1]
            }}</el-tag>
            <el-tag type="primary" effect="dark" :class="['mr-2', 'cursor-pointer']">{{
              novelDetailData.library_class?.split('：')[1]
            }}</el-tag>
            <el-tag
              type="info"
              :class="[
                'mr-2',
                'cursor-pointer',
                'hover:text-[#ed7b7b]',
                'hover:border-[#ed7b7b]',
                'ease-in-out',
                'transition-all'
              ]"
              v-for="tag in novelDetailData.tags?.split(',')"
              :key="tag"
            >
              {{ tag }}
            </el-tag>
          </div>
          <div class="mt-[10px] text-[12px] w-[100%]">
            <span :class="['mr-3']">{{ novelDetailData.author }}</span>
            <span :class="['mr-3']">{{ novelDetailData.updatetime }}</span>
            <span :class="['mr-3']">{{ novelDetailData.article_length }}</span>
          </div>
          <div class="mt-[10px] bg-[#f9e8e8] p-[10px] rounded-md cursor-pointer shadow">
            最近更新：
            <el-link :underline="true" class="text-[16px]">
              {{ novelDetailData.latest_chapter }}
            </el-link>
          </div>
          <div v-html="novelDetailData.brief" class="mt-[10px] text-[14px]" />
          <div class="mt-[10px]">
            <el-button type="primary" @click="toNovelChapterDetail(novelDetailData.id)"
              >开始阅读</el-button
            >
            <el-button type="primary" plain>加入收藏</el-button>
            <!-- <el-button type="primary" plain>同作者作品</el-button> -->
            <el-button type="primary" plain @click="centerDialogVisible = true">全本下载</el-button>
            <!-- <el-button type="primary" plain>分卷下载</el-button> -->
          </div>
        </div>
      </div>
      <div
        :class="[
          'w-[100%]',
          'h-[auto]',
          'flex',
          'box-border',
          'p-[10px]',
          'bg-opacity-50',
          'bg-white',
          'rounded-lg',
          'mt-[10px]',
          'shadow',
          'hidden'
        ]"
      >
        <div class="text-[14px] font-bold flex items-center justify-center w-[100%]">
          <!-- <el-button type="primary" plain>同作者作品</el-button> -->
          <el-button type="primary" plain @click="centerDialogVisible = true">全本下载</el-button>
          <el-button type="primary" plain>分卷下载</el-button>
        </div>
      </div>
      <div
        class="w-[100%] h-[auto] bg-opacity-50 bg-white box-border p-[10px] rounded-lg mt-[10px] shadow hidden"
      >
        <div>相关推荐</div>
        <div class="flex justify-around mt-[10px]">
          <div
            v-for="item in 6"
            class="bg-opacity-50 bg-white box-border p-[8px] shadow cursor-pointer w-[130px] rounded-lg overflow-hidden"
          >
            <div class="w-[100%] h-[160px] rounded-lg overflow-hidden">
              <el-image
                style="width: 100%; height: 160px"
                fit="cover"
                :src="novelDetailData.cover"
              ></el-image>
            </div>
            <div
              :title="novelDetailData.name"
              class="w-[100%] mt-[10px] bg-opacity-50 text-[14px] text-center transition-all ease-in-out truncate hover:text-[#ed7b7b]"
            >
              {{ novelDetailData.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        :class="[
          'w-[100%]',
          'h-[auto]',
          'bg-opacity-50',
          'bg-white',
          'box-border',
          'p-[10px]',
          'rounded-lg',
          'mt-[10px]',
          'shadow'
        ]"
      >
        <div class="text-[16px] font-bold text-center">
          《{{ novelDetailData.name }}》
          <span>书评吐槽，不吐不快</span>
        </div>
        <el-divider />
        <div class="bg-white box-border shadow rounded-lg p-[10px]">
          <div class="border-[1px] rounded-lg pb-2">
            <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" />
            <Editor
              style=""
              v-model="commentData.content"
              :defaultConfig="editorConfig"
              :mode="mode"
              @onCreated="handleCreated"
            />
          </div>
          <div class="mt-[10px] flex justify-between">
            <div class="flex items-center text-[14px]">
              <el-icon><ChatLineSquare /></el-icon>
              <span class="p-1">书评吐槽({{ novelCommentListData.total }})</span>
            </div>
            <div>
              <el-button type="primary" @click="postNovelComment">发表评论</el-button>
            </div>
          </div>
        </div>
        <div
          :class="['w-[100%]', 'bg-opacity-100', 'bg-white', 'shadow', 'mt-[10px]', 'rounded-lg']"
          v-for="(item, index) in novelCommentListData.data"
          :key="item.id"
        >
          <div class="flex items-center justify-between p-[10px]">
            <div class="flex justify-between w-[100%]">
              <div class="flex items-center">
                <el-avatar size="large" :src="item.user_avatar"></el-avatar>
                <div class="ml-[10px]">
                  <div class="text-[14px] font-bold">{{ item.user_name }}</div>
                  <div class="text-[12px]">{{ item.created_time }}</div>
                </div>
              </div>
              <!-- <div>#{{ item.id }}</div> -->
            </div>
          </div>
          <div class="p-[10px]" v-html="item.content" />
        </div>
        <div class="w-[100%] flex justify-center">
          <el-pagination
            size="small"
            background
            layout="prev, pager, next"
            :hide-on-single-page="true"
            :page-size="pagination.pageSize"
            :total="novelCommentListData.total"
            @current-change="handleCurrentChange"
            class="mt-4"
          />
        </div>
      </div>
    </div>
    <div :class="['w-[300px]', 'max-sm:hidden']">
      <div
        :class="[
          'w-[100%]',
          'h-[auto]',
          'bg-opacity-50',
          'bg-white',
          'box-border',
          'rounded-lg',
          'p-[10px]',
          'shadow',
          'flex',
          'flex-col',
          'justify-center'
        ]"
      >
        <div class="w-[auto] text-center">搜索</div>
        <div class="mt-[10px]">
          <el-input
            v-model="comment"
            placeholder="请输入搜索内容"
            clearable
            suffix-icon="el-icon-search"
          />
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="centerDialogVisible"
    title="G为GBK编码 U为Unicode编码 请确保阅读器支持相应编码"
    center
  >
    <div>文件大小：{{ novelDownloadData.file_size }}</div>
    <div>更新时间：{{ novelDownloadData.updatetime }}</div>
    <div class="mt-[10px] flex flex-wrap w-[auto]">
      <el-link
        :href="item.url"
        target="_blank"
        class="p-[5px]"
        type="primary"
        v-for="(item, index) in novelDownloadData.download_url"
        el-link
        >链接{{ index + 1 }}({{ item.name }})</el-link
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import '@wangeditor/editor/dist/css/style.css'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
// import { DomEditor } from '@wangeditor/editor'
import dayjs from 'dayjs'

import {
  getNovelDetail,
  getNovelChapters,
  getNovelDownload,
  novelCommentAdd,
  novelCommentList,
  wenku8Login
} from '@/api/resource/novel'
import { reactive } from 'vue'

const router = useRouter()

const comment = ref<string>('')
const centerDialogVisible = ref(false)
// 编辑器实例，必须用 shallowRef
const mode = ref('default')
const editorRef = shallowRef()
const toolbarConfig = {
  toolbarKeys: [
    'headerSelect',
    'blockquote',
    'bold',
    'underline',
    'italic',
    {
      key: 'group-more-style',
      title: '更多',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M204.8 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M505.6 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path><path d="M806.4 505.6m-76.8 0a76.8 76.8 0 1 0 153.6 0 76.8 76.8 0 1 0-153.6 0Z"></path></svg>',
      menuKeys: ['through', 'code', 'sup', 'sub', 'clearStyle']
    },
    'color',
    'bgColor',
    'fontSize',
    'fontFamily',
    'lineHeight',
    'bulletedList',
    'numberedList',
    'todo',
    {
      key: 'group-justify',
      title: '对齐',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M768 793.6v102.4H51.2v-102.4h716.8z m204.8-230.4v102.4H51.2v-102.4h921.6z m-204.8-230.4v102.4H51.2v-102.4h716.8zM972.8 102.4v102.4H51.2V102.4h921.6z"></path></svg>',
      menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify']
    },
    {
      key: 'group-indent',
      title: '缩进',
      iconSvg:
        '<svg viewBox="0 0 1024 1024"><path d="M0 64h1024v128H0z m384 192h640v128H384z m0 192h640v128H384z m0 192h640v128H384zM0 832h1024v128H0z m0-128V320l256 192z"></path></svg>',
      menuKeys: ['indent', 'delIndent']
    },
    'emotion',
    'insertLink',
    'insertTable',
    'codeBlock',
    'divider',
    'undo',
    'redo'
  ]
}
const editorConfig = {
  placeholder:
    '发言请理智，请勿恶意灌水、谩骂，严禁任何涉政治帖子，对于不符合条件的留言，本站有权进行删除和屏蔽相关IP，谢谢合作！',
  scroll: false
}

// 内容 HTML
const valueHtml = ref('')
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const novelDetailData = ref<any>({})
const novelChaptersData = ref<any>({})
const novelDownloadData = ref<any>({})

const getNovelDetailData = async () => {
  const id = router.currentRoute.value.params.id
  const res: any = await getNovelDetail({ id })
  document.title = res.data.name
  novelDetailData.value = res.data
}

const getNovelChaptersData = async () => {
  const id = router.currentRoute.value.params.id
  const res: any = await getNovelChapters({ id })
  novelChaptersData.value = res.data
}

const toNovelChapterDetail = (id: number) => {
  router.push(`/resource/novel/chapter/${id}`)
}

const commentData = ref<any>({
  novel_id: router.currentRoute.value.params.id,
  user_id: 22,
  user_name: '老八',
  user_avatar: 'https://avatars.githubusercontent.com/u/29754870?v=4',
  content: ''
})

const postNovelComment = async () => {
  console.log(commentData.value)
  await novelCommentAdd(commentData.value)
  commentData.value.content = ''
  console.log('评论成功')
  getNovelCommentListData()
}

const getNovelDownloadData = async (data: any) => {
  const res: any = await getNovelDownload(data)
  console.log(res.data)
  novelDownloadData.value = res.data
  if (!res.data.download_url.length) {
    await wenku8Login()
    await getNovelDownloadData({ id: router.currentRoute.value.params.id, type: 'txtfull' })
    // return
  }
}

const pagination = reactive({
  pageCount: 1,
  pageSize: 10
})

const commentCount = ref(0)

const novelCommentListData = ref<any>([])
const getNovelCommentListData = async () => {
  const res: any = await novelCommentList({
    novel_id: router.currentRoute.value.params.id,
    pageCount: pagination.pageCount,
    pageSize: pagination.pageSize
  })
  commentCount.value = res.total
  novelCommentListData.value = res
  novelCommentListData.value.data.sort(
    (a: any, b: any) =>
      Number(dayjs(b.created_time).format('x')) - Number(dayjs(a.created_time).format('x'))
  )
}

const handleCurrentChange = async (val: number) => {
  pagination.pageCount = val
  await getNovelCommentListData()
}

onMounted(async () => {
  await getNovelDetailData()
  await getNovelChaptersData()
  getNovelDownloadData({ id: router.currentRoute.value.params.id, type: 'txtfull' })
  getNovelCommentListData()
})
</script>

<style scoped></style>
