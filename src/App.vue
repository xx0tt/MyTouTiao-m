<template>
  <div>
    <!-- 一级路由登录出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  data() {
    return {}
  },
  created() {
    console.dir(request)
  }
}
</script>

<style>
.box {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
}
</style>
