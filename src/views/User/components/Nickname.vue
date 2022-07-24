<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-left="$parent.$parent.nickNameShow = false"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api'
export default {
  data() {
    return {
      message: this.userInfo.name
    }
  },
  props: ['userInfo'],
  methods: {
    async onClickRight() {
      if (this.message.trim().length === 0) {
        return this.$toast.fail('请输入昵称！')
      }
      try {
        await editUserInfo(this.message)
        this.$parent.$parent.getuserInfo()
        this.$parent.$parent.nickNameShow = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style></style>
