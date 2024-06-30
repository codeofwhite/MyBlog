import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path"
import Markdown from 'vite-plugin-md'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // 加这一步导入md文件
    vue(),
    vueJsx(),
    Markdown(),
  ],
  server:{
    hmr:true, // 热更新Hot Module Replacement，效率更高
    port:80,
    // 代理配置，用于指定如何代理到后端的服务器，这里任何的/api请求都会被代理到http://localhost:81
    // proxy:{
    //  '/api':{
    //    target:"http://localhost:8001",
    //    secure:false, // https
    //    changeOrigin:true, // 开启代理
    //    pathRewrite:{
    //      '^/api':'/api',
    //    }
    //  }
    // }
  }
  ,
  resolve: {
    // 配置路由别名
    // 直接用@替代了
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
