import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import markdown from 'vite-plugin-md';
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
// 配置读取markdown文件
export default defineConfig({
    plugins: [
        vue({
            include: [/\.vue$/, /\.md$/], // <--
        }),
        vueJsx(),
        Pages({
            pagesDir: 'pages',
            extensions: ['vue', 'md'],
        }),
        markdown(),
    ],
    server: {
        hmr: true, // 热更新Hot Module Replacement，效率更高
        port: 80,
        // 代理配置，用于指定如何代理到后端的服务器，这里任何的/api请求都会被代理到http://localhost:81
        proxy: {
            '/api': {
                target: "http://localhost:8001",
                secure: false, // https
                changeOrigin: true, // 开启代理
                pathRewrite: {
                    '^/api': '/api',
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
        },
    },
})