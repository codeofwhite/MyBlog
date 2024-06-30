import "./assets/styles/main.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import axios from "axios"

// UI组件
import ElementPlus from 'element-plus'
// 导入element-plus
import "element-plus/dist/index.css"

import store from './store'; // 引入Vuex store
// 导入自动打字机
import vuetyped from 'vue3typed'
// 导入数组滚动组件
import countTo from 'vue3-count-to';
// markdown样式
import "github-markdown-css";
// 代码高亮
import "highlight.js/styles/github.css"; //默认样式

const app = createApp(App)

app.use(createPinia())
app.use(ElementPlus)
app.use(vuetyped).use(store).use(router)
app.use(countTo);

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

app.mount('#app')
