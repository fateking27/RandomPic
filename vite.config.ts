import { fileURLToPath, URL } from 'node:url'

import { UserConfigExport, ConfigEnv, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const root: string = process.cwd()

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  const { VITE_PORT } = loadEnv(mode, root)
  return {
    base:'./',
    root,
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 服务端渲染
    server: {
      // 端口号
      port: Number(VITE_PORT),
      host: '0.0.0.0',
      proxy: {}
    }
  }
}
