import LoadingComp from './index.vue'

let $vm

export default {
  install (Vue, options) {
    if (!$vm) {
      const LoadingPlugin = Vue.extend(LoadingComp)
      $vm = new LoadingPlugin({
        el: document.createElement('div')
      })
      document.body.appendChild($vm.$el)
    }
    const loading = {
      // 显示loading，text:文字提示（可选）
      show (text) {
        $vm.isShow = true
        $vm.text = text
      },
      // 关闭loading
      hide () {
        $vm.isShow = false
        $vm.text = ''
      }
    }
    // 给vue实例注册$loading
    Vue.prototype.$loading = loading
    return Vue
  }
}
