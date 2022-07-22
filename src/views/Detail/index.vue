<template>
  <div>
    <!-- 头部 -->
    <header>
      <van-nav-bar
        title="黑马头条"
        fixed
        left-arrow
        @click-left="$router.push('/')"
      />
    </header>

    <!-- main -->
    <main>
      <!-- 标题 -->
      <van-cell :title="AtricInfo.title" size="large" title-class="title" />

      <!-- 用户头像 -->
      <HeaderPic :AtricInfo="AtricInfo"></HeaderPic>

      <!-- 内容区域 -->
      <div
        class="article-content markdown-body"
        v-html="AtricInfo.content"
      ></div>

      <!-- 正文结束 -->
      <van-divider
        :style="{ color: '#969799', borderColor: '#ebedf0', padding: '0 16px' }"
      >
        正文结束
      </van-divider>

      <!-- 评论区 -->
      <div class="commentsArea">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <Comments
            v-for="item in comments"
            :key="item.com_id"
            :comment="item"
            @newCommentFn="newCommentFn"
          ></Comments>
        </van-list>
      </div>
    </main>

    <!-- 底部区域 -->
    <Footer :AtricInfo="AtricInfo"></Footer>

    <!-- 评论弹出层 -->
    <van-popup class="Mypop" v-model="show" position="bottom">
      <div class="pop">
        <van-field
          v-model="message"
          rows="2"
          type="textarea"
          maxlength="50"
          placeholder="请输入留言"
          show-word-limit
        />
        <van-button
          @click="postCommentFn"
          class="btn"
          size="small"
          color="#6ba3d8"
          >发布</van-button
        >
      </div>
    </van-popup>

    <!-- 二级评论弹出层 -->
    <div class="twopop">
      <van-popup
        v-model="twoShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <!-- 头部 -->
        <van-nav-bar
          class="two-van-pop"
          v-if="twototalCount === 0"
          title="暂无评论"
          left-arrow
          @click-left="twoShow = false"
        />
        <van-nav-bar
          class="two-van-pop"
          v-else
          :title="`${twototalCount}条回复`"
          left-arrow
          @click-left="twoShow = false"
        />
        <div class="com-main">
          <!-- 评论 -->
          <div class="twopop-com">
            <!-- 默认的评论 -->
            <Comments :comment="comment"></Comments>

            <van-cell title="全部回复" />

            <!-- 无评论时占位符 -->
            <van-empty v-if="twototalCount === 0" description="暂无回复" />

            <van-list
              v-model="twoloading"
              :finished="twofinished"
              finished-text="没有更多了"
              @load="twoonLoad"
            >
              <Comments
                v-for="item in twoComments"
                :key="item.com_id"
                :comment="item"
              ></Comments>
            </van-list>
          </div>
          <!-- 底部按钮 -->
          <div class="com-box-cell">
            <van-cell center>
              <van-button
                round
                block
                type="info"
                color="#fff"
                @click="show = true"
                >评论</van-button
              >
            </van-cell>
          </div>
        </div>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getAtricInfo, getcommentsApi, partFiveApi } from '@/api'
import '@/assets/css/github-markdown.css'
import HeaderPic from './components/Header.vue'
import Comments from './components/Comments.vue'
import Footer from './components/Footer.vue'
export default {
  data() {
    return {
      AtricInfo: {}, // 文章信息
      comments: [], // 文章评论
      show: false, // 评论框
      message: '', // 评论文字
      twoComments: [], // 二级评论
      comment: {}, // 当前点击的二级评论
      twototalCount: 0, // 二级评论的评论数
      twoShow: false, // 二级评论弹出框
      loading: false,
      finished: false,
      twoloading: false,
      twofinished: false,
      offset: '',
      twooffset: '',
      twoLastComId: '', // 上一次被查看的评论ID,
      newCom: false // 是否为点击发布评论后触发更新
    }
  },
  components: { HeaderPic, Comments, Footer },

  async created() {
    // 获取文章详情
    await this.getAtricInfo()
  },

  methods: {
    // LIST加载
    async onLoad() {
      // 防止刚进入页面无数据时刷新
      if (!this.AtricInfo.art_id) return (this.loading = false)
      // 请求数据
      await this.getcomments('a', this.AtricInfo.art_id, this.offset)
      this.loading = false
    },

    // 二级 LIST加载
    async twoonLoad() {
      // 防止刚进入页面无数据时刷新
      if (!this.twooffset) return (this.twoloading = false)
      // 请求数据
      await this.getcomments('c', this.comment.com_id, this.twooffset)
      this.twoloading = false
    },

    // 获取文章信息
    async getAtricInfo() {
      try {
        // 文章ID通过路由params传递
        const { data } = await getAtricInfo(this.$route.params.art_id)
        this.AtricInfo = data.data
      } catch (error) {
        this.$toast.fail('文章获取失败，请稍后重试')
      }
    },

    // 获取评论
    async getcomments(type, source, offset) {
      try {
        const { data } = await getcommentsApi(type, source, offset)
        // 如果是获取子级评论
        if (type === 'c') {
          // 获取偏移量
          this.twooffset = data.data.last_id
          // 如果偏移量到底
          if (this.twooffset === data.data.end_id) this.twofinished = true
          // 存入 评论总个数  如果下面直接push数据，评论总个数会丢失
          this.twototalCount = data.data.total_count
          // 如果 上一次请求的comID 和 这次请求的comID 相同，则证明进入的是同一个子评论
          // 并且不能是从点击发布评论后触发的更新
          // 点击发布评论后需要重新获取第一页数据，需要再次覆盖，不能push，否则报错
          if (this.twoLastComId === source && !this.newCom) {
            return this.twoComments.push(...data.data.results)
          }
          // 如果和上次进入的不是同一个子评论，则直接覆盖原子评论数据
          this.twoComments = data.data.results
          // 把这次的comID覆盖成上一次请求ID
          return (this.twoLastComId = source)
        }

        // 如果是获取文章的评论
        // 获取偏移量
        this.offset = data.data.last_id
        // 如果偏移量到底
        if (this.offset === data.data.end_id) this.finished = true
        // 不是从点击发布评论后触发的更新 push
        if (!this.newCom) {
          return this.comments.push(...data.data.results)
        }
        // 如果是从点击事件触发 直接覆盖原评论数据
        this.comments = data.data.results
      } catch (error) {
        this.$toast.fail('评论获取失败，请稍后重试')
      } finally {
        this.newCom = false
      }
    },

    // 点击发布评论按钮
    async postCommentFn() {
      this.newCom = true
      // 如果是发布的子评论 (判断条件为二级评论弹出框是否弹出)
      if (this.twoShow) {
        // 发布评论请求
        await this.postComment(
          this.comment.com_id,
          this.message,
          this.AtricInfo.art_id
        )
        return
      }
      // 如果发布的是文章的评论 发布评论请求
      this.offset = ''
      await this.postComment(this.AtricInfo.art_id, this.message)
    },

    // 发布评论
    async postComment(target, content, artId) {
      // 如果输入框无内容
      if (content.trim().length === 0) {
        return this.$toast.fail('请输入内容')
      }
      try {
        const { data } = await partFiveApi(target, content, artId)

        if (data.message === 'OK') {
          this.$toast.success('评论发布成功')
          // 如果是发布的子评论
          if (this.twoShow) {
            // 发请求刷新子评论区
            return this.getcomments('c', this.comment.com_id)
          }
          // 发请求刷新文章评论
          this.getcomments('a', this.AtricInfo.art_id)
        }
      } catch (error) {
        console.log('postComment', error)
        if (error.response.status === 401) return this.$toast.fail('请先登录')
        if (error.response.status === 403) {
          return this.$toast.fail('文章已关闭评论')
        }
        this.$toast.fail('服务器异常，请稍后重试')
      } finally {
        this.message = '' // 清空输入框
        this.show = false // 关闭输入框
      }
    },

    // 二级评论点击事件
    async newCommentFn(comment) {
      // 把点击的子评论数据保存到data
      this.comment = comment
      // 展开二级评论弹出框
      this.twoShow = true
      // 能继续执行LIST
      this.twofinished = false
      // 请求子评论区内的评论
      await this.getcomments('c', comment.com_id)
    }
  }
}
</script>

<style lang="less" scoped>
header {
  .van-nav-bar {
    background-color: #3296fa;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
    /deep/.van-icon {
      color: #fff;
    }
  }
}
main {
  margin-top: 92px;
  margin-bottom: 90px;
  .van-cell::after {
    border-bottom: unset;
  }
  .title {
    font-size: 0.53333rem;
    color: #3a3a3a;
    font-weight: 700;
    padding: 0.33333rem 0.21334rem;
  }

  .van-divider::before,
  .van-divider::after {
    border-width: 0.06rem 0 0;
  }
  .article-content {
    margin-top: 60px;
    padding: 0 30px;
    margin-bottom: 80px;
    font-size: 12px;
  }
  .commentsArea {
    padding: 0 35px;
  }
}
.Mypop {
  padding: 32px 0 32px 10px;

  .pop {
    display: flex;
    justify-content: center;
    align-items: center;
    .van-cell {
      width: 80%;
      background-color: #f5f7f9;
    }
    .btn {
      margin-left: 10px;
    }
  }
}
.twopop {
  .two-van-pop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
  }

  .twopop-com {
    padding: 35px;
    .van-cell__title {
      margin-top: 10px;
      margin-bottom: 20px;
    }
  }
  .com-main {
    margin-top: 90px;
    margin-bottom: 80px;
  }
  .com-box-cell {
    .van-cell {
      width: 100%;
      height: 100px;
      position: fixed;
      bottom: 0;
      left: 0;
      background-color: #3296fa;
      .van-button {
        margin-left: 30px;
        width: 640px;
        height: 80px;
        .van-button__text {
          font-size: 0.37333rem;
          color: #3a3a3a;
        }
      }
    }
  }
}
</style>
