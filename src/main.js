import "@/styles/main.css"

import {createApp, onMounted} from 'vue'
import {createPinia} from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"
// UI组件
import ElementPlus from 'element-plus'
import store from './stores/user.js'; // 引入Vuex store
import vuetyped from 'vue3typed' // 导入自动打字机
import countTo from 'vue3-count-to'; // 导入数组滚动组件

// 导入element-plus
import "element-plus/dist/index.css"
// markdown样式
import "github-markdown-css";
// 代码高亮
import "highlight.js/styles/github.css"; //默认样式

import imageLazy from "vue-image-lazy-xg" // 图片懒加载
import "vue-image-lazy-xg/lib/style.css"

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(vuetyped).use(store).use(router)
app.use(countTo);
app.use(imageLazy); //全局注册
//配置可有可有无
//app.use(imageLazyLoading,{
//    loadingGif:"加载的图片",
//    errorImg:"错误的图片",
//})

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

app.mount('#app')
