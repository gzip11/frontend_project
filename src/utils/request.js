import axios from 'axios'
import { ElLoading } from 'element-plus'

let loadingInstance='';

const baseURL = "http://localhost:8088";

const request = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true,
    crossDomain: true
});

request.interceptors.request.use(config => {

    loadingInstance = ElLoading.service({
        fullscreen: true,
    })

    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    if(localStorage.getItem('token')){
        config.headers.token = localStorage.getItem('token');
    }
    return config
},error => {
    return Promise.reject(error);
});

request.interceptors.response.use(
    response => {

        // 关闭加载效果
        loadingInstance.close()

        if (response.status === 200) {
            return response.data
        }
        return -1;
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)
export default request


