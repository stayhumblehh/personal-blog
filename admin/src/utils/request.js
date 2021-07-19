import axios  from 'axios'
import { ElMessage } from 'element-plus'
import router from './../router'

const request = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

request.interceptors.request.use( config => {
    //本地有token缓存就带上
    if(localStorage.personalBlogToken) {
        config.headers.Authorization =  `Bearer ${localStorage.personalBlogToken}`
    }
    return config
})

request.interceptors.response.use( res => {
    return res
}, err => {
    //状态码422为账号密码错误
    if(err.response.status === 422) {
        ElMessage.error({
            message: err.response.data.message,
            type: 'error'
        })
    }
    //状态码401时表示token验证失败
    if(err.response.status === 401) {
        ElMessage.error({
            message: err.response.data.message,
            type: 'error'
        })
        router.push('/login')
    }
    return Promise.reject(err)
})

export default request