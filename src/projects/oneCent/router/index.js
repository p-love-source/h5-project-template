import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Index = () => import(/* webpackChunkName: "index" */ '@/views/index/index')
const ShareList = () => import(/* webpackChunkName: "shareList" */ '@/views/shareList/shareList')

const routes = [
  {
    path: '/',
    redirect: '/index'
  },
  {
    path: '/index',
    name: 'Index',
    component: Index,
    meta: {
      title: '一分抢购百元豪礼'
    }
  },
  {
    path: '/shareList',
    name: 'ShareList',
    component: ShareList,
    meta: {
      title: '我的分享',
      needLogin: 1
    }
  }
  // 在这里添加其他路由
  // ......
]

const Page404 = () => import(/* webpackChunkName: "404" */ '@/views/errorPage/404.vue')
const errorPage = [
  {
    path: '*',
    name: 'page404',
    component: Page404
  }
]

const routerConfig = {
  routes: routes.concat(errorPage)
}

if (+process.env.VUE_APP_HISTORY_OPEN) {
  const projectName = process.env.VUE_APP_PROJECT_NAME
  // routerConfig.mode = 'history'
  routerConfig.base = `${process.env.VUE_APP_HISTORY_BASE}/${projectName}`
}

const router = new VueRouter(routerConfig)

export default router
