<template>
  <div>
    <!-- 表头区域 -->
    <van-nav-bar class="navbar" title="标题" @click-left="onClickLeft">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- form表单 -->
    <van-form ref="from" class="from" @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <!-- 发送验证码 -->
        <template #right-icon>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="3 * 1000"
            @finish="isShowCountDown = false"
            format="ss"
          />
          <!-- 发送 -->
          <van-button
            v-else
            class="code-btn"
            round
            size="mini"
            @click="sendCode"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit" color="#6db4fb"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, sendCodeApi } from '@/api/user'
import { mobileRules, codeRules } from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules,
      codeRules,
      isShowCountDown: false
    }
  },

  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })

      try {
        const { data } = await loginApi(this.mobile, this.code)
        // 存储到store
        this.$store.commit('setUser', data.data)
        // 跳转到主页
        this.$router.push('/profile')
        // 提示成功
        this.$toast.success('登陆成功')
      } catch (error) {
        // 拿到状态码
        const { status } = error.response
        let msg = '登陆错误，请稍后重试'
        if (status === 400) msg = error.response.data.message
        // 提示失败信息
        this.$toast.fail(msg)
      }
    },
    async sendCode(e) {
      // 阻止默认行为
      e.preventDefault()
      try {
        // 校验手机号
        await this.$refs.from.validate('mobile')
        // 请求验证码
        const res = await sendCodeApi(this.mobile)
        console.log(res)
        // 开始倒计时
        this.isShowCountDown = true
      } catch (error) {
        // 表单验证失败
        if (!error.response) return this.$toast.fail(error.message)
        // 服务端返回错误
        this.$toast.fail(error.response.data.message)
      }
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
