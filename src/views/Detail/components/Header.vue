<template>
  <van-cell class="userInfo">
    <!-- 左侧头像信息 -->
    <template #title>
      <div class="user">
        <!-- 图片 -->
        <van-image
          width="35"
          height="35"
          fit="cover"
          round
          :src="AtricInfo.aut_photo"
        />
        <!-- 用户名 -->
        <div>
          <p>{{ AtricInfo.aut_name }}</p>
          <span>{{ AtricTime }}</span>
        </div>
      </div>
    </template>
    <!-- 右侧按钮 -->
    <template #right-icon>
      <van-button
        v-if="!AtricInfo.is_followed"
        type="info"
        round
        size="small"
        @click="followed"
        >+ 关注</van-button
      >
      <van-button v-else type="default" round size="small" @click="unfollowed"
        >已关注</van-button
      >
    </template>
  </van-cell>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { followedApi, unfollowedApi } from '@/api'
export default {
  props: {
    AtricInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 关注用户
    async followed() {
      try {
        const { data } = await followedApi(this.AtricInfo.aut_id)

        if (data.message === 'OK') this.$toast.success('关注成功')
        this.AtricInfo.is_followed = true
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 取关用户
    async unfollowed() {
      try {
        const res = await unfollowedApi(this.AtricInfo.aut_id)
        if (res.status === 204) {
          this.$toast.success('取消关注成功')
          this.AtricInfo.is_followed = false
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    }
  },
  computed: {
    AtricTime() {
      return dayjs(this.AtricInfo.pubdate).fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.userInfo {
  height: 90px;
  .user {
    display: flex;
    div {
      position: relative;
      margin-left: 10px;
      p {
        margin: 0;
        margin-top: -10px;
        font-size: 12px;
        color: #3a3a3a;
      }
      span {
        position: absolute;
        bottom: -5px;
        font-size: 11.5px;
        color: #b7b7b7;
      }
    }
  }

  .van-button--small {
    width: 170px;
    height: 58px;
  }
}
</style>
