/*
 * @Author: PanZongHui
 * @Description: axios二次封装网络请求接口
 */
import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import axios from 'axios'
import Qs from 'qs'

const baseURL = '/api'

function getToken() {
  return '123'
}
// 创建axios实例
const service = axios.create({
  baseURL,
  timeout: 30000,
  withCredentials: true,
})

const ContentType = {
  json: 'application/json;charset=utf-8', // json格式
  form: 'application/x-www-form-urlencoded;charset=UTF-8', // 表单
  multipart: 'multipart/form-data', // 文件上传
}

// service.defaults.headers.post['Content-Type'] = ContentType.form
service.defaults.headers.post['Content-Type'] = ContentType.json
service.defaults.headers.put['Content-Type'] = ContentType.json

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * @description: 添加请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const addPending = (config: AxiosRequestConfig): void => {
  const url = [config.baseURL, config.method, config.url].join('')
  config.cancelToken = new axios.CancelToken(cancel => {
    if (!pending.has(url)) {
      // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * @description: 移除请求
 *   移除未响应完的相同请求，避免重复请求
 * @param {AxiosRequestConfig} config
 * @return {*}
 */
const removePending = (config: AxiosRequestConfig): void => {
  const url = [config.baseURL, config.method, config.url].join('')
  if (pending.has(url)) {
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    removePending(config) // 在请求开始前，移除未响应完的相同请求，避免重复请求
    addPending(config) // 将当前请求添加到 pending 中
    // console.log('请求拦截器getToken:', getToken())
    if (getToken()) {
      config.headers.Authorization = getToken()
    }
    return config
  },
  error => {
    console.log('请求异常', error)
    // 错误抛到业务代码
    error.data = {}
    error.data.code = -1
    error.data.message = '发送请求出现异常！'
    return Promise.reject(error)
  },
)

/**
 * 响应拦截
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    removePending(response) // 在请求结束后，移除本次请求
    if (response.status === 200) {
      // 请求结果正常
      const { code } = response.data
      if (code === 200) {
        // 请求成功
        return Promise.resolve(response.data)
      } else {
        // 请求异常处理

        // 处理系统自定义异常
        return Promise.reject(response.data)
      }
    } else {
      console.log('响应请求异常', response)
      return Promise.reject(response)
    }
  },
  error => {
    if (axios.isCancel(error)) {
      // 重复请求的错误
      // 中断promise
      return new Promise(() => {})
    }
    console.log('响应请求出现异常！', error)
    // 错误抛到业务代码
    error.data = {}
    error.data.code = -2
    error.data.message = '响应请求出现异常！'
    return Promise.reject(error.data)
  },
)

/**
 * @description: Http网络请求返回的数据类型接口
 */
interface IResult<T> {
  code?: number
  data: T
  message?: string
}

type Method = 'get' | 'post' | 'put' | 'delete'
/**
 * axios二次封装
 * @param url 请求路径
 * @param method 请求方法
 * @param data 传递参数
 * @param config 配置文件
 * @returns  [Promise<HttpResponse<T>>]
 */
const request = <T = any>(url: string, method: Method, data?: unknown, config?: AxiosRequestConfig) => {
  let newConfig = { ...config }
  if (method === 'get' || method === 'delete') {
    newConfig = { ...config, paramsSerializer: data => Qs.stringify(data, { indices: false }) }
  }

  return service<T, IResult<T>>({
    url,
    method,
    // get,delete请求用params接收，其他请求用data
    [method.toLowerCase() === 'get' || method.toLowerCase() === 'delete' ? 'params' : 'data']: data,
    ...newConfig,
  })
}

export default request
