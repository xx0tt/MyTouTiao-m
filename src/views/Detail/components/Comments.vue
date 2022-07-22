<template>
  <div class="com-box">
    <!-- 头像 -->
    <van-image
      width="36"
      height="36"
      fit="cover"
      round
      :src="comment.aut_photo"
    />
    <div class="com-content">
      <p>{{ comment.aut_name }}</p>
      <h4>{{ comment.content }}</h4>
      <div>
        <span>{{ commentTime }}</span>
        <van-button round @click="newComment"
          >回复 {{ comment.reply_count }}</van-button
        >
      </div>
    </div>

    <div class="com-icon">
      <van-icon
        v-if="comment.is_liking"
        name="good-job"
        @click="unComGiveLike"
      />
      <van-icon v-else name="good-job-o" @click="comGiveLike" />
      <i> {{ comment.like_count || '赞' }}</i>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import { comGiveLikeApi, unComGiveLikeApi } from '@/api'
export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  methods: {
    // 点赞
    async comGiveLike() {
      try {
        const res = await comGiveLikeApi(this.comment.com_id)
        if (res.status === 201) {
          this.$toast.success('点赞成功')

          this.comment.is_liking = true
          this.comment.like_count++
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 取消点赞
    async unComGiveLike() {
      try {
        const res = await unComGiveLikeApi(this.comment.com_id)
        if (res.status === 204) {
          this.$toast.success('已取消点赞')

          this.comment.is_liking = false
          this.comment.like_count--
        }
      } catch (error) {
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        this.$toast.fail('服务器异常，请稍后重试')
      }
    },

    // 点击回复
    newComment() {
      this.$emit('newCommentFn', this.comment)
    }
  },
  computed: {
    commentTime() {
      return dayjs(this.comment.pubdate).fromNow()
    }
  }
}
</script>

<style lang="less" scoped>
.com-box {
  position: relative;
  display: flex;
  .com-content {
    transform: translateY(-20px);
    margin-left: 20px;
    p {
      color: #406599;
      font-size: 0.34667rem;
    }
    h4 {
      color: #222;
      font-size: 0.42667rem;
      font-weight: 400;
      margin: 20px 0;
    }
    div {
      span {
        font-size: 0.2rem;
        color: #222;
      }
      .van-button {
        margin-left: 0.25rem;
        height: 0.64rem;
        transform: translateY(-7px);
      }
      .van-button--default {
        border: 0.02667rem solid #ccc;
      }
    }
  }
  .com-icon {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 0.25333rem;
    i {
      font-style: normal;
      margin-right: 8px;
    }
    /deep/.van-icon-good-job {
      color: #3296fa;
    }
  }
}
</style>
