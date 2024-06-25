import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
  ],
  server:{
    hmr:true, // 热更新
    port:3001,
    proxy:{
     '/api':{
       target:"http://localhost:81",
       secure:false,
       changeOrigin:true, // 开启代理
       pathRewrite:{
         '^/api':'/api',
       }
     }
    }
  }
  ,
  resolve: {
    // 配置路由别名
    // 直接用@替代了
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
