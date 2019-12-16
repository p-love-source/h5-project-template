/**
 * 一分购规则弹窗
 */
<template>
  <div class=''>
    <van-popup v-model="show">
      <div class="ruleInfo">
        <h4>活动规则</h4>
        <div class="content">
          <p>1.活动限点点庄园10级及以上用户参加。</p>
          <p>2.每期活动券用户需进入游戏界面自主领取，同时上一期活动券失效，每开启一次商品需消耗一张券，一旦下单则券不返还。</p>
          <p>3.支付并开启分享后，发起人需在指定时间内完成要求的分享人数，超时则分享失败。</p>
          <p>4.如分享失败，支付金额会按原支付路径退回。</p>
          <p>5.仅限分享平台新用户，且被分享人需下载并登陆app才算分享成功，达到指定人数后分享完成，会自动生成订单并发货。</p>
          <p>6.活动商品均不支持售后，数量有限，先到先得。</p>
          <p>7.在活动过程中，如果出现不正当及违规行为，一经发现，点一点有权取消您的活动资格，情节严重者，我们将依法保留诉讼权利。</p>
          <p>8.本活动与苹果公司无关。</p>
        </div>
        <div class="close" @click="onClose">
          <span>关闭</span>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  props: {
    // v-model传递
    value: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
    }
  },

  computed: {
    show: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },

  created () {},

  methods: {
    onClose () {
      this.show = false
    }
  },

  components: {}
}
</script>

<style lang='less' scoped>
.van-popup {
  border-radius: 12px;
}
.ruleInfo {
  background-color: #fff;
  width: 296px;

  h4 {
    padding: 12px 0;
    text-align: center;
    font-size: 14px;
    color: #333;
  }
  .content {
    padding: 0 19px 20px;
    font-size: 12px;
    line-height: 1.8;
    color: #333;
    font-family:PingFangSC-Regular,PingFang SC;
  }
  .close {
    border-top: 1px solid #D7D7DC;
    height: 44px;
    line-height: 44px;
    color: #007AFF;
    font-size: 16px;
    text-align: center;
  }
}
</style>
