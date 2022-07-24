<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="cancel"
      @confirm="confirm"
    />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { editUserInfo } from '@/api'
export default {
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(2000, 7, 25)
    }
  },
  methods: {
    cancel() {
      this.$parent.$parent.birthDayShow = false
    },
    async confirm(value) {
      const birthday = dayjs(value).format('YYYY-MM-DD')

      try {
        await editUserInfo('', '', birthday)
        this.$parent.$parent.getuserInfo()
        this.$parent.$parent.birthDayShow = false
        this.$toast.success('修改成功')
      } catch (error) {
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style></style>
