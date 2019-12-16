/**
 * 全局路由导航守卫公共方法
 */
import store from '@/store'

// 修改页面title
function setDocumentTitle (to, from) {
  document.title = process.env.VUE_APP_PROJECT_NAME + ' - 点一点'
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' - ' + document.title
  }
}

// 存储登录状态
function setLoginStatus (to, from) {
  let accessToken = ''
  const nameTag = 'accessToken='
  if (to.query && to.query.access_token !== undefined) {
    accessToken = to.query.access_token
    store.commit('setAccessToken', accessToken)
    window.name = nameTag + accessToken
  } else if (window.name.indexOf(nameTag) > -1) {
    accessToken = window.name.split(nameTag)[1]
    store.commit('setAccessToken', accessToken)
  }
}

// 路由未登录访问权限判断
function judgeNeedLogin (to, from) {
  if (to.meta && to.meta.needLogin) {
    if (store.getters && !store.getters.accessToken) {
      // 跳转登录页
      console.log('needLogin')
    }
  }
}

export default {
  setDocumentTitle,
  setLoginStatus,
  judgeNeedLogin
}
