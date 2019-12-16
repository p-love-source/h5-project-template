/**
 * 公共404页面
 */
<template>
  <div class='pageNotFound'>
    404 page not found
    <div class="back">
      <button @click="goIndex">Go to index</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {},

  data () {
    return {}
  },

  computed: {},

  created () {},

  methods: {
    goIndex () {
      this.$router.push('/')
    }
  },

  components: {}
}
</script>

<style lang='less' scoped>
.pageNotFound {
  text-align: center;
  padding-top: 20px;
}
.back {
  padding: 20px;

  button {
    background-color: #fff;
    padding: 5px 10px;
  }
}
</style>
