import axios from 'axios'
import qs from 'qs'

// 创建 axios 对象
const service = axios.create({
    baseURI: 'http://localhost:9001/api/test',
    timeout: 15000
})

import {ElMessage} from "element-plus";
import {config} from "@vue/test-utils";

service.interceptors.request.use(config => {
    if (config.method === "post" && config.url !== '/imgs/upload') {
        config.data = qs.stringify(config.data, {indices: false});
    }
    return config;
}, error => {
    return Promise.reject(error)
})

service.interceptors.response.use(
    success => {
        if (success.data.code === 0) {
            return success.data;
        } else if (success.data.code === 1) {
            return success.data;
        } else {
            ElMessage.error(success.data.msg);
            return Promise.reject(success.data)
        }
    },
    error => {
        ElMessage.error('系统异常')
        return Promise.reject(error)
    }
)

export default service

