import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 全局样式
import 'normalize.css/normalize.css'
import '@@/styles/index.less'
// rem适配
import '@@/utils/flexible.js'
// vant按需引入
import '@/utils/importVant.js'
// 路由导航守卫
import '@/utils/routerGuards.js'
// vconsole调试工具
import '@@/utils/vconsole.js'
// 全屏loading
import loading from '@@/components/loading'

Vue.use(loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
