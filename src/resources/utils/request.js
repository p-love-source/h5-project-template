import axios from 'axios'
import tools from '@@/utils/tools'
import { Toast } from 'vant'
import Md5 from 'js-md5'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create()

// 定义额外配置
let configMore

/**
 * 数据请求 配置项
 * @params {object} data 传参数据
 * @params {boolean} isSelf 控制是否自行处理接口响应异常
 * ......
 */
function request (config) {
  // 获取额外配置参数
  const { isSelf } = config
  configMore = {
    isSelf
  }
  // 配置公共参数
  const accessToken = (store.getters && store.getters.accessToken) || ''
  const time = +new Date() / 1000
  config.data = {
    os: 'wx',
    channel_id: '0',
    appid: '1',
    app_version: '1.0',
    time: time,
    token: 'eb86fa064482989312e2a1557ddb4032',
    access_token: accessToken,
    sign: Md5(accessToken + time + 'ijJeFyo0U2fOBEd0olKBUx8zWcgIo68d'),
    ...config.data
  }
  return service(config)
}

// 请求拦截
service.interceptors.request.use(
  config => {
    // 超时时间
    config.timeout = config.timeout || 30000
    // baseURL
    config.baseURL = config.baseURL || '/api/api'
    if (!config.baseURL.match(/^http/)) {
      if (process.env.NODE_ENV === 'development') {
        config.baseURL = process.env.VUE_APP_PROXY_CODE + config.baseURL
      } else if (process.env.NODE_ENV === 'production') {
        config.baseURL = process.env.VUE_APP_SERVER_URL + config.baseURL
      }
    }
    // 数据传参使用表单形式
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=utf-8'
    config.transformRequest = [data => data && tools.objToUrlParams(data)]
    // 请求方法
    config.method = config.method || 'post'
    // 请求参数
    if (config.method === 'post') {
      config.data = config.data || {}
    } else if (config.method === 'get') {
      config.params = config.data || config.params
    }

    return config
  },
  err => {
    Promise.reject(err)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data
    // isSelf为true，直接返回数据
    if (configMore.isSelf) {
      return res
    }
    // code为0，正常返回数据
    if (res.code === 0) {
      return res
    }
    // 其他情况，不符合预期，抛出错误信息
    Toast({
      message: 'Error：' + res.error_msg,
      duration: 5 * 1000
    })
    return Promise.reject(res.error_msg)
  },
  err => {
    Toast({
      message: 'Err：' + err.message,
      duration: 5 * 1000
    })
    return Promise.reject(err)
  }
)

export default request
