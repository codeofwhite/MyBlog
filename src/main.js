import { createApp } from 'vue'
import App from './App.vue'
import router from "./router";
import axios from "axios"
// UI组件
import ElementPlus from 'element-plus'
// 导入element-plus
import "element-plus/dist/index.css"

const app = createApp(App)

app.use(router);
app.use(ElementPlus)

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

app.mount('#app');
