import axios from 'axios'
import { Notify } from 'vant'
import { getToken, TokenKey } from '@/utils/auth'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://tts.shanyexia.top'
    : 'http://192.168.1.8:8080',
  // 超时
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  if (getToken()) {
    config.headers[TokenKey] = getToken()
  }
  return config
})

// 响应拦截器
service.interceptors.response.use(res => {
  const data = res.data
  if (data.code === 500) {
    Notify(data.msg)
    // return Promise.reject(data.msg)
  } else if (data.code === 401) {
    router.push('/login?redirect=')
  }
  return data
})

export default service
