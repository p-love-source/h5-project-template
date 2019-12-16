import request from '@@/utils/request'

/**
 * 请求拦截 config配置项
 * @params {string} name 接口名
 * @params {object} data 传参数据
 * @params {boolean} isSelf 控制是否自行处理接口响应异常
 */
function http ({ name, data, isSelf }) {
  let baseURL = ''
  let headers = {}
  let url = ''
  let method = 'post'
  isSelf = isSelf || false
  data = {
    api_name: name,
    ...data
  }

  // 返回promise
  return new Promise((resolve, reject) => {
    request({
      baseURL,
      headers,
      url,
      method,
      isSelf,
      data
    })
      .then(res => {
        resolve(res)
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default http
