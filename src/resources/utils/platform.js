/**
 * 判断运行平台
 */
const ua = window.navigator.userAgent.toLowerCase()

function getIsAndroid () {
  return /Android|Adr/i.test(ua)
}

function getIsIos () {
  return /iPhone|iPod|iPad/i.test(ua)
}

function getIsWechat () {
  return /MicroMessenger/i.test(ua)
}

function getIsWxmp () {
  return /miniProgram/i.test(ua) || window.__wxjs_environment === 'miniprogram'
}

function getIsInnerAndroid () {
  return getIsAndroid() && /dianyidian/i.test(ua)
}

function getIsInnerIos () {
  return getIsIos() && /dianyidian/i.test(ua)
}

function getIsIphoneX () {
  return /iPhone/i.test(ua) && (screen.height === 812 && screen.width === 375)
}

export default {
  // android平台
  isAndroid: getIsAndroid(),
  // ios平台
  isIos: getIsIos(),
  // 微信生态
  isWechat: getIsWechat(),
  // 微信小程序
  isWxmp: getIsWxmp(),
  // // android客户端
  isInnerAndroid: getIsInnerAndroid(),
  // // ios客户端
  isInnerIos: getIsInnerIos(),
  // iphoneX
  isIphoneX: getIsIphoneX()
}
