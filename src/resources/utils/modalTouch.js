/**
  * 解决移动端滑动穿透问题
  *
  * 提前给body设置以下css样式 (建议加在App.vue里)
  * body {
  *   &.modal-open {
  *     position: fixed;
  *     width: 100%;
  *   }
  * }
  */

// document.scrollingElement API兼容处理
;(function () {
  if (document.scrollingElement) {
    return
  }
  var element = null
  function scrollingElement () {
    if (element) {
      return element
    } else if (document.body.scrollTop) {
      // speed up if scrollTop > 0
      return (element = document.body)
    }
    var iframe = document.createElement('iframe')
    iframe.style.height = '1px'
    document.documentElement.appendChild(iframe)
    var doc = iframe.contentWindow.document
    doc.write('<!DOCTYPE html><div style="height:9999em">x</div>')
    doc.close()
    var isCompliant = doc.documentElement.scrollHeight > doc.body.scrollHeight
    iframe.parentNode.removeChild(iframe)
    return (element = isCompliant ? document.documentElement : document.body)
  }
  Object.defineProperty(document, 'scrollingElement', {
    get: scrollingElement
  })
})()

// 导出项
let modalTouch = ((bodyClsName) => {
  let scrollTop
  return {
    // 打开模态框后调用 open()
    open () {
      scrollTop = document.scrollingElement.scrollTop
      document.body.classList.add(bodyClsName)
      document.body.style.top = -scrollTop + 'px'
    },
    // 关闭模态框后调用 close()
    close () {
      document.body.classList.remove(bodyClsName)
      document.scrollingElement.scrollTop = scrollTop
    }
  }
})('modal-open')

export default modalTouch
