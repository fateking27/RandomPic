// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { loadEnv } from "file:///G:/webServe/randomPic/node_modules/vite/dist/node/index.js";
import vue from "file:///G:/webServe/randomPic/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import AutoImport from "file:///G:/webServe/randomPic/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///G:/webServe/randomPic/node_modules/unplugin-vue-components/dist/vite.js";
import { ElementPlusResolver } from "file:///G:/webServe/randomPic/node_modules/unplugin-vue-components/dist/resolvers.js";
import ElementPlus from "file:///G:/webServe/randomPic/node_modules/unplugin-element-plus/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///G:/webServe/randomPic/vite.config.ts";
var root = process.cwd();
var vite_config_default = ({ command, mode }) => {
  const { VITE_PORT } = loadEnv(mode, root);
  return {
    base: "./",
    root,
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })]
      }),
      Components({
        resolvers: [ElementPlusResolver({ importStyle: "sass" })]
      }),
      ElementPlus({
        useSource: true
      })
    ],
    // 服务端渲染
    server: {
      // 端口号
      port: Number(VITE_PORT),
      //@ts-ignore
      host: ["0.0.0.0"],
      proxy: {}
    }
  };
};
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJHOlxcXFx3ZWJTZXJ2ZVxcXFxyYW5kb21QaWNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkc6XFxcXHdlYlNlcnZlXFxcXHJhbmRvbVBpY1xcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRzovd2ViU2VydmUvcmFuZG9tUGljL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IFVzZXJDb25maWdFeHBvcnQsIENvbmZpZ0VudiwgbG9hZEVudiB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCBFbGVtZW50UGx1cyBmcm9tICd1bnBsdWdpbi1lbGVtZW50LXBsdXMvdml0ZSdcblxuY29uc3Qgcm9vdDogc3RyaW5nID0gcHJvY2Vzcy5jd2QoKVxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgKHsgY29tbWFuZCwgbW9kZSB9OiBDb25maWdFbnYpOiBVc2VyQ29uZmlnRXhwb3J0ID0+IHtcbiAgY29uc3QgeyBWSVRFX1BPUlQgfSA9IGxvYWRFbnYobW9kZSwgcm9vdClcbiAgcmV0dXJuIHtcbiAgICBiYXNlOiAnLi8nLFxuICAgIHJvb3QsXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoJy4vc3JjJywgaW1wb3J0Lm1ldGEudXJsKSlcbiAgICAgIH1cbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgYWRkaXRpb25hbERhdGE6IGBAdXNlIFwiQC9zdHlsZXMvZWxlbWVudC9pbmRleC5zY3NzXCIgYXMgKjtgXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIHZ1ZSgpLFxuICAgICAgQXV0b0ltcG9ydCh7XG4gICAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogJ3Nhc3MnIH0pXVxuICAgICAgfSksXG4gICAgICBDb21wb25lbnRzKHtcbiAgICAgICAgcmVzb2x2ZXJzOiBbRWxlbWVudFBsdXNSZXNvbHZlcih7IGltcG9ydFN0eWxlOiAnc2FzcycgfSldXG4gICAgICB9KSxcbiAgICAgIEVsZW1lbnRQbHVzKHtcbiAgICAgICAgdXNlU291cmNlOiB0cnVlXG4gICAgICB9KVxuICAgIF0sXG4gICAgLy8gXHU2NzBEXHU1MkExXHU3QUVGXHU2RTMyXHU2N0QzXG4gICAgc2VydmVyOiB7XG4gICAgICAvLyBcdTdBRUZcdTUzRTNcdTUzRjdcbiAgICAgIHBvcnQ6IE51bWJlcihWSVRFX1BPUlQpLFxuICAgICAgLy9AdHMtaWdub3JlXG4gICAgICBob3N0OiBbJzAuMC4wLjAnXSxcbiAgICAgIHByb3h5OiB7fVxuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUF1UCxTQUFTLGVBQWUsV0FBVztBQUUxUixTQUFzQyxlQUFlO0FBQ3JELE9BQU8sU0FBUztBQUNoQixPQUFPLGdCQUFnQjtBQUN2QixPQUFPLGdCQUFnQjtBQUN2QixTQUFTLDJCQUEyQjtBQUNwQyxPQUFPLGlCQUFpQjtBQVArSCxJQUFNLDJDQUEyQztBQVN4TSxJQUFNLE9BQWUsUUFBUSxJQUFJO0FBR2pDLElBQU8sc0JBQVEsQ0FBQyxFQUFFLFNBQVMsS0FBSyxNQUFtQztBQUNqRSxRQUFNLEVBQUUsVUFBVSxJQUFJLFFBQVEsTUFBTSxJQUFJO0FBQ3hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLE1BQ3REO0FBQUEsSUFDRjtBQUFBLElBQ0EsS0FBSztBQUFBLE1BQ0gscUJBQXFCO0FBQUEsUUFDbkIsTUFBTTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSTtBQUFBLE1BQ0osV0FBVztBQUFBLFFBQ1QsV0FBVyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsT0FBTyxDQUFDLENBQUM7QUFBQSxNQUMxRCxDQUFDO0FBQUEsTUFDRCxXQUFXO0FBQUEsUUFDVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxPQUFPLENBQUMsQ0FBQztBQUFBLE1BQzFELENBQUM7QUFBQSxNQUNELFlBQVk7QUFBQSxRQUNWLFdBQVc7QUFBQSxNQUNiLENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQSxJQUVBLFFBQVE7QUFBQTtBQUFBLE1BRU4sTUFBTSxPQUFPLFNBQVM7QUFBQTtBQUFBLE1BRXRCLE1BQU0sQ0FBQyxTQUFTO0FBQUEsTUFDaEIsT0FBTyxDQUFDO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRjsiLAogICJuYW1lcyI6IFtdCn0K
