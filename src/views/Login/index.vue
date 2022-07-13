<template>
  <div>
    <!-- 表头区域 -->
    <van-nav-bar class="navbar" title="标题" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- form表单 -->
    <van-form class="from" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写用户名' }]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请填写密码' }]"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #right-icon>
          <van-button class="code-btn" round size="mini">发送验证码</van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#6db4fb"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: ''
    }
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      const res = await loginApi(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style lang="less" scoped>
// 自定义导航栏样式
// :deep() 穿透scoped样式
.navbar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

// 表单域样式
.from {
  :deep(.van-field__label) {
    flex: 1;
  }
  :deep(.van-field__value) {
    flex: 20;
  }
  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    padding: 0 15px;
    background-color: #eee;
    color: #666;
  }
}
</style>
