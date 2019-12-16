<template>
  <div
    class="header-global"
    :class="{ inWebview: type===1 }"
    v-if="isShow"
  >
    <i @click="goBack" class="leftIcon"></i>

    <span class="headTitle">{{headTitle || routerTitle}}</span>

    <div class="right" @click="onRight">
      <!-- 右侧slot插槽 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
import platform from '@@/utils/platform'

export default {
  name: 'TopHead',

  props: {
    // 宿主环境类型
    // type:1 运行在webview里，例如app、小程序
    // type:2 运行在browser里，例如微信内置浏览器
    type: {
      type: Number,
      default: 1
    },
    // 自定义标题文字
    headTitle: {
      type: String
    },
    // 自定义返回按钮事件(可选)
    onBack: {
      type: Function
    },
    // 右侧点击事件(可选)
    onRight: {
      type: Function,
      default: () => {}
    }
  },

  data () {
    return {
      routerTitle: '',
      isShow: !platform.isWxmp
    }
  },

  created () {
    this.getTitle()
  },

  methods: {
    goBack () {
      if (this.onBack) {
        this.onBack()
      } else {
        this.$router.go(-1)
      }
    },
    getTitle () {
      if (this.$route.meta) {
        this.routerTitle = this.$route.meta.title || '点一点'
      }
    }
  }
}
</script>

<style lang="less" scoped>
  // header自身高度
  @height: 44px;
  // 客户端顶部状态栏预留高度
  @statusBarHeight: 20px;
  // resources下的图片路径
  @imgUrl: '~@@/assets/images/';

  .header-global {
    position: fixed;
    top: 0;
    z-index: 9999;
    width: 100%;
    height: @height;
    line-height: @height;
    text-align: center;
    font-family: PingFangSC-Medium,PingFang SC;
    color: #2e2e2e;
    background-color: #fff;
    box-sizing: content-box;
    font-size: 16px;

    .leftIcon {
      width: 30px;
      height: @height;
      background: url('@{imgUrl}goBack.png') center no-repeat;
      background-size: 28%;
      position: absolute;
      top: 0;
      left: 0;
    }

    .headTitle {
      font-size: 16px;
      letter-spacing: 1px;
    }

    // slot插槽父盒子
    .right {
      position: absolute;
      height: @height;
      right: 20px;
      top: 0;
    }

    &.inWebview {
      padding-top: @statusBarHeight;
      .leftIcon {
        top: @statusBarHeight;
      }
      .right {
        top: @statusBarHeight;
      }
    }
  }
</style>
