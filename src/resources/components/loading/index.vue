/**
 * 全屏loading效果
 */
<template>
  <transition name="loading-transition">
    <div class='loading-global' v-show="isShow">
      <div class="loading-content">
        <!-- 文字 -->
        <div class="loading-text">{{text}}</div>
        <!-- 图形 -->
        <div class="loading-icon">
          <svg viewBox="25 25 50 50" class="van-loading__circular">
            <circle cx="50" cy="50" r="20" fill="none"></circle>
          </svg>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  },

  data () {
    return {}
  },

  computed: {},

  created () {},

  methods: {},

  components: {}
}
</script>

<style lang='less' scoped>
.loading-global {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: opacity .3s linear;
  background-color: #fff;

  .loading-icon {
    width: 30px;
    height: 30px;
    color: rgb(25, 137, 250);

    circle {
      animation: svg-circular 1.5s ease-in-out infinite;
      stroke: currentColor;
      stroke-width: 3;
      stroke-linecap: round;
    }
  }
  .loading-text {
    text-align: center;
    padding-bottom: 15px;
    font-size: 14px;
    color: #333;
  }
}

.loading-transition-enter {
  opacity: 1;
}
.loading-transition-leave-active {
  opacity: 0;
}

@keyframes svg-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}
</style>
