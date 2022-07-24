<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api'
export default {
  data() {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    onCancel() {
      this.$parent.$parent.SexShow = false
    },
    async onConfirm(value) {
      //  性别，0-男，1-女
      const sex = value === '男' ? 0 : 1
      try {
        await editUserInfo('', sex)
        this.$parent.$parent.SexShow = false
        this.$parent.$parent.getuserInfo()
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败！')
      }
    }
  }
}
</script>

<style></style>
