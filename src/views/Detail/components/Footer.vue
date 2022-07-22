<template>
  <div>
    <footer>
      <van-goods-action>
        <van-goods-action-button text="写评论" @click="$parent.show = true" />
        <van-goods-action-icon icon="comment-o" :badge="AtricInfo.comm_count" />
        <van-goods-action-icon
          v-if="!AtricInfo.is_collected"
          @click="collected"
          icon="star-o"
        />
        <van-goods-action-icon v-else @click="uncollected" icon="star" />
        <van-goods-action-icon
          v-if="AtricInfo.attitude === -1"
          icon="good-job-o"
          @click="giveLike"
        />
        <van-goods-action-icon
          v-if="AtricInfo.attitude === 1"
          icon="good-job"
          @click="ungiveLike"
        />
        <van-goods-action-icon icon="share" @click="showShare = true" />
      </van-goods-action>
    </footer>

    <!-- 分享面板 -->
    <van-share-sheet
      v-model="showShare"
      title="立即分享给好友"
      :options="options"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { collectedApi, uncollectedApi, giveLikeApi, ungiveLikeApi } from '@/api'
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  props: {
    AtricInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 收藏文章
    async collected() {
      try {
        const { data } = await collectedApi(this.AtricInfo.art_id)
        if (data.message === 'OK') {
          this.$toast.success('收藏成功')
          this.AtricInfo.is_collected = true
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 取消收藏文章
    async uncollected() {
      try {
        const res = await uncollectedApi(this.AtricInfo.art_id)
        if (res.status === 204) {
          this.$toast.success('取消收藏成功')
          this.AtricInfo.is_collected = false
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 点赞
    async giveLike() {
      try {
        const { data } = await giveLikeApi(this.AtricInfo.art_id)
        if (data.message === 'OK') {
          this.$toast.success('点赞成功')
          this.AtricInfo.attitude = 1
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 取消点赞
    async ungiveLike() {
      try {
        const res = await ungiveLikeApi(this.AtricInfo.art_id)
        if (res.status === 204) {
          this.$toast.success('取消点赞成功')
          this.AtricInfo.attitude = -1
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 通知面板
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style lang="less" scoped>
footer {
  .van-goods-action {
    border-top: 3px solid #eee;
    height: 88px;
    /deep/.van-button--large {
      margin: 0 50px;
      width: 3rem;
      height: 0.6rem;
      color: #a7a7a7;
      font-size: 30px;
    }

    /deep/.van-button {
      border: 1px solid #ccc;
    }
  }
  /deep/.van-icon {
    color: rgb(119, 119, 119);
    margin-top: 20px;
  }
  /deep/.van-icon-star {
    color: #3296fa;
  }
  /deep/.van-icon-good-job {
    color: #3296fa;
  }
}
</style>
