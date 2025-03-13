import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// 一定要在main.ts中导入tailwind.css，防止vite每次hmr都会请求src/style/index.scss整体css文件导致热更新慢的问题
import './styles/tailwind/index.css'
// import './styles/element/index.scss'
import ElementPlus from 'element-plus'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
// 注册element-plus的图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
