/*
 * @Author: PanZongHui
 * @Description: axios二次封装网络请求接口
 */
import Qs from 'qs'
import axios, { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

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
        // vite中使用 import.meta.env.BASE_URL 项目资源路径 /admin/
        // const resourceName = import.meta.env.BASE_URL
        // window.location.href = `${resourceName}/login`
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
interface HttpResponse<T> {
  code?: number
  data: T
  message?: string
}

interface HttpMethod {
  get<T>(url: string, params?: unknown): Promise<HttpResponse<T>>
  post<T>(url: string, data?: unknown): Promise<HttpResponse<T>>
  put<T>(url: string, data?: unknown): Promise<HttpResponse<T>>
  delete<T>(url: string, params?: unknown): Promise<HttpResponse<T>>
  upload<T>(url: string, files: FormData): Promise<HttpResponse<T>>
  download(url: string, params?: unknown): void
}

/**
 * @description: 网络请求接口类
 */
const HttpRequest: HttpMethod = {
  post(url, data = {}) {
    return new Promise((resolve, reject) => {
      service
        .post(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  put(url, data = {}) {
    return new Promise((resolve, reject) => {
      service
        .put(url, data)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      service
        .get(url, {
          params,
          paramsSerializer: params => Qs.stringify(params, { indices: false }),
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  delete(url, params = {}) {
    return new Promise((resolve, reject) => {
      service
        .delete(url, {
          params,
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  upload(url, files: FormData) {
    return new Promise((resolve, reject) => {
      service
        .post(url, files, {
          headers: { 'Content-Type': ContentType.multipart },
        })
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  download(url, params = {}) {
    axios
      .get(`${baseURL}${url}`, {
        params,
        responseType: 'blob',
        paramsSerializer: params => Qs.stringify(params, { indices: false }),
        headers: {
          Authorization: 'xxx',
        },
      })
      .then(res => {
        // 创建一个类文件对象：Blob对象表示一个不可变的、原始数据的类文件对象
        const blob = new Blob([res.data], {
          type: 'application/octet-stream',
        })
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        // 设置指示浏览器下载url,
        const fileName = decodeURI(res.headers['content-disposition'].split(';')[1].split('=')[1])
        tempLink.setAttribute('download', fileName)
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
          tempLink.setAttribute('target', '_blank')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        // 移除a标签
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
      })
      .catch(err => {
        console.log(`文件下载失败${err}`)
      })
  },
}

export default HttpRequest
