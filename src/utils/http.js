import axios from 'axios'
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/userStore.js";
import router from "@/router/index.js";


// 创建axios实例
const http = axios.create({
    baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
    timeout: 10000
})

// axios请求拦截器
// 一般会进行token身份验证等
http.interceptors.request.use(config => {
    const userStore = useUserStore();
    const token = userStore.userInfo.token;
    /*固定写法*/
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    // 打印请求的URL
    console.log('Request URL:', config.url);
    return config
}, e => Promise.reject(e))

// axios响应式拦截器
// 一般进行错误的统一提示，token失效的处理等
http.interceptors.response.use(res => {
    // 打印完整的响应对象
    console.log('Response:', res);

    // 打印响应数据
    console.log('Response Data:', res.data);

    return res.data;
}
, e => {
    //统一错误提示
    ElMessage({
        type: 'error',
        message: e.response.data.message
    })
    // 401token失效处理（学会看报错信息）
    const userStore = useUserStore();
    if(e.response.status === 401){
        userStore.clearUserInfo()
        router.push('/login')
    }

    return Promise.reject(e)
}
)


export default http